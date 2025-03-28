import { Router } from "express";
import login from "../controllers/authConroller";

const authRouter = Router();

authRouter.route('/auth/login').post(login);

export default authRouter;