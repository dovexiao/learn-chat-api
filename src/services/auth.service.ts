import svgCaptcha from 'svg-captcha';
import {cacheService} from "./cache.service";
import bcrypt from 'bcrypt';
import {UserRepository} from "../repositories/user.repository";
import {generateTokens} from "../utils/token";
import {ConflictError, NotFoundError, AuthenticationError} from "../utils/errors";
import jwt from "jsonwebtoken";
import {jwtConfig} from "../config/env";
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
    private userRepository = new UserRepository();

    // 生成图片验证码
    generateCaptcha() {
        try {
            const captcha = svgCaptcha.createMathExpr({
                size: 4,
                noise: 2,
                color: true
            });

            const captchaId = uuidv4();

            // 缓存验证码答案（5分钟有效）
            cacheService.cacheData(captchaId, captcha.text, 300);

            return {
                image: captcha.data,
                key: captchaId
            };
        } catch(error) {
            throw new Error('验证码生成失败');
        }
    }

    async register(username: string, password: string) {
        // 检查用户名重复
        const existingUser = await this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new ConflictError('用户','用户名', username);
        }

        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 10);

        // 创建用户
        return await this.userRepository.create(username, hashedPassword);
    }

    async login(username: string, password: string) {
        // 获取用户
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new NotFoundError('用户');
        }

        // 验证密码
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new AuthenticationError('密码错误');
        }

        // 缓存用户
        cacheService.cacheUser(user);

        // 生成双Token
        return generateTokens({ userId: user.userId, username: user.username });
    }

    async refreshToken(refreshToken: string) {
        try {
            // 验证Refresh Token
            const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret!) as {
                userId: number
            };

            // 获取用户信息
            const user = await this.userRepository.findByUserId(decoded.userId);
            if (!user) {
                throw new AuthenticationError('用户不存在', { code: 'INVALID_TOKEN' });
            }
            cacheService.cacheUser(user);
            // 生成新Token
            return generateTokens({ userId: user.userId, username: user.username });
        } catch (error: any) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new AuthenticationError('登录已过期', { code: 'EXPIRED_REFRESH' });
            }
            throw error;
        }
    }
}
