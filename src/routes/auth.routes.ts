import express from "express";
import { validate } from '../middlewares/validate.middleware';
import { captchaMiddleware } from "../middlewares/captcha.middleware";
import authController from "../controllers/auth.controller";
import { loginSchema, registerSchema, refreshSchema } from "../utils/validators/auth.validator";

const router = express.Router();

router.post('/register',
    validate(registerSchema, 'body'),
    captchaMiddleware,
    authController.register
);

router.post('/login',
    validate(loginSchema, 'body'),
    captchaMiddleware,
    authController.login
);

router.get('/captcha', authController.getCaptcha);

router.post('/refresh',
    validate(refreshSchema, 'body'),
    authController.refreshToken
);

export default router;
