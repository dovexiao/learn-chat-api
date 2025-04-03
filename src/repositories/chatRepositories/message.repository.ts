import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {MessageEntity} from "../../entities/chatEntities";

export class ChatSpaceRepository extends BaseRepository<MessageEntity> {
    constructor() {
        super(MessageEntity);
    }
}
