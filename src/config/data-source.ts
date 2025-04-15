import "reflect-metadata";
import { dbConfig, appConfig } from './env';
import { DataSource, DataSourceOptions } from 'typeorm';

const typeormConfig: DataSourceOptions = {
    type: 'mysql',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,

    // 同步策略
    synchronize: appConfig.isDev, // 仅在开发环境同步
    migrationsRun: appConfig.isProd, // 生产环境自动运行迁移
    dropSchema: false, // 永远禁用

    // 日志策略
    logging: appConfig.isDev,

    // 实体和迁移路径
    entities: [`${__dirname}/../entities/**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.migration.{js,ts}`],
    subscribers: [`${__dirname}/../subscribers/*.subscriber.{js,ts}`],

    // 连接池配置
    extra: {
        connectionLimit: dbConfig.poolSize,
        idleTimeout: dbConfig.poolIdleTimeout,
    },

    // 其他安全设置
    charset: 'utf8mb4', // 支持emoji
    timezone: 'Z', // 使用UTC时区
};

const AppDataSource = new DataSource(typeormConfig);

export default AppDataSource;
