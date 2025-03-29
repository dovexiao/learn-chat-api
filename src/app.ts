import express from 'express';
import AppDataSource from './config/data-source';

const app = express();

// 中间件
app.use(express.json());

// 数据库连接
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

// 路由

export default app;
