import express, { Application } from 'express';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import patientRouter from './routes/patientRoutes';

const app: Application = express();

app.use(express.json());
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', patientRouter);

export default app;