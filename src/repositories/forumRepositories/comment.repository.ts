import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {CommentEntity} from "../../entities/forumEntities";

export class CommentRepository extends BaseRepository<CommentEntity> {
    constructor() {
        super(CommentEntity);
    }
}
