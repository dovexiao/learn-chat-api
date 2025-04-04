import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {DirectChatSpaceEntity} from "../../entities/chatEntities";

export class DirectChatSpaceRepository extends BaseRepository<DirectChatSpaceEntity> {
    constructor() {
        super(DirectChatSpaceEntity);
    }

    createWithDefaults = async (
        chatSpaceId: number,
        createUserId: number,
        agreeUserId: number,
        manager?: EntityManager,
    ) => {
        await this.save({
            chatSpaceId,
            userId: createUserId,
            contactUserId: agreeUserId,
            latestMessage: '',
            unreadCount: 0,
            isDeleted: false,
        }, manager);
        await this.save({
            chatSpaceId,
            userId: agreeUserId,
            contactUserId: createUserId,
            latestMessage: '',
            unreadCount: 0,
            isDeleted: false,
        }, manager);
    }

    async existsChatSpace(userId: number, chatSpaceId: number) {
        return await this.findOne({userId, chatSpaceId});
    }
}
