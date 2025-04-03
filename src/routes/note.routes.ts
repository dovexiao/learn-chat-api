import express from 'express';
import { noteController } from '../controllers/note.controller';
import {
    getUserNotesSchema,
    createUserNoteSchema,
    updateNoteRemarksSchema,
    updateNoteTagsSchema,
    deleteUserNoteSchema,
    saveUserNoteSchema,
    switchNoteVersionSchema,
    saveNoteDraftSchema,
    createNoteLibrarySchema,
    addCollaboratorsSchema,
    removeCollaboratorsSchema,
    renameNoteLibrarySchema,
    getNoteUpdateEventsSchema,
    getNoteOperationRecordsSchema,
    getNoteDraftBoxSchema,
    getUserNoteLibrariesSchema,
    deleteNoteLibrarySchema
} from '../utils/validators/note.validator';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkBasicAuth, checkNoteOwnership, checkLibraryAdmin } from "../middlewares/permission";

const router = express.Router();

// 应用认证中间件
router.use(authMiddleware);

// 用户笔记相关路由
router.get('/users/:userId/notes',
    validate(getUserNotesSchema),
    checkBasicAuth,
    noteController.getUserNotes
);
router.post('/notes/create',
    validate(createUserNoteSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.createUserNote
);
router.post('/notes/:noteId/updateRemarks',
    validate(updateNoteRemarksSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.updateNoteRemarks
);
router.post('/notes/:noteId/updateTags',
    validate(updateNoteTagsSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.updateNoteTags
);
router.post('/notes/:noteId/delete',
    validate(deleteUserNoteSchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.deleteUserNote
);

// 笔记内容操作路由
router.post('/notes/:noteId/save',
    validate(saveUserNoteSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.saveUserNote
);
router.post('/notes/:noteId/version',
    validate(switchNoteVersionSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.switchNoteVersion
);

// 笔记先关的其他路由
router.get('/notes/:noteId/events',
    validate(getNoteUpdateEventsSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.getNoteUpdateEvents
);
router.get('/notes/:noteId/operations',
    validate(getNoteOperationRecordsSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.getNoteOperationRecords
);
router.get('/notes/:noteId/drafts',
    validate(getNoteDraftBoxSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.getNoteDraftBox
);
router.post('/notes/:noteId/drafts/save',
    validate(saveNoteDraftSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.saveNoteDraft
);

// 笔记库管理路由
router.get('/users/:userId/libraries',
    validate(getUserNoteLibrariesSchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.getUserNoteLibraries
);
router.post('/libraries/add',
    validate(createNoteLibrarySchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.createNoteLibrary
);
router.post('/libraries/:noteLibraryId/addCollaborators',
    validate(addCollaboratorsSchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.addCollaborators
);
router.post('/libraries/:noteLibraryId/deleteCollaborators',
    validate(removeCollaboratorsSchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.removeCollaborators
);
router.post('/libraries/:noteLibraryId/rename',
    validate(renameNoteLibrarySchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.renameNoteLibrary
);
router.post('/libraries/:noteLibraryId/delete',
    validate(deleteNoteLibrarySchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.deleteNoteLibrary
);

export default router;
