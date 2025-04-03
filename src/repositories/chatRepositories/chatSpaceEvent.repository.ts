import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {ChatSpaceEventEntity} from "../../entities/chatEntities";

export class ChatSpaceRepository extends BaseRepository<ChatSpaceEventEntity> {
    constructor() {
        super(ChatSpaceEventEntity);
    }
}
