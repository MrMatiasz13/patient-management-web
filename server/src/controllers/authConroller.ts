import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import asyncHandler from "express-async-handler"; 
import { AuthError } from "../utils/errors/authError";

const login = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const token = await authService.login(email, password);
        res.status(200).json({ message: "Login successful", token: token });
    } catch (err) {
        if (err instanceof AuthError) {
            console.log(err);
            res.status(401).json({message: err.message});
            return;
        }

        console.log(err);
        res.status(500).json({ message: err });
    }
});

const refreshAccessToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    const token = await authService.generateAccessToken(refreshToken);
    res.status(200).json({ token: token, userID: refreshToken.userId });
});

export { login, refreshAccessToken };