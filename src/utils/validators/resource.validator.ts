import Joi from 'joi';

export const uploadImageSchema = Joi.object({
    image: Joi.object({
        type: Joi.string().required(),
        width: Joi.number().integer().positive().required(),
        height: Joi.number().integer().positive().required(),
        base64: Joi.string().required()
    }).required()
});
