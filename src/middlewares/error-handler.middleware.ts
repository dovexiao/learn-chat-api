import { Request, Response, NextFunction } from 'express';
import {
    HttpException
} from '../utils/errors';
import { appConfig } from '../config/env';
import { logger } from '../utils/logger';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const logMetadata = {
        path: req.path,
        method: req.method,
        params: req.params,
        body: req.body,
        clientIp: req.ip,
        userId: (req as any).user?.userId || 'anonymous',
        error: {
            name: err.name,
            message: err.message,
            stack: appConfig.isDev ? err.stack : undefined
        }
    };

    if (err instanceof HttpException) {
        logger.warn('业务异常处理 | Business exception handled', {
            ...logMetadata,
            statusCode: err.statusCode,
            errorType: err.constructor.name
        });

        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: { details: err.details },
            timestamp: new Date().toISOString(),
        });
    } else {
        logger.error('捕获未知异常 | Unknown exception', {
            ...logMetadata,
            statusCode: 500,
            errorType: 'UnknownError'
        });

        res.status(500).json({
            success: false,
            message: '服务器内部错误 | Internal server error',
            error: {
                // code: 500,
                // 生产环境隐藏技术细节
                // details: appConfig.isDev ? { stack: err.stack } : {}
            },
            timestamp: new Date().toISOString(),
        });
    }

    next();
};
