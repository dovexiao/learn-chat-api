import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {ChatMessageEntity, ChatSpaceEntity} from "../../entities/chatEntities";
import {MESSAGE_CONTENT_TYPE, MESSAGE_STATUS} from "../../config/constants";

export class MessageRepository extends BaseRepository<ChatMessageEntity> {
    constructor() {
        super(ChatMessageEntity);
    }

    // 新增文本消息
    async addTextMessage(
        chatSpaceId: number,
        content: string,
        createUserId: number,
        manager?: EntityManager
    ) {
        await this.save({
            chatSpaceId,
            content,
            contentType: MESSAGE_CONTENT_TYPE.TEXT,
            createUserId,
            createTime: new Date(),
            status: MESSAGE_STATUS.NOT_SENT,
            isDeleted: false,
        });
    }

    // 新增群名片消息
    async addGroupCardMessage(
        chatSpaceId: number,
        createUserId: number,
        chatSpace: ChatSpaceEntity,
        manager?: EntityManager
    ) {
        await this.save({
            chatSpaceId,
            content: `<p>${chatSpace.chatSpaceAvatar}</p><p>${chatSpace.chatSpaceName}</p>`,
            contentType: MESSAGE_CONTENT_TYPE.GROUP_CARD_SHARE,
            createUserId,
            createTime: new Date(),
            status: MESSAGE_STATUS.NOT_SENT,
            isDeleted: false,
        });
    }
}
