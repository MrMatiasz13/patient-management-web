import { Router } from "express";
import { login, refreshAccessToken } from "../controllers/authConroller";

const authRouter = Router();

authRouter.route('/auth/login').post(login);
authRouter.route('/auth/refresh').post(refreshAccessToken);

export default authRouter;