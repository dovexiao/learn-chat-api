import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {ChatSpaceEntity} from "../../entities/chatEntities";

export class ChatSpaceRepository extends BaseRepository<ChatSpaceEntity> {
    constructor() {
        super(ChatSpaceEntity);
    }

    createWithDefaults = async (
        createUserId: number,
        chatSpaceName: string,
        manager?: EntityManager,
    )=> {
        return this.save({
            createUserId,
            chatSpaceName,
            createTime: new Date(),
            chatSpaceAvatar: '群',
        }, manager)
    };
}
