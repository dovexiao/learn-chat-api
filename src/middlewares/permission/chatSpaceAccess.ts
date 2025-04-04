import {Request, Response, NextFunction} from "express";
import {AuthenticationError, PermissionError} from "../../utils/errors";
import {logger} from "../../utils/logger";
import {DirectChatSpaceRepository, GroupChatSpaceRepository} from "../../repositories/chatRepositories";

export const checkChatSpaceOwnership = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const chatSpaceId = Number(req.params.chatSpaceId || req.body.chatSpaceId);
    // @ts-ignore
    const userId = req.user?.userId;
    const directChatSpaceRepo = new DirectChatSpaceRepository();
    const groupChatSpaceRepo = new GroupChatSpaceRepository();
    if (!userId) {
        throw new AuthenticationError('用户不存在');
    }
    // 验证用户是否在该聊天空间
    const existsDirectChatSpace = await directChatSpaceRepo.existsChatSpace(userId, chatSpaceId);
    const existsGroupChatSpace = await groupChatSpaceRepo.existsChatSpace(userId, chatSpaceId);
    if (!existsDirectChatSpace && !existsGroupChatSpace) {
        throw new PermissionError('需要聊天空间操作权限');
    }
    logger.info(`权限验证通过`, {
        userId: userId,
        middleware: 'checkLibraryAdmin',
        resource: req.params.chatSpaceId || req.body.chatSpaceId
    });
    next();
};
