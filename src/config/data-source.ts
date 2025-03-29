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
    synchronize: appConfig.isDev && dbConfig.forceSync !== true,
    logging: appConfig.isDev,
    entities: [`${__dirname}/../entities/**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/**/*.entity.{js,ts}`],
    subscribers: [`${__dirname}/../subscribers/**/*.entity.{js,ts}`],
    extra: {
        connectionLimit: dbConfig.poolSize,
        idleTimeout: dbConfig.poolIdleTimeout,
    },
    // 生产环境建议关闭
    dropSchema: false,
    migrationsRun: false,
};

const AppDataSource = new DataSource(typeormConfig);

export default AppDataSource;
