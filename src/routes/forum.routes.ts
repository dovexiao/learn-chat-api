import express from 'express';
import forumController from '../controllers/forum.controller';
import * as forumValidator from '../utils/validators/forum.validator';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import {checkBasicAuth} from "../middlewares/permission";

const router = express.Router();

// 应用认证中间件
router.use(authMiddleware);

// 帖子相关路由
router.get('/users/:userId/posts',
    validate(forumValidator.getPostsSchema, 'query'),
    checkBasicAuth,
    forumController.getPosts
);

router.get('/posts/:postId',
    validate(forumValidator.getPostDetailSchema, 'query'),
    checkBasicAuth,
    forumController.getPostDetail
);

router.post('/posts/add',
    validate(forumValidator.createPostSchema, 'body'),
    checkBasicAuth,
    forumController.createPost
);

router.post('/posts/:postId/comment',
    validate(forumValidator.commentPostSchema, 'body'),
    checkBasicAuth,
    forumController.commentPost
);

// 评论相关路由
router.get('/comments/:commentId',
    validate(forumValidator.getCommentDetailSchema, 'query'),
    checkBasicAuth,
    forumController.getCommentDetail
);

router.post('/comments/:commentId/reply',
    validate(forumValidator.replyCommentSchema, 'body'),
    checkBasicAuth,
    forumController.replyComment
);

// 标签相关路由
router.get('/users/:userId/tags/recent',
    validate(forumValidator.getUserTagsSchema, 'query'),
    checkBasicAuth,
    forumController.getUserTags
);

router.get('/users/:userId/tags/recommended',
    validate(forumValidator.getTagsSchema, 'query'),
    checkBasicAuth,
    forumController.getTags
);

router.get('/tags/search',
    validate(forumValidator.getTagsByContentSchema, 'query'),
    checkBasicAuth,
    forumController.getTagsByContent
);

router.post('/tags/add',
    validate(forumValidator.createTagSchema, 'body'),
    checkBasicAuth,
    forumController.createTag
);

export default router;
