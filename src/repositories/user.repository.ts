import { BaseRepository } from './base.repository';
import { UserEntity } from '../entities/user.entity';
import {EntityManager} from 'typeorm';
import {USER_PERMISSIONS} from "../config/constants";

export class UserRepository extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async create(username: string, password: string) {
        return this.save({
            username,
            password,
            nickname: '',
            avatar: '',
            permissions: Object.values(USER_PERMISSIONS).join(',')
        });
    }

    // 自定义查询方法
    async findByUsername(username: string) {
        return this.findOne({ username });
    }

    async findByUserId(userId: number) {
        return this.findOne({ userId });
    }

    // GitHub用户处理
    // async findOrCreateByGithub(profile: any) {
    //     const existingUser = await this.findOne({ githubId: profile.id });
    //     if (existingUser) return existingUser;
    //
    //     return this.save({
    //         githubId: profile.id,
    //         username: profile.username,
    //         email: profile.emails?.[0]?.value
    //     });
    // }
}
