import {Request, Response, NextFunction} from "express";
import {UserNoteRepository} from "../../repositories/noteRepositories";
import {AuthenticationError, PermissionError} from "../../utils/errors";
import {logger} from "../../utils/logger";

export const checkNoteOwnership = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const noteId = Number(req.params.noteId || req.body.noteId);
    // @ts-ignore
    const userId = req.user?.userId;
    const userNoteRepo = new UserNoteRepository();
    if (!userId) {
        throw new AuthenticationError('用户不存在');
    }
    // 验证用户是否拥有该笔记
    const exists = await userNoteRepo.existsNote(userId, noteId);
    if (!exists) {
        throw new PermissionError('需要笔记操作权限');
    }
    logger.info(`权限验证通过`, {
        userId: userId,
        middleware: 'checkLibraryAdmin',
        resource: req.params.noteId || req.body.noteId
    });
    next();
};
