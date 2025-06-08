import express, { Application } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import patientRouter from "./routes/patientRoutes";
import testRouter from "./routes/screeningTestRoutes";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", userRouter);
app.use("/", authRouter);
app.use("/", patientRouter);
app.use("/", testRouter);

export default app;
