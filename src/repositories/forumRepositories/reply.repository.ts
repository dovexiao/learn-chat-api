import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {RelyEntity} from "../../entities/forumEntities";

export class ReplyRepository extends BaseRepository<RelyEntity> {
    constructor() {
        super(RelyEntity);
    }
}
