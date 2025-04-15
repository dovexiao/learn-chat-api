import AppDataSource from "../config/data-source";
import * as chatRepositories from "../repositories/chatRepositories";
import {UserRepository} from "../repositories/user.repository";
import {UserEntity} from "../entities/user.entity";
import {DirectChatSpaceEntity} from "../entities/chatEntities";
import {NotFoundError} from "../utils/errors";
import {MESSAGE_STATUS} from "../config/constants";

export class ChatService {
    private chatSpaceRepo = new chatRepositories.ChatSpaceRepository();
    private directChatSpaceRepo = new chatRepositories.DirectChatSpaceRepository();
    private groupChatSpaceRepo = new chatRepositories.GroupChatSpaceRepository();
    private MessageRepo = new chatRepositories.MessageRepository();
    private userRepo = new UserRepository();

    // 获取好友列表和群聊列表
    getUserChatSpaces = async (userId: number) => {
        try {
            const directChatSpaces = await this.directChatSpaceRepo.find({userId});
            const groupChatSpaces = await this.groupChatSpaceRepo.find({userId});
            return [...directChatSpaces, ...groupChatSpaces].map(async chatSpace => {
                const { chatSpaceAvatar, chatSpaceName } = chatSpace instanceof DirectChatSpaceEntity ?
                await this.userRepo.findOne({userId: chatSpace.contactUserId}).then(contactUser => {
                    return { chatSpaceAvatar: contactUser?.avatar, chatSpaceName: contactUser?.nickname }
                }) :
                await this.chatSpaceRepo.findOne({chatSpaceId: chatSpace.chatSpaceId}).then(chatSpace => {
                    return { chatSpaceAvatar: chatSpace?.chatSpaceAvatar, chatSpaceName: chatSpace?.chatSpaceName }
                })
                return {
                    chatSpaceAvatar,
                    chatSpaceName,
                    latestMessage: chatSpace.latestMessage,
                    unreadCount: chatSpace.unreadCount,
                }
            })
        } catch (error) {
            throw error;
        }
    }

    // 创建群式聊天空间 (建群)
    createGroupChatSpace = async (userId: number, chatSpaceName: string, memberIds: number[]) => {
        try {
            return await AppDataSource.transaction(async (manager) => {
                const savedChatSpace = await this.chatSpaceRepo.createWithDefaults(userId, chatSpaceName, manager);
                await this.groupChatSpaceRepo.createGroupChatSpace(savedChatSpace.chatSpaceId, userId, memberIds, manager);

                //走websocket长连接更新聊天空间列表
            });
        } catch (error) {
            throw error;
        }
    }

    // 分享群式聊天空间名片 (发送群信息消息给好友)
    shareGroupChatSpaceCard = async (userId: number, contactUserId: number, chatSpaceId: number, sharedChatSpaceId: number) => {
        try {
            await AppDataSource.transaction(async (manager) => {
                const chatSpace = await this.chatSpaceRepo.findOne({chatSpaceId: sharedChatSpaceId}, manager);
                if (!chatSpace) {
                    throw new NotFoundError('聊天空间不存在');
                }
                await this.MessageRepo.addGroupCardMessage(chatSpaceId, userId, chatSpace, manager);

                //走websocket长连接更新空间消息列表
            });
        } catch (error) {
            throw error;
        }
    }

    // 创建群式聊天空间加入请求 (请求加群)

    // 加入群式聊天空间 (同意加群)
    joinGroupChatSpace = async (userId: number, chatSpaceId: number) => {
        try {
            await this.groupChatSpaceRepo.joinGroupChatSpace(userId, chatSpaceId);
        } catch(error) {
            throw error;
        }
    }

    // 创建链式聊天空间加入请求 (请求加好友)

    // 创建链式聊天空间 (同意加好友)
    joinDirectChatSpace = async (userId: number, createUserId: number, contactUserId: number) => {
        try {
            await AppDataSource.transaction(async (manager) => {
                // 创建聊天空间
                const savedChatSpace = await this.chatSpaceRepo.createWithDefaults(createUserId, '', manager);
                // 创建链式聊天空间
                await this.directChatSpaceRepo.createWithDefaults(savedChatSpace.chatSpaceId, createUserId, userId, manager);
            });

            //走websocket长连接更新聊天空间列表
        } catch(error) {
            throw error;
        }
    }

    // 删除用户群式聊天空间 (退群)
    deleteGroupChatSpace = async (userId: number, chatSpaceId: number) => {
        try {
            await this.groupChatSpaceRepo.update({userId, chatSpaceId}, {isDeleted: true});
        } catch(error) {
            throw error;
        }
    }

    // 删除用户链式聊天空间 (删除好友)
    deleteDirectChatSpace = async (userId: number, chatSpaceId: number) => {
        try {
            await this.directChatSpaceRepo.update({userId, chatSpaceId}, {isDeleted: true});
        } catch(error) {
            throw error;
        }
    }

    // 创建消息 (发送消息)
    createMessage = async (userId: number, chatSpaceId: number, content: string) => {
        try {
            await this.MessageRepo.addTextMessage(chatSpaceId, content, userId);
        } catch(error) {
            throw error;
        }
    }

    // 修改消息状态
    updateMessageStatus = async (userId: number, messageId: number, status: keyof typeof MESSAGE_STATUS) => {
        try {
            await this.MessageRepo.update({messageId, createUserId: userId}, {status: MESSAGE_STATUS[status]});

            // 走websocket长连接更新空间消息列表
        } catch(error) {
            throw error;
        }
    }

    // 删除消息 (撤回消息)
    deleteMessage = async (userId: number, messageId: number) => {
        try {
            await this.MessageRepo.update({messageId, createUserId: userId}, {isDeleted: true});

            // 走websocket长连接更新空间消息列表
        } catch(error) {
            throw error;
        }
    }
}
