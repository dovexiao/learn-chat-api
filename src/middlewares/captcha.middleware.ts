import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';
import { cacheService } from '../services/cache.service';

export const captchaMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { captchaKey, captchaText } = req.body;

    if (!captchaText) {
        throw new ValidationError('验证码不能为空');
    }

    if (!cacheService.verifyCaptcha(captchaKey)) {
        throw new ValidationError('验证码错误或已过期');
    }

    // 验证成功后清除
    cacheService.deleteCaptcha(captchaKey);
    next();
};
