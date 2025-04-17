import {AuthenticationError, PermissionError} from "../../utils/errors";
import {Request, Response, NextFunction} from "express";
import {cacheService} from "../../services/cache.service";
import {logger} from "../../utils/logger";

export const checkBasicAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // @ts-ignore
    const userId = req.user?.userId
    if (!userId) {
        throw new AuthenticationError('用户不存在');
    }
    const user = cacheService.getCachedUser(userId);
    if (!user?.permissions.includes('BASIC')) {
        throw new PermissionError('需要基础用户权限');
    }
    logger.info(`权限验证通过`, {
        userId: userId,
        middleware: 'checkBasicAuth',
        resource: req.params.libraryId
    });
    next();
};
