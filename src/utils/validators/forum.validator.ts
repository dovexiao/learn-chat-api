import Joi from 'joi';

export const getPostsSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

export const getPostDetailSchema = Joi.object({
    postId: Joi.number().integer().positive().required()
});

export const getCommentDetailSchema = Joi.object({
    commentId: Joi.number().integer().positive().required()
});

export const getUserTagsSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

export const getTagsSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

export const getTagsByContentSchema = Joi.object({
    content: Joi.string().min(1).max(500).required()
});

export const createTagSchema = Joi.object({
    content: Joi.string().min(1).max(500).required()
});

export const createPostSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    content: Joi.string().min(1).max(500).required(),
    tags: Joi.array().items(
        Joi.string().min(1).max(20)
    ).max(10).required(),
    images: Joi.array().items(
        Joi.number().integer().positive()
    ).max(9).optional()
});

export const commentPostSchema = Joi.object({
    postId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required(),
    content: Joi.string().min(1).max(500).required()
});

export const replyCommentSchema: Joi.ObjectSchema = Joi.object({
    commentId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required(),
    replyId: Joi.number().integer().positive().allow(null).required(),
    content: Joi.string().min(1).max(500).required()
})
