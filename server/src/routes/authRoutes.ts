import { Router } from "express";
import createUser from "../controllers/userController";

const authRouter = Router();

authRouter.route('/api/register').post(createUser);


export default authRouter;