import {BaseRepository} from "../base.repository";
import {NoteEntity} from "../../entities/note/note.entity";
import {EntityManager} from "typeorm";

export class NoteRepository extends BaseRepository<NoteEntity> {
    constructor() {
        super(NoteEntity);
    }

    // 创建带默认值的笔记
    async createWithDefaults(noteLibraryId: number, creatorId: number, manager?: EntityManager) {
        return this.save({
            noteLibraryId,
            creatorId,
            isDeleted: false,
            createTime: new Date()
        }, manager);
    }
}
