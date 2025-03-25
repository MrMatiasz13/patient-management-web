import express, { Application } from 'express';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';

const app: Application = express();

app.use(express.json());
app.use('/', userRouter);
app.use('/', authRouter);

export default app;