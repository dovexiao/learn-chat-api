import express from 'express';
import AppDataSource from './config/data-source';
import { errorHandler } from './middlewares/error-handler.middleware';
import AuthRoutes from './routes/auth.routes';
import NoteRoutes from './routes/note.routes';
import ChatRoutes from './routes/chat.routes';
import ForumRoutes from './routes/forum.routes';
import ResourceRoutes from './routes/resource.routes';

const app = express();

// 中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

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
app.use('/api/forum', ForumRoutes)
app.use('/api/resource', ResourceRoutes)

app.use(errorHandler);

export default app;
