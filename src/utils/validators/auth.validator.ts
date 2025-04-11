import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    captchaKey: Joi.string().required(),
    captchaText: Joi.string().required()
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    captchaKey: Joi.string().required(),
    captchaText: Joi.string().required()
});

export const refreshSchema = Joi.object({
    refreshToken: Joi.string().required()
});
