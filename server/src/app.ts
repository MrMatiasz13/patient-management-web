import express, { Application } from 'express';
import userRouter from './routes/userRoutes';

const app: Application = express();

app.use(express.json());
app.use('/', userRouter);

export default app;