import { Router } from "express";

const authRouter = Router();

authRouter.post('/login', (req, res) => {
    res.status(200).json({ message: "Login is working" });
});

authRouter.post('/register', (req, res) => {
    res.status(200).json({ message: "Register is working" });
});

export default authRouter;