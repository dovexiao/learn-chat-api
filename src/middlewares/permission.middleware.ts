import {Request, Response, NextFunction} from "express";
import {cacheService} from "../services/CacheService";
import {PermissionError, AuthenticationError} from "../utils/errors";

export const checkPermission = (requiredPermission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.userId
        if (!userId) {
            throw new AuthenticationError('用户不存在');
        }
        const user = cacheService.getCachedUser(userId);

        if (!user?.permissions.includes(requiredPermission)) {
            throw new PermissionError();
        }

        next();
    };
};
