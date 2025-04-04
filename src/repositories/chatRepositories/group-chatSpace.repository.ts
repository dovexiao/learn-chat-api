import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {GroupChatSpaceEntity} from "../../entities/chatEntities";
import {GROUP_MEMBER_ROLE} from "../../config/constants";

const Role = {
    ADMIN: 0 as const,
    DEPUTY_ADMIN: 1 as const,
    ORDINARY_MEMBER: 2 as const,
};

export class GroupChatSpaceRepository extends BaseRepository<GroupChatSpaceEntity> {
    constructor() {
        super(GroupChatSpaceEntity);
    }

    createGroupChatSpace = async (
        chatSpaceId: number,
        userId: number,
        memberIds: number[],
        manager?: EntityManager,
    )=> {
        const groupChatSpaces = memberIds.map(memberId => {
            return {
                chatSpaceId,
                userId: memberId,
                joinTime: new Date(),
                latestMessage: '',
                unreadCount: 0,
                role: memberId === userId ? GROUP_MEMBER_ROLE.ADMIN : GROUP_MEMBER_ROLE.ORDINARY_MEMBER,
                isDeleted: false,
            }
        });
        return await this.saveMany(groupChatSpaces, {reload: false, chunk: 10}, manager);
    }

    joinGroupChatSpace = async (
        chatSpaceId: number,
        userId: number,
        manager?: EntityManager,
    )=> {
        return await this.save({
            chatSpaceId,
            userId,
            joinTime: new Date(),
            latestMessage: '',
            unreadCount: 0,
            role: GROUP_MEMBER_ROLE.ORDINARY_MEMBER,
            isDeleted: false,
        }, manager);
    }

    async existsChatSpace(userId: number, chatSpaceId: number) {
        return await this.findOne({userId, chatSpaceId});
    }
}
