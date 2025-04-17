import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {ImageEntity} from "../../entities/resourceEntities";

export class ImageRepository extends BaseRepository<ImageEntity> {
    constructor() {
        super(ImageEntity);
    }
}
