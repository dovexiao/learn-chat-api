import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {cacheService} from "../services/CacheService";
import {UserRepository} from "../repositories/UserRepository";
import {AuthenticationError} from "../utils/errors";
import {jwtConfig} from "../config/env";

export const checkLoginStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userRepository = new UserRepository();

    // 从Header获取Token
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new AuthenticationError('无效的认证头');
    }

    const token = authHeader.split(' ')[1];

    try {
        // 验证Token
        const decoded = jwt.verify(token, jwtConfig.secret!) as { userId: number };

        // 获取用户信息（优先缓存, 如果缓存已过期, 请求新的用户信息）
        let user = cacheService.getCachedUser(decoded.userId);
        if (!user) {
            const newUser = await userRepository.findByUserId(decoded.userId);
            if (!newUser) {
                throw new AuthenticationError('用户不存在');
            }
            cacheService.cacheUser(newUser);
            user = newUser;
        }
        // 挂载用户到请求
        req.user = {
            userId: user.userId,
        };
        next();
    } catch (error) {
        // Token过期处理
        if (error instanceof jwt.TokenExpiredError) {
            throw new AuthenticationError('登录已过期', { code: 'EXPIRED_TOKEN' });
        }
        throw new AuthenticationError('无效的登录状态');
    }
};
