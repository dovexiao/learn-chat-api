import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';
import { cacheService } from '../services/CacheService';

export const captchaMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { captcha } = req.body;

    if (!captcha) {
        throw new ValidationError('验证码不能为空');
    }

    if (!cacheService.verifyCaptcha(captcha)) {
        throw new ValidationError('验证码错误或已过期');
    }

    // 验证成功后清除
    cacheService.deleteCaptcha(captcha);
    next();
};
