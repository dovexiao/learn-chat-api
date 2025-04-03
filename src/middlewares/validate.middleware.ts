import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';
import {AnySchema} from "joi";

export const validate = (schema: AnySchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // 同时验证 body、params 和 query
        const { error } = schema.validate({
            body: req.body,
            params: req.params,
            query: req.query
        }, {
            abortEarly: false, // 返回所有验证错误
            allowUnknown: true, // 允许未定义的字段
            stripUnknown: true // 移除未定义的字段
        });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message).join(', ');
            throw new ValidationError(errorMessages);
        }

        next();
    };
};


