import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {DirectChatSpaceEntity} from "../../entities/chatEntities";

export class ChatSpaceRepository extends BaseRepository<DirectChatSpaceEntity> {
    constructor() {
        super(DirectChatSpaceEntity);
    }
}
