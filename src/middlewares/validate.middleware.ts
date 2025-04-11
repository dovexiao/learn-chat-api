import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';
import { AnySchema } from "joi";

type ValidateTarget = 'body' | 'params' | 'query' | ('body' | 'params' | 'query')[];

export const validate = (schema: AnySchema, target: ValidateTarget = 'body') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const targets = Array.isArray(target) ? target : [target];
        const errorBags: {[key: string]: string[]} = {};

        // 初始化错误收集对象
        targets.forEach(t => { errorBags[t] = []; });

        // 检查指定目标
        for (const t of targets) {
            const { error } = schema.validate(req[t], {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true
            });

            if (!error) {
                // 任意一个验证通过就直接放行
                return next();
            }

            errorBags[t] = error.details.map(d => d.message);
        }

        // 如果全部未通过，构造友好的错误信息
        const errorMessages = Object.entries(errorBags)
            .filter(([_, messages]) => messages.length > 0)
            .map(([key, messages]) => `${key} errors: ${messages.join(', ')}`)
            .join('; ');

        throw new ValidationError(errorMessages || 'Validation failed');
    };
};
