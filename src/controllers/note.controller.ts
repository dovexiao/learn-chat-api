import { Request, Response } from 'express';
import { NoteService } from '../services/note.service';
import { logger } from '../utils/logger';

export class NoteController {
    private noteService = new NoteService();

    // 获取用户笔记
    getUserNotes = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        logger.info('获取用户笔记 | Fetching user notes', { userId });
        try {
            const notes = await this.noteService.getUserNotes(userId);
            logger.info('获取用户笔记成功 | User notes fetched successfully', {
                userId,
                count: notes.length
            });
            res.status(200).json({ success: true, data: notes });
        } catch (error) {
            throw error;
        }
    };

    // 创建用户笔记
    createUserNote = async (req: Request, res: Response) => {
        const { userId, noteLibraryId, remarks = '', tags = '' } = req.body;
        logger.info('创建用户笔记 | Creating user note', {
            userId,
            noteLibraryId
        });
        try {
            await this.noteService.createUserNote(userId, noteLibraryId, remarks, tags);
            logger.info('用户笔记创建成功 | User note created successfully', {
                userId,
                noteLibraryId
            });
            res.status(201).json({
                success: true,
                message: '笔记创建成功 | Note created'
            });
        } catch (error) {
            throw error;
        }
    };

    // 修改用户笔记备注
    updateNoteRemarks = async (req: Request, res: Response) => {
        const { userId, noteId, newRemarks } = req.body;
        logger.info('更新笔记备注 | Updating note remarks', {
            userId,
            noteId
        });
        try {
            await this.noteService.updateNoteRemarks(userId, noteId, newRemarks);
            logger.info('笔记备注更新成功 | Note remarks updated', {
                userId,
                noteId
            });
            res.status(200).json({
                success: true,
                message: '备注更新成功 | Remarks updated'
            });
        } catch (error) {
            throw error;
        }
    };

    // 修改用户笔记标签
    updateNoteTags = async (req: Request, res: Response) => {
        const { userId, noteId, newTags } = req.body;
        logger.info('更新笔记标签 | Updating note tags', {
            userId,
            noteId
        });
        try {
            await this.noteService.updateNoteTags(userId, noteId, newTags);
            logger.info('笔记标签更新成功 | Note tags updated', {
                userId,
                noteId
            });
            res.status(200).json({
                success: true,
                message: '标签更新成功 | Tags updated'
            });
        } catch (error) {
            throw error;
        }
    };

    // 删除用户笔记
    deleteUserNote = async (req: Request, res: Response) => {
        const noteId = parseInt(req.query.noteId as string);
        logger.info('删除用户笔记 | Deleting user note', { noteId });

        try {
            await this.noteService.deleteUserNote(noteId);
            logger.info('用户笔记删除成功 | User note deleted', { noteId });
            res.status(200).json({
                success: true,
                message: '笔记已删除 | Note deleted'
            });
        } catch (error) {
            throw error;
        }
    };

    // 保存用户笔记
    saveUserNote = async (req: Request, res: Response) => {
        const { userId, noteId, content, sourceId } = req.body;
        logger.info('保存用户笔记 | Saving user note', {
            userId,
            noteId
        });
        try {
            await this.noteService.saveUserNote(userId, noteId, content, sourceId);
            logger.info('用户笔记保存成功 | User note saved', {
                userId,
                noteId
            });
            res.status(200).json({
                success: true,
                message: '笔记保存成功 | Note saved'
            });
        } catch (error) {
            throw error;
        }
    };

    // 切换用户笔记版本
    switchNoteVersion = async (req: Request, res: Response) => {
        const { userId, noteId, newContentId, newSource } = req.body;
        logger.info('切换笔记版本 | Switching note version', {
            userId,
            noteId
        });
        try {
            await this.noteService.switchNoteVersion(userId, noteId, newContentId, newSource);
            logger.info('笔记版本切换成功 | Note version switched', {
                userId,
                noteId
            });
            res.status(200).json({
                success: true,
                message: '版本切换成功 | Version switched'
            });
        } catch (error) {
            throw error;
        }
    };

    // 获取笔记更新记录
    getNoteUpdateEvents = async (req: Request, res: Response) => {
        const noteId = parseInt(req.params.noteId);
        logger.info('获取笔记更新记录 | Fetching note update events', { noteId });
        try {
            const events = await this.noteService.getNoteUpdateEvents(noteId);
            logger.info('笔记更新记录获取成功 | Note events fetched', {
                noteId,
                count: events.length
            });
            res.status(200).json({ success: true, data: events });
        } catch (error) {
            throw error;
        }
    };

    // 获取笔记操作记录
    getNoteOperationRecords = async (req: Request, res: Response) => {
        const noteId = parseInt(req.params.noteId);
        const userId = parseInt(req.query.userId as string);
        logger.info('获取笔记操作记录 | Fetching operation records', {
            noteId,
            userId
        });
        try {
            const records = await this.noteService.getNoteOperationRecords(noteId, userId);
            logger.info('笔记操作记录获取成功 | Operation records fetched', {
                noteId,
                count: records.length
            });
            res.status(200).json({ success: true, data: records });
        } catch (error) {
            throw error;
        }
    };

    // 获取笔记草稿箱
    getNoteDraftBox = async (req: Request, res: Response) => {
        const noteId = parseInt(req.params.noteId);
        const userId = parseInt(req.query.userId as string);
        logger.info('获取笔记草稿箱 | Fetching note drafts', {
            noteId,
            userId
        });
        try {
            const drafts = await this.noteService.getNoteDraftBox(noteId, userId);
            logger.info('笔记草稿箱获取成功 | Note drafts fetched', {
                noteId,
                count: drafts.length
            });
            res.status(200).json({ success: true, data: drafts });
        } catch (error) {
            throw error;
        }
    };

    // 保存笔记草稿
    saveNoteDraft = async (req: Request, res: Response) => {
        const { userId, noteId, draftContent } = req.body;
        logger.info('保存笔记草稿 | Saving note draft', {
            userId,
            noteId
        });
        try {
            await this.noteService.saveNoteDraft(userId, noteId, draftContent);
            logger.info('笔记草稿保存成功 | Note draft saved', {
                userId,
                noteId
            });
            res.status(200).json({
                success: true,
                message: '草稿保存成功 | Draft saved'
            });
        } catch (error) {
            throw error;
        }
    };

    // 获取用户关联的笔记库
    getUserNoteLibraries = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        logger.info('获取用户笔记库 | Fetching user note libraries', { userId });
        try {
            const libraries = await this.noteService.getUserNoteLibraries(userId);
            logger.info('用户笔记库获取成功 | Note libraries fetched', {
                userId,
                count: libraries.length
            });
            res.status(200).json({ success: true, data: libraries });
        } catch (error) {
            throw error;
        }
    };

    // 创建笔记库
    createNoteLibrary = async (req: Request, res: Response) => {
        const { userId, noteLibraryName } = req.body;
        logger.info('创建笔记库 | Creating note library', {
            userId,
            name: noteLibraryName
        });
        try {
            await this.noteService.createNoteLibrary(userId, noteLibraryName.trim());
            logger.info('笔记库创建成功 | Note library created', {
                userId,
                name: noteLibraryName
            });
            res.status(201).json({
                success: true,
                message: '笔记库创建成功 | Library created'
            });
        } catch (error) {
            throw error;
        }
    };

    // 添加笔记库共建者
    addCollaborators = async (req: Request, res: Response) => {
        const { noteLibraryId, collaboratorIds } = req.body;
        logger.info('添加笔记库协作者 | Adding collaborators', {
            noteLibraryId,
            count: collaboratorIds.length
        });
        try {
            await this.noteService.addCollaborators(noteLibraryId, collaboratorIds);
            logger.info('协作者添加成功 | Collaborators added', {
                noteLibraryId,
                count: collaboratorIds.length
            });
            res.status(200).json({
                success: true,
                message: '协作者添加成功 | Collaborators added'
            });
        } catch (error) {
            throw error;
        }
    };

    // 移除笔记库共建者
    removeCollaborators = async (req: Request, res: Response) => {
        const { noteLibraryId, removeCollaboratorIds } = req.body;
        logger.info('移除笔记库协作者 | Removing collaborators', {
            noteLibraryId,
            count: removeCollaboratorIds.length
        });
        try {
            await this.noteService.removeCollaborators(noteLibraryId, removeCollaboratorIds);
            logger.info('协作者移除成功 | Collaborators removed', {
                noteLibraryId,
                count: removeCollaboratorIds.length
            });
            res.status(200).json({
                success: true,
                message: '协作者移除成功 | Collaborators removed'
            });
        } catch (error) {
            throw error;
        }
    };

    // 重命名笔记库
    renameNoteLibrary = async (req: Request, res: Response) => {
        const { noteLibraryId, newName } = req.body;
        logger.info('重命名笔记库 | Renaming note library', {
            noteLibraryId,
            newName
        });
        try {
            await this.noteService.renameNoteLibrary(noteLibraryId, newName.trim());
            logger.info('笔记库重命名成功 | Library renamed', {
                noteLibraryId,
                newName
            });
            res.status(200).json({
                success: true,
                message: '笔记库重命名成功 | Library renamed'
            });
        } catch (error) {
            throw error;
        }
    };

    // 删除笔记库
    deleteNoteLibrary = async (req: Request, res: Response) => {
        const noteLibraryId = parseInt(req.query.noteLibraryId as string);
        logger.info('删除笔记库 | Deleting note library', { noteLibraryId });
        try {
            await this.noteService.deleteNoteLibrary(noteLibraryId);
            logger.info('笔记库删除成功 | Library deleted', { noteLibraryId });
            res.status(200).json({
                success: true,
                message: '笔记库已删除 | Library deleted'
            });
        } catch (error) {
            throw error;
        }
    };
}

export const noteController = new NoteController();
