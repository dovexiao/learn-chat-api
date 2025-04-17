import AppDataSource from "../config/data-source";
import * as forumRepositories from "../repositories/forumRepositories";
import {UserRepository} from "../repositories/user.repository";
import {NotFoundError} from "../utils/errors";
import {ILike} from "typeorm";
import {ImageRepository} from "../repositories/resourceRepositories";

export class ForumService {
    private PostRepo = new forumRepositories.PostRepository();
    private CommentRepo = new forumRepositories.CommentRepository();
    private ReplyRepo = new forumRepositories.ReplyRepository();
    private TagRepo = new forumRepositories.TagRepository();
    private userRepo = new UserRepository();
    private imageRepo = new ImageRepository();

    // 获取推荐帖子列表
    getPosts = async (userId: number) => {
        try {
            const posts = await this.PostRepo.find({isDeleted: false});
            return await Promise.all(posts.map(async post => {
                const user = await this.userRepo.findOne({userId: post.createUserId});
                const image = post.images ?
                    await this.imageRepo.findOne({id: parseInt(post.images.split(',')[0]), isDelete: false}) :
                    null;
                return {
                    postId: post.id,
                    content: post.content,
                    tags: post.tags ? post.tags.split(',') : [],
                    cover: image ? {
                        base64: image.base64,
                        type: image.type,
                        width: image.width,
                        height: image.height,
                    } : null,
                    likes: post.likes,
                    views: post.views,
                    createTime: this.formatDate(post.createTime),
                    username: user ? user.username : '',
                    nickname: user ? user.nickname : '',
                }
            }));
        } catch(error) {
            throw error;
        }
    }

    // 获取帖子详情
    getPostDetail = async (postId: number) => {
        try {
            const post = await this.PostRepo.findOne({id: postId});

            if (!post) {
                throw new NotFoundError('帖子不存在');
            }
            const user = await this.userRepo.findOne({userId: post.createUserId});
            const comments = await this.CommentRepo.find({postId});
            const images = await Promise.all((post.images ? post.images.split(',') : []).map(async imageId => {
                const image = await this.imageRepo.findOne({id: parseInt(imageId), isDelete: false});
                return image ? {
                    base64: image.base64,
                    type: image.type,
                    width: image.width,
                    height: image.height,
                } : null;
            }));

            return {
                postId: post.id,
                content: post.content,
                tags: post.tags ? post.tags.split(',') : [],
                cover: images[0],
                images: images,
                likes: post.likes,
                views: post.views,
                createTime: this.formatDate(post.createTime),
                username: user ? user.username : '',
                nickname: user ? user.nickname : '',
                comments: await Promise.all(comments.map(async comment => {
                    const replies = await this.ReplyRepo.find({commentId: comment.id});
                    const commentUser = await this.userRepo.findOne({userId: comment.createUserId});
                    return {
                        commentId: comment.id,
                        content: comment.content,
                        createTime: this.formatDate(comment.createTime),
                        username: commentUser ? commentUser.username : '',
                        nickname: commentUser ? commentUser.nickname : '',
                        replies: await Promise.all(replies.map(async reply => {
                            const replyUser = await this.userRepo.findOne({userId: reply.createUserId});
                            const repliedUser = reply.repliedUserId ? await this.userRepo.findOne({userId: reply.repliedUserId}): null;
                            return {
                                replyId: reply.id,
                                content: reply.content,
                                createTime: this.formatDate(reply.createTime),
                                username: replyUser ? replyUser.username : '',
                                nickname: replyUser ? replyUser.nickname : '',
                                repliedUsername: repliedUser ? repliedUser.username : '',
                                repliedNickname: repliedUser ? repliedUser.nickname : '',
                            }
                        })),
                    }
                })),
            };
        } catch(error) {
            throw error;
        }
    }

    // 获取评论详情
    getCommentDetail = async (commentId: number) => {
        try {
            const comment = await this.CommentRepo.findOne({id: commentId});
            if (!comment) {
                throw new NotFoundError('评论不存在');
            }
            const replies = await this.ReplyRepo.find({commentId: comment.id});
            const commentUser = await this.userRepo.findOne({userId: comment.createUserId});
            return {
                commentId: comment.id,
                content: comment.content,
                createTime: this.formatDate(comment.createTime),
                username: commentUser ? commentUser.username : '',
                nickname: commentUser ? commentUser.nickname : '',
                replies: await Promise.all(replies.map(async (reply) => {
                    const replyUser = await this.userRepo.findOne({userId: reply.createUserId});
                    const repliedUser = reply.repliedUserId ? await this.userRepo.findOne({userId: reply.repliedUserId}): null;
                    return {
                        replyId: reply.id,
                        content: reply.content,
                        createTime: this.formatDate(reply.createTime),
                        username: replyUser ? replyUser.username : '',
                        nickname: replyUser ? replyUser.nickname : '',
                        repliedUsername: repliedUser ? repliedUser.username : '',
                        repliedNickname: repliedUser ? repliedUser.nickname : '',
                    }
                }))
            }
        } catch(error) {
            throw error;
        }
    }

    // 获取用户最近使用tags
    getUserTags = async (userId: number) => {
        try {
            const posts = await this.PostRepo.find({createUserId: userId});
            let tags: string[] = [];
            posts.forEach(post => {
                if (post.tags) {
                    tags = tags.concat(post.tags.split(','));
                }
            })
            return Array.from(new Set(tags));
        } catch(error) {
            throw error;
        }
    }

    // 获取推荐使用tags
    getTags = async (userId: number) => {
        try {
            const tags = await this.TagRepo.find();
            return tags.map(tag => {
                return {
                    tagId: tag.id,
                    content: tag.content,
                    participants: tag.participants,
                }
            }).slice(0, 20);
        } catch(error) {
           throw error;
        }
    }

    // 获取tags通过content
    getTagsByContent = async (content: string) => {
        try {
            const tags = await this.TagRepo.find({
                content: ILike(`%${content}%`)
            });
            return tags.map(tag => {
                return {
                    tagId: tag.id,
                    content: tag.content,
                    participants: tag.participants,
                }
            });
        } catch(error) {
            throw error;
        }
    }

    // 创建tag
    createTag = async (content: string) => {
        try {
            const tag = await this.TagRepo.findOne({content});
            if (!tag) {
                await this.TagRepo.save({
                    content: content,
                    participants: 0,
                    createTime: new Date(),
                });
            }
        } catch(error) {
            throw error;
        }
    }

    // 发布帖子
    createPost = async (userId: number, content: string, tags: string[], images: number[]) => {
        try {
            await this.PostRepo.save({
                content: content,
                tags: tags.join(','),
                images: images.join(','),
                likes: 0,
                views: 0,
                createUserId: userId,
                createTime: new Date(),
                isDeleted: false
            });
        } catch(error) {
            throw error;
        }
    }

    // 评论帖子
    commentPost = async (postId: number, userId: number, content: string) => {
        try {
            await this.CommentRepo.save({
                content: content,
                createUserId: userId,
                createTime: new Date(),
                postId: postId,
            });
            const comments = await this.CommentRepo.find({postId});
            return await Promise.all(comments.map(async comment => {
                const replies = await this.ReplyRepo.find({commentId: comment.id});
                const commentUser = await this.userRepo.findOne({userId: comment.createUserId});
                return {
                    commentId: comment.id,
                    content: comment.content,
                    createTime: this.formatDate(comment.createTime),
                    username: commentUser ? commentUser.username : '',
                    nickname: commentUser ? commentUser.nickname : '',
                    replies: await Promise.all(replies.map(async reply => {
                        const replyUser = await this.userRepo.findOne({userId: reply.createUserId});
                        const repliedUser = reply.repliedUserId ? await this.userRepo.findOne({userId: reply.repliedUserId}): null;
                        return {
                            replyId: reply.id,
                            content: reply.content,
                            createTime: this.formatDate(reply.createTime),
                            username: replyUser ? replyUser.username : '',
                            nickname: replyUser ? replyUser.nickname : '',
                            repliedUsername: repliedUser ? repliedUser.username : '',
                            repliedNickname: repliedUser ? repliedUser.nickname : '',
                        }
                    })),
                }
            }));
        } catch(error) {
            throw error;
        }
    }

    // 回复评论 / 回复回复
    replyComment = async (commentId: number, userId: number, replyId: number, content: string) => {
        try {
            const repliedUserId = replyId ? await this.ReplyRepo.findOne({id: replyId}).then(reply => reply?.createUserId) : -1;

            await this.ReplyRepo.save({
                content: content,
                createUserId: userId,
                createTime: new Date(),
                commentId: commentId,
                repliedUserId: repliedUserId,
            });
            return this.getCommentDetail(commentId);
        } catch(error) {
            throw error;
        }
    };

    formatDate = (date: Date | undefined) => {
        try {
            return date ? date.toISOString().split('T')[0].split('-').join('/') : '';
        } catch (error) {
            throw error;
        }
    };
}
