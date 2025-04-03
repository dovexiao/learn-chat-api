import {Request, Response, NextFunction} from "express";
import { UserNoteLibraryRepository } from '../../repositories/noteRepositories';
import {AuthenticationError, PermissionError} from "../../utils/errors";
import {logger} from "../../utils/logger";

export const checkLibraryAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const noteLibraryId = Number(req.params.noteLibraryId || req.body.noteLibraryId);
    // @ts-ignore
    const userId = req.user?.userId;
    const userNoteLibraryRepo = new UserNoteLibraryRepository();
    if (!userId) {
        throw new AuthenticationError('用户不存在');
    }
    // 验证用户是否是管理员
    const isAdmin = await userNoteLibraryRepo.isLibraryAdmin(noteLibraryId, userId);
    if (!isAdmin) {
        throw new PermissionError('需要笔记库管理员权限');
    }
    logger.info(`权限验证通过`, {
        userId: userId,
        middleware: 'checkLibraryAdmin',
        resource: req.params.libraryId
    });
    next();
};
