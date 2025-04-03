import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {GroupChatSpaceEntity} from "../../entities/chatEntities";

export class ChatSpaceRepository extends BaseRepository<GroupChatSpaceEntity> {
    constructor() {
        super(GroupChatSpaceEntity);
    }
}
