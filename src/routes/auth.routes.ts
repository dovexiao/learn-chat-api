import express from "express";
import {validateLoginParams, validateRegisterParams} from "../middlewares/validateParams.middleware";
import {captchaMiddleware} from "../middlewares/captcha.middleware";
import {authController} from "../controllers/AuthController";

const router = express.Router();

router.post('/register',
    captchaMiddleware,
    validateRegisterParams,
    authController.register
);

router.post('/login',
    captchaMiddleware,
    validateLoginParams,
    authController.login
);

router.get('/captcha', authController.getCaptcha);

router.post('/refresh', authController.refreshToken);

export default router;
