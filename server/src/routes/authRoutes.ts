import { Router } from "express";
import login from "../controllers/authConroller";

const authRoutes = Router();

authRoutes.route('/api/login').post(login);

export default authRoutes;