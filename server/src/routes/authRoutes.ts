import { Router } from "express";
import login from "../controllers/authConroller";

const authRouter = Router();

authRouter.route('/api/login').post(login);

export default authRouter;