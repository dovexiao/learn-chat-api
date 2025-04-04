import express from 'express';
import AppDataSource from './config/data-source';
import { errorHandler } from './middlewares/error-handler.middleware';
import AuthRoutes from './routes/auth.routes';
import NoteRoutes from './routes/note.routes';
import ChatRoutes from './routes/chat.routes';

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
app.use('/api/auth', AuthRoutes);
app.use('/api/note', NoteRoutes);
app.use('/api/chat', ChatRoutes);

app.use(errorHandler);

export default app;
