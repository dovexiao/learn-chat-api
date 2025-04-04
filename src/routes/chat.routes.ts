import express from 'express';
import { chatController } from '../controllers/chat.controller';
import * as chatValidator from '../utils/validators/chat.validator';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkBasicAuth, checkChatSpaceOwnership } from '../middlewares/permission';

const router = express.Router();

// 应用认证中间件
router.use(authMiddleware);

// 聊天空间管理路由
router.get('/users/:userId/chat-spaces',
    validate(chatValidator.getUserChatSpacesSchema),
    checkBasicAuth,
    chatController.getUserChatSpaces
);

router.post('/chat-spaces/group/create',
    validate(chatValidator.createGroupChatSpaceSchema),
    checkBasicAuth,
    chatController.createGroupChatSpace
);

router.post('/chat-spaces/group/share-card',
    validate(chatValidator.shareGroupChatSpaceCardSchema),
    checkBasicAuth,
    checkChatSpaceOwnership,
    chatController.shareGroupChatSpaceCard
);

router.post('/chat-spaces/group/join',
    validate(chatValidator.joinGroupChatSpaceSchema),
    checkBasicAuth,
    chatController.joinGroupChatSpace
);

router.post('/chat-spaces/direct/create',
    validate(chatValidator.joinDirectChatSpaceSchema),
    checkBasicAuth,
    chatController.joinDirectChatSpace
);

router.post('/chat-spaces/group/leave',
    validate(chatValidator.deleteGroupChatSpaceSchema),
    checkBasicAuth,
    checkChatSpaceOwnership,
    chatController.deleteGroupChatSpace
);

router.post('/chat-spaces/direct/delete',
    validate(chatValidator.deleteDirectChatSpaceSchema),
    checkBasicAuth,
    checkChatSpaceOwnership,
    chatController.deleteDirectChatSpace
);

// 消息管理路由
router.post('/messages/send',
    validate(chatValidator.createMessageSchema),
    checkBasicAuth,
    checkChatSpaceOwnership,
    chatController.createMessage
);

router.post('/messages/:messageId/status',
    validate(chatValidator.updateMessageStatusSchema),
    checkBasicAuth,
    checkChatSpaceOwnership,
    chatController.updateMessageStatus
);

router.post('/messages/:messageId/delete',
    validate(chatValidator.deleteMessageSchema),
    checkBasicAuth,
    checkChatSpaceOwnership,
    chatController.deleteMessage
);

export default router;
