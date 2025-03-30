import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';
import { registerSchema, loginSchema } from '../utils/validators/auth.validator';

export const validateRegisterParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        throw new ValidationError(error.details[0].message);
    }
    next();
};

export const validateLoginParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        throw new ValidationError(error.details[0].message);
    }
    next();
};


