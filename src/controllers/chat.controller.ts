import { Request, Response, NextFunction } from 'express';
import { ChatService } from '../services/chat.service';
import { logger } from '../utils/logger';

class ChatController {
    private chatService = new ChatService();

    // 获取用户聊天空间列表（好友+群聊）
    getUserChatSpaces = async (req: Request, res: Response, next: NextFunction) => {
        const userId = parseInt(req.params.userId);
        logger.info('获取用户聊天空间 | Fetching user chat spaces', { userId });
        try {
            const chatSpaces = await this.chatService.getUserChatSpaces(userId);
            logger.info('用户聊天空间获取成功 | User chat spaces fetched', {
                userId,
                count: chatSpaces.length
            });
            res.status(200).json({ success: true, data: chatSpaces });
        } catch (error) {
            next(error);
        }
    };

    // 创建群聊
    createGroupChatSpace = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, chatSpaceName, memberIds } = req.body;
        logger.info('创建群聊 | Creating group chat space', {
            userId,
            chatSpaceName,
            memberCount: memberIds.length
        });
        try {
            await this.chatService.createGroupChatSpace(userId, chatSpaceName, memberIds);
            logger.info('群聊创建成功 | Group chat created', {
                userId,
                chatSpaceName
            });
            res.status(201).json({
                success: true,
                message: '群聊创建成功 | Group created'
            });
        } catch (error) {
            next(error);
        }
    };

    // 分享群名片
    shareGroupChatSpaceCard = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, contactUserId, chatSpaceId, sharedChatSpaceId } = req.body;
        logger.info('分享群名片 | Sharing group card', {
            userId,
            contactUserId,
            chatSpaceId
        });
        try {
            await this.chatService.shareGroupChatSpaceCard(userId, contactUserId, chatSpaceId, sharedChatSpaceId);
            logger.info('群名片分享成功 | Group card shared', {
                userId,
                contactUserId
            });
            res.status(200).json({
                success: true,
                message: '群名片已发送 | Group card sent'
            });
        } catch (error) {
            next(error);
        }
    };

    // 加入群聊
    joinGroupChatSpace = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, chatSpaceId } = req.body;
        logger.info('加入群聊 | Joining group chat', {
            userId,
            chatSpaceId
        });
        try {
            await this.chatService.joinGroupChatSpace(userId, chatSpaceId);
            logger.info('加入群聊成功 | Joined group chat', {
                userId,
                chatSpaceId
            });
            res.status(200).json({
                success: true,
                message: '已加入群聊 | Joined group'
            });
        } catch (error) {
            next(error);
        }
    };

    // 创建私聊（同意好友请求）
    joinDirectChatSpace = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, createUserId, contactUserId } = req.body;
        logger.info('创建私聊 | Creating direct chat', {
            userId,
            contactUserId
        });
        try {
            await this.chatService.joinDirectChatSpace(userId, createUserId, contactUserId);
            logger.info('私聊创建成功 | Direct chat created', {
                userId,
                contactUserId
            });
            res.status(201).json({
                success: true,
                message: '私聊已建立 | Direct chat created'
            });
        } catch (error) {
            next(error);
        }
    };

    // 退出群聊
    deleteGroupChatSpace = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, chatSpaceId } = req.body;
        logger.info('退出群聊 | Leaving group chat', {
            userId,
            chatSpaceId
        });
        try {
            await this.chatService.deleteGroupChatSpace(userId, chatSpaceId);
            logger.info('退出群聊成功 | Left group chat', {
                userId,
                chatSpaceId
            });
            res.status(200).json({
                success: true,
                message: '已退出群聊 | Left group'
            });
        } catch (error) {
            next(error);
        }
    };

    // 删除私聊（删除好友）
    deleteDirectChatSpace = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, chatSpaceId } = req.body;
        logger.info('删除私聊 | Deleting direct chat', {
            userId,
            chatSpaceId
        });
        try {
            await this.chatService.deleteDirectChatSpace(userId, chatSpaceId);
            logger.info('私聊删除成功 | Direct chat deleted', {
                userId,
                chatSpaceId
            });
            res.status(200).json({
                success: true,
                message: '私聊已删除 | Direct chat deleted'
            });
        } catch (error) {
            next(error);
        }
    };

    // 发送消息
    createMessage = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, chatSpaceId, content } = req.body;
        logger.info('发送消息 | Sending message', {
            userId,
            chatSpaceId,
            contentLength: content.length
        });
        try {
            await this.chatService.createMessage(userId, chatSpaceId, content);
            logger.info('消息发送成功 | Message sent', {
                userId,
                chatSpaceId
            });
            res.status(201).json({
                success: true,
                message: '消息已发送 | Message sent'
            });
        } catch (error) {
            next(error);
        }
    };

    // 更新消息状态（如已读/未读）
    updateMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, messageId, status } = req.body;
        logger.info('更新消息状态 | Updating message status', {
            userId,
            messageId,
            status
        });
        try {
            await this.chatService.updateMessageStatus(userId, messageId, status);
            logger.info('消息状态更新成功 | Message status updated', {
                userId,
                messageId
            });
            res.status(200).json({
                success: true,
                message: '状态已更新 | Status updated'
            });
        } catch (error) {
            next(error);
        }
    };

    // 撤回消息
    deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, messageId } = req.body;
        logger.info('撤回消息 | Deleting message', {
            userId,
            messageId
        });
        try {
            await this.chatService.deleteMessage(userId, messageId);
            logger.info('消息撤回成功 | Message deleted', {
                userId,
                messageId
            });
            res.status(200).json({
                success: true,
                message: '消息已撤回 | Message deleted'
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new ChatController();
