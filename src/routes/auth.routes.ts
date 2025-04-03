import express from "express";
import { validate } from '../middlewares/validate.middleware';
import { captchaMiddleware } from "../middlewares/captcha.middleware";
import { authController } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../utils/validators/auth.validator";

const router = express.Router();

router.post('/register',
    captchaMiddleware,
    validate(registerSchema),
    authController.register
);

router.post('/login',
    captchaMiddleware,
    validate(loginSchema),
    authController.login
);

router.get('/captcha', authController.getCaptcha);

router.post('/refresh', authController.refreshToken);

export default router;
