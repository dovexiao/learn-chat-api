import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {ChatSpaceEntity} from "../../entities/chatEntities";

export class ChatSpaceRepository extends BaseRepository<ChatSpaceEntity> {
    constructor() {
        super(ChatSpaceEntity);
    }
}
