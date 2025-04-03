import {BaseRepository} from "../base.repository";
import {NoteLibraryEntity} from "../../entities/noteEntities";
import {EntityManager} from "typeorm";

export class NoteLibraryRepository  extends BaseRepository<NoteLibraryEntity> {
    constructor() {
        super(NoteLibraryEntity);
    }

    async createWithDefaults(creatorId: number, noteLibraryName: string, manager?: EntityManager) {
        return this.save({
            noteLibraryName,
            creatorId,
            isDeleted: false,
            createTime: new Date(),
            lastUpdateTime: new Date()
        }, manager);
    }
}
