import express from 'express';
import resourceController from '../controllers/resource.controller';
import * as resourceValidator from '../utils/validators/resource.validator';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkBasicAuth } from "../middlewares/permission";

const router = express.Router();

// 应用认证中间件
router.use(authMiddleware);

router.post('/upload/image',
    validate(resourceValidator.uploadImageSchema, 'body'),
    checkBasicAuth,
    resourceController.uploadImage
);

export default router;
