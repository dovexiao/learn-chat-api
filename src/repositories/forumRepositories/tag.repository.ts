import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {TagEntity} from "../../entities/forumEntities";

export class TagRepository extends BaseRepository<TagEntity> {
    constructor() {
        super(TagEntity);
    }
}
