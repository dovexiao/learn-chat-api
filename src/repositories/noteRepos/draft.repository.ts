import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";
import {NoteDraftEntity} from "../../entities/note/noteDraft.entity";

export class DraftRepository extends BaseRepository<NoteDraftEntity> {
    constructor() {
        super(NoteDraftEntity);
    }

    // 创建草稿
    async createDraft(
        noteId: number,
        creatorId: number,
        draftContent: string,
        manager?: EntityManager
    ) {
        return this.save({
            noteId,
            creatorId,
            draftContent,
            createTime: new Date()
        }, manager);
    }
}
