import {CONTENT_SOURCE, OPERATION_TYPE, UPDATE_TYPE_MAP, PERMISSION_MAP} from "../config/constants";
import AppDataSource from "../config/data-source";
import {
    DraftRepository,
    EventRepository,
    NoteLibraryRepository,
    NoteRepository,
    OperationRepository,
    UserNoteLibraryRepository,
    UserNoteRepository,
} from "../repositories/noteRepos";
import {UserRepository} from "../repositories/user.repository";
import {UserNoteEntity} from "../entities/userNote.entity";
import {UserNoteLibraryEntity} from "../entities/userNoteLibrary.entity";

export class NoteService {
    private noteRepository = new NoteRepository();
    private eventRepository = new EventRepository();
    private operationRepository = new OperationRepository();
    private draftRepository = new DraftRepository();
    private userNoteRepository = new UserNoteRepository();
    private userRepository = new UserRepository();
    private userNoteLibraryRepository = new UserNoteLibraryRepository();
    private noteLibraryRepository = new NoteLibraryRepository();

    // 获取用户笔记
    getUserNotes = async (userId: number) => {
        try {
            const userNotes = await this.userNoteRepository.find({userId});

            return await Promise.all(
                userNotes.map(async (un) => {
                    // 查询最近更新时间
                    const latestEvent = await this.eventRepository.findLatestUpdate(un.noteId);
                    return {
                        userId: un.userId,
                        noteId: un.noteId,
                        remarks: un.remarks,
                        tags: un.tags,
                        lastUpdateTime: this.formatDate(latestEvent?.updateTime),
                        content: this.getUserNoteContent(un.contentId, un.contentSource),
                    };
                })
            );
        } catch (error) {
            throw error;
        }
    }

    // 获取笔记更新记录
    getNoteUpdateEvents = async (noteId: number) => {
        try {
            // 查询笔记更新事件表
            const noteUpdateEvents = await this.eventRepository.find({ noteId });

            return await Promise.all(
                noteUpdateEvents.map(async (ne) => {
                    const updateUser = await this.userRepository.findOne({userId: ne.updaterId});
                    return updateUser ? {
                        eventId: ne.eventId,
                        noteId: ne.noteId,
                        updaterId: ne.updaterId,
                        updaterName: updateUser.nickname,
                        updateType: ne.updateType,
                        updateTypeName: UPDATE_TYPE_MAP[ne.updateType],
                        updateTime: this.formatDate(ne.updateTime),
                        updateContent: ne.updateContent,
                        updateSourceId: ne.updateSourceId,
                    } : null;
                })
            );
        } catch (error) {
            throw error;
        }
    };

    // 获取笔记操作记录
    getNoteOperationRecords = async (noteId: number, userId: number) => {
        try {
            // 查询笔记操作记录
            const noteOperationRecords = await this.operationRepository.find({noteId: noteId, operatorId: userId});

            return await Promise.all(
                noteOperationRecords.map(async (nr) => {
                    const user = await this.userRepository.findOne({userId: nr.operatorId});
                    return user ? {
                        recordId: nr.recordId,
                        noteId: nr.noteId,
                        operatorId: nr.operatorId,
                        operatorUserName: user.nickname,
                        operationType: nr.operationType,
                        operationTypeName: OPERATION_TYPE[nr.operationType],
                        operationTime: this.formatDate(nr.operationTime),
                        operationDetails: nr.operationDetails,
                    } : null;
                })
            );
        } catch (error) {
            throw error;
        }
    };

    // 获取笔记草稿箱
    getNoteDraftBox = async (noteId: number, userId: number) => {
        try {
            const noteDraftBox = await this.draftRepository.find({ noteId: noteId, creatorId: userId });
            return noteDraftBox.map(nd => {
                return {
                    draftId: nd.draftId,
                    creatorId: nd.creatorId,
                    noteId: nd.noteId,
                    draftContent: nd.draftContent,
                    createTime: this.formatDate(nd.createTime),
                };
            });
        } catch (error) {
            throw error;
        }
    };

    // 获取用户关联的笔记库
    getUserNoteLibraries = async (userId: number) => {
        try {
            // 查询用户关联的笔记库
            const userNoteLibraries = await this.userNoteLibraryRepository.find({ userId });

            return await Promise.all(
                userNoteLibraries.map(async (ul) => {
                    const noteLibrary = await this.noteLibraryRepository.findOne({noteLibraryId: ul.noteLibraryId});
                    return noteLibrary ? {
                        noteLibraryId: noteLibrary.noteLibraryId,
                        noteLibraryName: noteLibrary.noteLibraryName,
                        permission: ul.permission,
                        permissionName: PERMISSION_MAP[ul.permission],
                        lastUpdateTime: noteLibrary.lastUpdateTime.toISOString().split('T')[0], // 格式化时间
                        isDeleted: noteLibrary.isDeleted,
                    } : null;
                })
            );
        } catch (error) {
            throw error;
        }
    };

    // 创建用户笔记
    createUserNote = async (
        userId: number,
        noteLibraryId: number,
        remarks: string,
        tags: string
    ) => {
        try {
            return await AppDataSource.transaction(async (manager) => {
                // 创建笔记
                const savedNote = await this.noteRepository.createWithDefaults(noteLibraryId, userId, manager);

                // 创建初始更新事件
                const savedEvent = await this.eventRepository.createInitial(savedNote.noteId, userId, manager);

                // 为笔记库管理员和其他成员创建用户笔记
                const collaborators = await this.userNoteLibraryRepository.find({ noteLibraryId: noteLibraryId });

                const userNotes = collaborators.map(cr => {
                    const userNote = new UserNoteEntity();
                    userNote.noteId = savedNote.noteId;
                    userNote.userId = cr.userId;
                    userNote.contentId = savedEvent.eventId;
                    userNote.contentSource = 'update_event';
                    userNote.remarks = remarks;
                    userNote.tags = tags;
                    return userNote;
                });
                await this.userNoteRepository.saveMany(userNotes, { reload: false, chunk: 10 }, manager);

                // 创建操作记录（NoteOperationRecord表）
                await this.operationRepository.logInitial(savedNote.noteId, userId, manager);
            });
        } catch (error) {
            throw error;
        }
    };

    // 修改用户笔记备注
    updateNoteRemarks = async (
        userId: number,
        noteId: number,
        newRemarks: string
    ) => {
        try {
            await this.userNoteRepository.update({ userId, noteId }, { remarks: newRemarks });
        } catch (error) {
            throw error;
        }
    };

    // 修改用户笔记标签
    updateNoteTags = async (
        userId: number,
        noteId: number,
        newTags: string
    ) => {
        try {
            await this.userNoteRepository.update({ userId, noteId }, { tags: newTags });
        } catch (error) {
            throw error;
        }
    };

    // 删除用户笔记
    deleteUserNote = async (noteId: number) => {
        try {
            await this.noteRepository.update({ noteId }, { isDeleted: true });
        } catch (error) {
            throw error;
        }
    };

    // 保存用户笔记
    saveUserNote = async (
        userId: number,
        noteId: number,
        content: string,
        sourceId: number,
    ) => {
        try {
            return await AppDataSource.transaction(async (manager) => {
                // 创建更新事件
                const savedEvent = await this.eventRepository.createSaveEvent(noteId, userId, content, sourceId, manager);

                // 更新用户笔记内容引用
                await this.userNoteRepository.updateContentRef(noteId, userId, savedEvent.eventId, 'update_event', manager);

                // 记录操作
                await this.operationRepository.logSave(noteId, userId, sourceId, manager);
            });
        } catch (error) {
            throw error;
        }
    };

    // 切换用户笔记版本
    switchNoteVersion = async (
        userId: number,
        noteId: number,
        newContentId: number,
        newSource: typeof CONTENT_SOURCE[keyof typeof CONTENT_SOURCE]
    ) => {
        try {
            return await AppDataSource.transaction(async (manager) => {
                // 更新用户笔记内容引用
                await this.userNoteRepository.updateContentRef(noteId, userId, newContentId, newSource, manager);

                // 记录操作
                await this.operationRepository.logSwitch(noteId, userId, newSource, newContentId, manager);
            });
        } catch (error) {
            throw error;
        }
    };

    // 保存笔记草稿
    saveNoteDraft = async (
        userId: number,
        noteId: number,
        draftContent: string
    ) => {
        try {
            return await AppDataSource.transaction(async (manager) => {
                // 创建新笔记草稿
                const savedDraft = await this.draftRepository.createDraft(noteId, userId, draftContent, manager);

                // 更新用户笔记内容引用
                await this.userNoteRepository.updateContentRef(noteId, userId, savedDraft.draftId, 'draft', manager);

                // 记录操作
                await this.operationRepository.logDraftSave(noteId, userId, manager);
            });
        } catch (error) {
            throw error;
        }
    };

    // 创建笔记库
    createNoteLibrary = async (userId: number, noteLibraryName: string) => {
        try {
            return await AppDataSource.transaction(async (manager) => {
                // 创建笔记库
                const savedNoteLibrary = await this.noteLibraryRepository.createWithDefaults(userId, noteLibraryName, manager);

                // 创建用户-笔记库关联
                await this.userNoteLibraryRepository.createWithDefaults(userId, savedNoteLibrary.noteLibraryId, manager);
            });
        } catch (error) {
            throw error;
        }
    }

    // 添加笔记库共建者
    addCollaborators = async (
        noteLibraryId: number,
        collaboratorIds: number[]
    ) => {
        try {
            return await AppDataSource.transaction(async (manager) => {
                // 批量添加共建者
                const collaboratorNoteLibraries = collaboratorIds.map(collaboratorId => {
                    const userNoteLibrary = new UserNoteLibraryEntity();
                    userNoteLibrary.userId = collaboratorId;
                    userNoteLibrary.noteLibraryId = noteLibraryId;
                    userNoteLibrary.joinTime = new Date();
                    userNoteLibrary.permission = 2; // 2=共建权限
                    userNoteLibrary.isDeleted = false;
                    return userNoteLibrary;
                });

                await this.userNoteLibraryRepository.saveMany(collaboratorNoteLibraries, { reload: false, chunk: 10 }, manager);

                // 更新笔记库最后修改时间
                await this.noteLibraryRepository.update(
                    { noteLibraryId },
                    { lastUpdateTime: new Date() },
                    manager
                );
            });
        } catch (error) {
            throw error;
        }
    };

    // 移除笔记库共建者
    removeCollaborators = async (
        noteLibraryId: number,
        removeCollaboratorIds: number[]
    ) => {
        try {
            return await AppDataSource.transaction(async (manager) => {
                for (const collaboratorId of removeCollaboratorIds) {
                    await this.userNoteLibraryRepository.update(
                        { userId: collaboratorId, noteLibraryId },
                        { isDeleted: true },
                        manager
                    );
                }
            })
        } catch (error) {
            throw error;
        }
    }

    // 重命名笔记库
    renameNoteLibrary = async (
        noteLibraryId: number,
        newName: string
    ) => {
        try {
            await this.noteLibraryRepository.update(
                { noteLibraryId },
                {
                    noteLibraryName: newName,
                    lastUpdateTime: new Date()
                }
            );
        } catch (error) {
            throw error;
        }
    };

    // 删除笔记库
    deleteNoteLibrary = async (
        noteLibraryId: number
    ) => {
        try {
            await this.noteLibraryRepository.update(
                { noteLibraryId },
                {
                    isDeleted: true,
                    lastUpdateTime: new Date()
                }
            );
        } catch (error) {
            throw error;
        }
    };

    getUserNoteContent = async (
        contentId: number,
        contentSource: typeof CONTENT_SOURCE[keyof typeof CONTENT_SOURCE]
    ) => {
        try {
            const noteDraftRepo = new DraftRepository();
            const noteEventRepo = new EventRepository();
            let content = '';
            if (contentSource === 'draft') {
                const draft = await noteDraftRepo.findOne({draftId: contentId});
                content = draft?.draftContent || '';
            } else if (contentSource === 'update_event') {
                const event = await noteEventRepo.findOne({eventId: contentId});
                content = event?.updateContent || '';
            }
            return content;
        } catch (error) {
            throw error;
        }
    };

    formatDate = (date: Date | undefined) => {
        try {
            return date ? date.toISOString().split('T')[0] : '';
        } catch (error) {
            throw error;
        }
    };
}
