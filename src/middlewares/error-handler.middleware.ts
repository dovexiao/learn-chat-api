import { Request, Response, NextFunction } from 'express';
import {
    AuthenticationError,
    ConflictError,
    HttpException,
    NotFoundError,
    ValidationError
} from '../utils/errors';
import {appConfig} from '../config/env';
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
        clientIp: req.ip,
        userId: (req as any).user?.userId || 'anonymous',
        error: {
            name: err.name,
            message: err.message,
            stack: appConfig.isDev ? err.stack : undefined
        }
    };

    // 已知错误类型处理
    if (err instanceof HttpException) {
        logger.warn('业务异常处理', {
            ...logMetadata,
            statusCode: err.statusCode,
            errorType: err.constructor.name
        });

        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: {
                code: err.statusCode,
                details: err.details,
                // 开发环境显示错误堆栈
                stack: appConfig.isDev ? err.stack : undefined
            },
            timestamp: new Date().toISOString(),
        });
    }

    logger.error('未捕获异常', {
        ...logMetadata,
        statusCode: 500,
        errorType: 'UnhandledError'
    });

    // 未知错误处理
    console.error('未捕获错误:', err);
    res.status(500).json({
        success: false,
        message: '服务器内部错误',
        error: {
            code: 500,
            // 生产环境隐藏技术细节
            details: appConfig.isDev ? { stack: err.stack } : {}
        },
        timestamp: new Date().toISOString(),
    });
};
