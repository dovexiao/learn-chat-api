import {NoteOperationRecordEntity} from "../../entities/note/noteOperationRecord.entity";
import {BaseRepository} from "../base.repository";
import {EntityManager} from "typeorm";

export class OperationRepository extends BaseRepository<NoteOperationRecordEntity> {
    constructor() {
        super(NoteOperationRecordEntity);
    }

    // 记录初始化操作
    async logInitial(noteId: number, operatorId: number, manager?: EntityManager) {
        return this.save({
            noteId,
            operatorId,
            operationType: 0,
            operationDetails: `已初始化笔记${noteId}`,
            operationTime: new Date()
        }, manager);
    }

    // 记录保存操作
    async logSave(noteId: number, operatorId: number, source: number, manager?: EntityManager) {
        return this.save({
            noteId,
            operatorId,
            operationType: 1,
            operationDetails: `已保存对事件${source}结果做出的修改为新内容`,
            operationTime: new Date()
        }, manager);
    }

    // 记录切换操作
    async logSwitch(
        noteId: number,
        operatorId: number,
        sourceType: 'draft' | 'update_event',
        contentId: number,
        manager?: EntityManager
    ) {
        return this.save({
            noteId,
            operatorId,
            operationType: 2,
            operationDetails: `已切换笔记内容为${
                sourceType === 'draft' ? '草稿' : '更新事件'
            }${contentId}结果`,
            operationTime: new Date()
        }, manager);
    }

    // 记录草稿保存
    async logDraftSave(noteId: number, operatorId: number, manager?: EntityManager) {
        return this.save({
            noteId,
            operatorId,
            operationType: 3,
            operationDetails: '已存草稿对未保存的笔记内容',
            operationTime: new Date()
        }, manager);
    }
}
