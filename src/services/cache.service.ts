import NodeCache from 'node-cache';
import {UserEntity} from "../entities/user.entity";
import {cacheConfig} from "../config/env";

class CacheService {
    private cache = new NodeCache({ stdTTL: cacheConfig.ttl });

    // 基础缓存操作
    cacheData<T>(key: string, data: T, ttl?: number) {
        this.cache.set(key, data, ttl ? ttl : '');
    }

    // 基础获取缓存数据
    getCachedData<T>(key: string): T | undefined {
        return this.cache.get(key);
    }

    // 基础删除缓存数据
    deleteCachedData(key: string) {
        this.cache.del(key);
    }

    // 验证图片验证码
    verifyCaptcha(captcha: string) {
        return this.getCachedData(`captcha_${captcha}`);
    }

    // 删除图片验证码
    deleteCaptcha(captcha: string) {
        this.deleteCachedData(`captcha_${captcha}`);
    }

    // 缓存用户信息（1小时）
    cacheUser(user: UserEntity) {
        this.cache.set(`user_${user.userId}`, user);
    }

    // 获取缓存用户
    getCachedUser(userId: number): UserEntity | undefined {
        return this.cache.get(`user_${userId}`);
    }
}

export const cacheService = new CacheService();
