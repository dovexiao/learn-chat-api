import Joi from 'joi';

export const getUserNotesSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

export const createUserNoteSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    noteLibraryId: Joi.number().integer().positive().required(),
    remarks: Joi.string().max(100).allow('').optional(),
    tags: Joi.string().max(50).allow('').optional()
});

export const updateNoteRemarksSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    noteId: Joi.number().integer().positive().required(),
    newRemarks: Joi.string().max(100).allow('').required()
});

export const updateNoteTagsSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    noteId: Joi.number().integer().positive().required(),
    newTags: Joi.string().max(50).allow('').required()
});

export const deleteUserNoteSchema = Joi.object({
    noteId: Joi.number().integer().positive().required()
});

export const saveUserNoteSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    noteId: Joi.number().integer().positive().required(),
    content: Joi.string().required(),
    sourceId: Joi.number().integer().positive().required()
});

export const switchNoteVersionSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    noteId: Joi.number().integer().positive().required(),
    newContentId: Joi.number().integer().positive().required(),
    newSource: Joi.string().valid('draft', 'update_event').required()
});

export const getNoteUpdateEventsSchema = Joi.object({
    noteId: Joi.number().integer().positive().required()
});

export const getNoteOperationRecordsSchema = Joi.object({
    noteId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required()
});

export const getNoteDraftBoxSchema = Joi.object({
    noteId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required()
});

export const saveNoteDraftSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    noteId: Joi.number().integer().positive().required(),
    draftContent: Joi.string().required()
});

export const getUserNoteLibrariesSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

export const createNoteLibrarySchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    noteLibraryName: Joi.string().min(1).max(50).required()
});

export const addCollaboratorsSchema = Joi.object({
    noteLibraryId: Joi.number().integer().positive().required(),
    collaboratorIds: Joi.array().items(
        Joi.number().integer().positive()
    ).min(1).required()
});

export const removeCollaboratorsSchema = Joi.object({
    noteLibraryId: Joi.number().integer().positive().required(),
    removeCollaboratorIds: Joi.array().items(
        Joi.number().integer().positive()
    ).min(1).required()
});

export const renameNoteLibrarySchema = Joi.object({
    noteLibraryId: Joi.number().integer().positive().required(),
    newName: Joi.string().min(1).max(50).required()
});

export const deleteNoteLibrarySchema = Joi.object({
    noteLibraryId: Joi.number().integer().positive().required()
});
