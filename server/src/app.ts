import express, { Application } from 'express';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import protectedRouter from './routes/protectedRoutes';

const app: Application = express();

app.use(express.json());
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', protectedRouter);

export default app;