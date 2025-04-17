import { Request, Response, NextFunction } from 'express';
import { ForumService } from '../services/forum.service';
import { logger } from '../utils/logger';

class ForumController {
    private forumService = new ForumService();

    // 获取推荐帖子列表
    getPosts = async (req: Request, res: Response, next: NextFunction) => {
        const userId = parseInt(req.query.userId as string);
        logger.info('获取推荐帖子列表 | Fetching recommended posts', {userId});

        try {
            const posts = await this.forumService.getPosts(userId);
            console.log(posts);
            logger.info('推荐帖子列表获取成功 | Posts fetched successfully', {
                userId,
                count: posts.length
            });
            res.status(200).json({
                success: true,
                data: {
                    posts
                },
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('获取帖子列表失败 | Failed to fetch posts', {
                userId,
                error: error.message
            });
            next(error);
        }
    };

    // 获取帖子详情
    getPostDetail = async (req: Request, res: Response, next: NextFunction) => {
        const postId = parseInt(req.query.postId as string);
        logger.info('获取帖子详情 | Fetching post details', {postId});

        try {
            const post = await this.forumService.getPostDetail(postId);
            logger.info('帖子详情获取成功 | Post details fetched', {postId});
            res.status(200).json({
                success: true,
                data: {
                    post,
                },
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('获取帖子详情失败 | Failed to fetch post details', {
                postId,
                error: error.message
            });
            next(error);
        }
    };

    // 获取评论详情
    getCommentDetail = async (req: Request, res: Response, next: NextFunction) => {
        const commentId = parseInt(req.query.commentId as string);
        logger.info('获取评论详情 | Fetching comment details', {commentId});

        try {
            const comment = await this.forumService.getCommentDetail(commentId);
            logger.info('评论详情获取成功 | Comment details fetched', {commentId});
            res.status(200).json({
                success: true,
                data: {
                    comment,
                },
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('获取评论详情失败 | Failed to fetch comment details', {
                commentId,
                error: error.message
            });
            next(error);
        }
    };

    // 获取用户最近使用的标签
    getUserTags = async (req: Request, res: Response, next: NextFunction) => {
        const userId = parseInt(req.query.userId as string);
        logger.info('获取用户最近使用标签 | Fetching user recent tags', {userId});

        try {
            const tags = await this.forumService.getUserTags(userId);
            logger.info('用户标签获取成功 | User tags fetched successfully', {
                userId,
                count: tags.length
            });
            res.status(200).json({
                success: true,
                data: {
                    tags,
                },
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('获取用户标签失败 | Failed to fetch user tags', {
                userId,
                error: error.message
            });
            next(error);
        }
    };

    // 获取推荐标签
    getTags = async (req: Request, res: Response, next: NextFunction) => {
        const userId = parseInt(req.query.userId as string);
        logger.info('获取推荐标签 | Fetching recommended tags', {userId});

        try {
            const tags = await this.forumService.getTags(userId);
            logger.info('推荐标签获取成功 | Tags fetched successfully', {
                userId,
                count: tags.length
            });
            res.status(200).json({
                success: true,
                data: {
                    tags,
                },
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('获取标签失败 | Failed to fetch tags', {
                userId,
                error: error.message
            });
            next(error);
        }
    };

    // 根据内容搜索标签
    getTagsByContent = async (req: Request, res: Response, next: NextFunction) => {
        const content = req.query.content as string;
        logger.info('根据内容搜索标签 | Searching tags by content', {content});

        try {
            const tags = await this.forumService.getTagsByContent(content);
            logger.info('标签搜索成功 | Tags searched successfully', {
                content,
                count: tags.length
            });
            res.status(200).json({
                success: true,
                data: {
                    tags,
                },
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('标签搜索失败 | Failed to search tags', {
                content,
                error: error.message
            });
            next(error);
        }
    };

    // 创建标签
    createTag = async (req: Request, res: Response, next: NextFunction) => {
        const { content } = req.body;
        logger.info('创建新标签 | Creating new tag', {content});

        try {
            await this.forumService.createTag(content);
            logger.info('标签创建成功 | Tag created successfully', {content});
            res.status(201).json({
                success: true,
                message: '标签创建成功 | Tag created successfully',
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('标签创建失败 | Failed to create tag', {
                content,
                error: error.message
            });
            next(error);
        }
    };

    // 发布帖子
    createPost = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, content, tags, images } = req.body;
        logger.info('发布新帖子 | Creating new post', {userId});

        try {
            await this.forumService.createPost(userId, content, tags, images);
            logger.info('帖子发布成功 | Post created successfully', {userId});
            res.status(201).json({
                success: true,
                message: '帖子发布成功 | Post created successfully',
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('帖子发布失败 | Failed to create post', {
                userId,
                error: error.message
            });
            next(error);
        }
    };

    // 评论帖子
    commentPost = async (req: Request, res: Response, next: NextFunction) => {
        const { postId, userId, content } = req.body;
        logger.info('评论帖子 | comment post', {userId});

        try {
            const comments = await this.forumService.commentPost(postId, userId, content);
            logger.info('评论帖子成功 | comment post successfully', {userId});
            res.status(201).json({
                success: true,
                data: {
                    comments
                },
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('评论帖子失败 | Failed to comment post', {
                userId,
                error: error.message
            })
            next(error);
         }
    };

    // 回复评论
    replyComment = async (req: Request, res: Response, next: NextFunction) => {
        const { commentId, userId, replyId, content } = req.body;
        logger.info('回复评论 | reply comment', {userId});

        try {
            const comment = await this.forumService.replyComment(commentId, userId, replyId, content);
            logger.info('回复评论成功 | reply comment successfully', {userId});
            res.status(201).json({
                success: true,
                data: {
                    comment
                },
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            logger.error('回复评论失败 | Failed to reply comment', {
                userId,
                error: error.message
            })
            next(error);
        }
    };
}

export default new ForumController();
