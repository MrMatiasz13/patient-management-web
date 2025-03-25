import { Router } from "express";
import createUser from "../controllers/userController";

const userRouter = Router();

userRouter.route('/api/create').post(createUser);


export default userRouter;