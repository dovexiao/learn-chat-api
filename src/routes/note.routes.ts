import express from 'express';
import noteController from '../controllers/note.controller';
import * as noteValidator from '../utils/validators/note.validator';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkBasicAuth, checkNoteOwnership, checkLibraryAdmin } from "../middlewares/permission";

const router = express.Router();

// 应用认证中间件
router.use(authMiddleware);

// 用户笔记相关路由
router.get('/users/:userId/notes',
    validate(noteValidator.getUserNotesSchema),
    checkBasicAuth,
    noteController.getUserNotes
);
router.post('/notes/create',
    validate(noteValidator.createUserNoteSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.createUserNote
);
router.post('/notes/:noteId/updateRemarks',
    validate(noteValidator.updateNoteRemarksSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.updateNoteRemarks
);
router.post('/notes/:noteId/updateTags',
    validate(noteValidator.updateNoteTagsSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.updateNoteTags
);
router.post('/notes/:noteId/delete',
    validate(noteValidator.deleteUserNoteSchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.deleteUserNote
);

// 笔记内容操作路由
router.post('/notes/:noteId/save',
    validate(noteValidator.saveUserNoteSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.saveUserNote
);
router.post('/notes/:noteId/version',
    validate(noteValidator.switchNoteVersionSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.switchNoteVersion
);

// 笔记先关的其他路由
router.get('/notes/:noteId/events',
    validate(noteValidator.getNoteUpdateEventsSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.getNoteUpdateEvents
);
router.get('/notes/:noteId/operations',
    validate(noteValidator.getNoteOperationRecordsSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.getNoteOperationRecords
);
router.get('/notes/:noteId/drafts',
    validate(noteValidator.getNoteDraftBoxSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.getNoteDraftBox
);
router.post('/notes/:noteId/drafts/save',
    validate(noteValidator.saveNoteDraftSchema),
    checkBasicAuth,
    checkNoteOwnership,
    noteController.saveNoteDraft
);

// 笔记库管理路由
router.get('/users/:userId/libraries',
    validate(noteValidator.getUserNoteLibrariesSchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.getUserNoteLibraries
);
router.post('/libraries/add',
    validate(noteValidator.createNoteLibrarySchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.createNoteLibrary
);
router.post('/libraries/:noteLibraryId/addCollaborators',
    validate(noteValidator.addCollaboratorsSchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.addCollaborators
);
router.post('/libraries/:noteLibraryId/deleteCollaborators',
    validate(noteValidator.removeCollaboratorsSchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.removeCollaborators
);
router.post('/libraries/:noteLibraryId/rename',
    validate(noteValidator.renameNoteLibrarySchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.renameNoteLibrary
);
router.post('/libraries/:noteLibraryId/delete',
    validate(noteValidator.deleteNoteLibrarySchema),
    checkBasicAuth,
    checkLibraryAdmin,
    noteController.deleteNoteLibrary
);

export default router;
