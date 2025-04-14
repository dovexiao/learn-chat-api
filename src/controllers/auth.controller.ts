import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/logger';

export class AuthController {
    private authService: AuthService = new AuthService();

    getCaptcha = async (req: Request, res: Response) => {
        logger.info('生成验证码 | Generating captcha');

        try {
            const captcha = this.authService.generateCaptcha();
            logger.info(`验证码生成成功 ${captcha.key} | Captcha generated successfully`, {
                captchaId: captcha.key,
            });
            // 设置响应头
            res.type('svg').status(200).json({
                success: true,
                data: {
                    image: captcha.image,
                    key: captcha.key // 返回验证码标识符
                },
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            throw error;
        }
    }

    register = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        logger.info('用户注册请求 | User registration request', { username });

        try {
            const user = await this.authService.register(username, password);
            logger.info('用户注册成功 | User registered successfully', {
                userId: user.userId,
                username
            });

            res.status(201).json({
                success: true,
                message: '注册成功 | Registration successful',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            throw error;
        }
    }

    login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        logger.info('用户登录尝试 | User login attempt', { username });

        try {
            const tokens = await this.authService.login(username, password);
            logger.info('用户登录成功 | User logged in successfully', {
                username,
                tokenExpires: '15min'
            });
            res.status(200).json({
                success: true,
                data: {
                    user: tokens.user,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    expiresIn: 900,
                    timestamp: new Date().toISOString(),
                }
            });
        } catch (error) {
            throw error;
        }
    }

    refreshToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        logger.info('刷新Token请求 | Refresh token request');

        try {
            const newTokens = await this.authService.refreshToken(refreshToken);
            logger.info('Token刷新成功 | Token refreshed successfully', {
                newExpires: '15min'
            });
            res.status(200).json({
                success: true,
                data: newTokens,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            throw error;
        }
    }
}

export const authController = new AuthController();
