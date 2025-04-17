import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {PostEntity} from "../../entities/forumEntities";

export class PostRepository extends BaseRepository<PostEntity> {
    constructor() {
        super(PostEntity);
    }
}
