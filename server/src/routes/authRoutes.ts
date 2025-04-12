import { Router } from "express";
import { login, logout, refreshAccessToken } from "../controllers/authConroller";

const authRouter = Router();

authRouter.route('/auth/login').post(login);
authRouter.route('/auth/refresh').post(refreshAccessToken);
authRouter.route('/auth/logout').post(logout);

export default authRouter;