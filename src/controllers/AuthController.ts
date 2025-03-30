import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { logger } from '../utils/logger';

export class AuthController {
    private authService: AuthService = new AuthService();

    getCaptcha = async (req: Request, res: Response) => {
        const captcha = this.authService.generateCaptcha();

        logger.info('验证码生成成功', {
            type: 'math_captcha',
            clientIp: req.ip,
            captchaId: captcha.text
        });

        // 设置响应头
        res.type('svg').status(200).json({
            success: true,
            data: {
                image: captcha.image,
                captchaId: captcha.text // 返回验证码标识符
            },
            timestamp: new Date().toISOString(),
        });
    }

    register = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await this.authService.register(username, password);

        logger.info('用户注册成功', {
            userId: user.userId,
            username: username,
            clientIp: req.ip
        });

        res.status(201).json({
            success: true,
            message: '注册成功',
            timestamp: new Date().toISOString(),
        });
    }

    login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        // 验证登录
        const tokens = await this.authService.login(username, password);

        logger.info('用户登录成功', {
            username: username,
            clientIp: req.ip,
            tokenType: 'JWT'
        });

        res.status(200).json({
            success: true,
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                expiresIn: 900,
                timestamp: new Date().toISOString(),
            }
        });
    }

    refreshToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        const newTokens = await this.authService.refreshToken(refreshToken);

        logger.info('Token刷新成功', {
            tokenType: 'JWT',
            clientIp: req.ip,
            refreshTokenId: refreshToken.slice(-10) // 记录部分Token
        });

        res.status(200).json({
            success: true,
            data: newTokens,
            timestamp: new Date().toISOString(),
        });
    }
}

export const authController = new AuthController();
