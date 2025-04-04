import Joi from 'joi';
import { MESSAGE_STATUS } from "../../config/constants";

export const getUserChatSpacesSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

export const createGroupChatSpaceSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    chatSpaceName: Joi.string().min(1).max(50).required(),
    memberIds: Joi.array().items(
        Joi.number().integer().positive()
    ).min(1).required()
});

export const shareGroupChatSpaceCardSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    contactUserId: Joi.number().integer().positive().required(),
    chatSpaceId: Joi.number().integer().positive().required(),
    sharedChatSpaceId: Joi.number().integer().positive().required()
});

export const joinGroupChatSpaceSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    chatSpaceId: Joi.number().integer().positive().required()
});

export const joinDirectChatSpaceSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    createUserId: Joi.number().integer().positive().required(),
    contactUserId: Joi.number().integer().positive().required()
});

export const deleteGroupChatSpaceSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    chatSpaceId: Joi.number().integer().positive().required(),
});

export const deleteDirectChatSpaceSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    chatSpaceId: Joi.number().integer().positive().required()
});

export const createMessageSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    chatSpaceId: Joi.number().integer().positive().required(),
    content: Joi.string().min(1).max(2000).required()
});

export const updateMessageStatusSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    messageId: Joi.number().integer().positive().required(),
    status: Joi.string().valid(...Object.keys(MESSAGE_STATUS)).required()
});

export const deleteMessageSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    messageId: Joi.number().integer().positive().required()
});
