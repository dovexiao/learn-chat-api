import {
    EntityManager,
    Repository,
    EntityTarget,
    DeepPartial,
    SaveOptions,
    FindOptionsWhere,
    UpdateResult
} from 'typeorm';
import AppDataSource from '../config/data-source';

export class BaseRepository<T> {
    constructor(private entity: EntityTarget<T>) {}

    // 基础查询
    async find(where?: FindOptionsWhere<T>, manager?: EntityManager) {
        return this.getRepo(manager).find({ where });
    }

    // 单条查询
    async findOne(where: FindOptionsWhere<T>, manager?: EntityManager) {
        return this.getRepo(manager).findOne({ where });
    }

    // 新增
    async save(entity: DeepPartial<T>, manager?: EntityManager) {
        return this.getRepo(manager).save(entity);
    }

    // 批量新增
    async saveMany(
        entities: DeepPartial<T>[],
        options?: SaveOptions,
        manager?: EntityManager
    ) {
        return this.getRepo(manager).save(entities, options);
    }

    // 更新
    async update(where: FindOptionsWhere<T>, updates: DeepPartial<T>, manager?: EntityManager){
        return this.getRepo(manager).update(where, updates as any);
    }

    protected getRepo(manager?: EntityManager): Repository<T> {
        return manager
            ? manager.getRepository(this.entity)
            : AppDataSource.getRepository(this.entity);
    }
}
