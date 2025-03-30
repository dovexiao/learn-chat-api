import winston from 'winston';
import { StreamOptions } from 'morgan';
import DailyRotateFile from 'winston-daily-rotate-file';

export const logger = winston.createLogger({
    level: 'info', // 日志级别
    format: winston.format.combine(
        winston.format.timestamp(), // 添加时间戳
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        // 输出到控制台
        new winston.transports.Console(),
        // 输出到文件
        // new winston.transports.File({ filename: 'logs/app.log' }),
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m', // 每个日志文件最大 20MB
            maxFiles: '14d', // 保留最近 14 天的日志
        }),
    ],
});

export const morganStream: StreamOptions = {
    write: (message: string) => {
        logger.info(message.trim()); // 将 morgan 的日志输出到 winston
    },
};

// import { logger } from './utils/logger';
// logger.info('Application started!');
// logger.error('An error occurred!');
