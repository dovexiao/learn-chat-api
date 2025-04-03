import {BaseRepository} from "../base.repository";
import {UserNoteLibraryEntity} from "../../entities/noteEntities";
import {EntityManager} from "typeorm";

export class UserNoteLibraryRepository  extends BaseRepository<UserNoteLibraryEntity> {
    constructor() {
        super(UserNoteLibraryEntity);
    }

    async createWithDefaults(userId: number, noteLibraryId: number, manager?: EntityManager) {
        return this.save({
            userId,
            noteLibraryId,
            joinTime: new Date(),
            permission: 0,
        }, manager);
    }

    async isLibraryAdmin(noteLibraryId: number, userId: number) {
        return await this.findOne({ userId, noteLibraryId, permission: 0 });
    }
}
