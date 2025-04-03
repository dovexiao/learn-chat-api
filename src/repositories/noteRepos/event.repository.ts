import {EntityManager} from "typeorm";
import {BaseRepository} from "../base.repository";
import {NoteUpdateEventEntity} from "../../entities/noteUpdateEvent.entity";

export class EventRepository extends BaseRepository<NoteUpdateEventEntity> {
    constructor() {
        super(NoteUpdateEventEntity);
    }

    // 查询最近更新时间
    async findLatestUpdate(noteId: number, manager?: EntityManager) {
        return this.getRepo(manager).findOne({
            where: { noteId },
            order: { updateTime: 'DESC' }
        });
    }

    // 创建初始事件
    async createInitial(noteId: number, updaterId: number, manager?: EntityManager) {
        return this.save({
            noteId,
            updaterId,
            updateContent: '',
            updateType: 0,
            updateSourceId: NaN,
            updateTime: new Date()
        }, manager);
    }

    // 创建保存事件
    async createSaveEvent(
        noteId: number,
        updaterId: number,
        updateContent: string,
        updateSourceId: number,
        manager?: EntityManager
    ) {
        return this.save({
            noteId,
            updaterId,
            updateContent,
            updateType: 1,
            updateSourceId,
            updateTime: new Date()
        }, manager);
    }
}
