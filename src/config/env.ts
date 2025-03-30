// src/config/env.ts
import { config } from 'dotenv';
import { z } from 'zod';

// 初始化环境变量加载
config({ path: '.env' });

// 定义环境变量Schema
const envSchema = z.object({
    // 数据库配置
    DB_HOST: z.string().min(1).default('localhost'),
    DB_PORT: z.coerce.number().int().positive().default(3306),
    DB_USERNAME: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_DATABASE: z.string().min(1),
    DB_POOL_SIZE: z.coerce.number().int().positive().optional().default(20),
    DB_POOL_IDLE_TIMEOUT: z.coerce.number().int().positive().default(30000),
    FORCE_SYNC: z
        .enum(['true', 'false'])
        .transform(val => val === 'true')
        .default('false'),

    // 应用配置
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),

    // JWT配置
    JWT_SECRET: z.string().min(1).default('e4e98529463a67338b00e94f1e6058ed8e0f7086a57f407dc5ab62def69e6928'),
    JWT_REFRESH_SECRET: z.string().min(1).default('d9eaccea2c4c7ef1fbc40cfa48beea42ffe2f112edfbfc0058fdb41e66c400b3\n'),

    // 缓存配置
    CACHE_TTL: z.coerce.number().int().positive().default(3600),

    // 可选配置示例（未来扩展用）
    // JWT_SECRET: z.string().min(32).optional(),
    // REDIS_URL: z.string().url().optional(),
});

// 校验并格式化配置
const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
    console.error(
        '❌ 环境变量校验失败:',
        parseResult.error.flatten().fieldErrors
    );
    throw new Error('环境变量配置错误');
}

// 导出类型安全配置
export const env = parseResult.data;
export type EnvConfig = z.infer<typeof envSchema>;

// 导出常用配置组
export const dbConfig = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    poolSize: env.DB_POOL_SIZE,
    poolIdleTimeout: env.DB_POOL_IDLE_TIMEOUT,
    forceSync: env.FORCE_SYNC,
};

export const appConfig = {
    isDev: env.NODE_ENV === 'development',
    isProd: env.NODE_ENV === 'production',
    port: env.PORT,
};

// 新增导出的JWT配置组
export const jwtConfig = {
    secret: env.JWT_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
};

// 新增导出的缓存配置
export const cacheConfig = {
    ttl: env.CACHE_TTL,
};
