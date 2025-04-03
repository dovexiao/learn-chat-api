import {BaseRepository} from "../base.repository";
import {UserNoteEntity} from "../../entities/noteEntities";
import {EntityManager} from "typeorm";

export class UserNoteRepository extends BaseRepository<UserNoteEntity> {
    constructor() {
        super(UserNoteEntity);
    }

    // 更新内容引用
    async updateContentRef(
        noteId: number,
        userId: number,
        contentId: number,
        contentSource: 'draft' | 'update_event',
        manager?: EntityManager
    ) {
        await this.update(
            { noteId, userId },
            { contentId, contentSource },
            manager
        );
    }

    async exists(userId: number, noteId: number) {
        return await this.findOne({userId, noteId});
    }
}
