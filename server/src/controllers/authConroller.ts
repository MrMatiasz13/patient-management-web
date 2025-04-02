import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import asyncHandler from "express-async-handler"; 

const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    const token = await authService.login(email, password);
    res.status(200).json({ message: "Login successful", token: token });
});

const refreshAccessToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    const token = await authService.generateAccessToken(refreshToken);
    res.status(200).json({ token: token, userID: refreshToken.userId });
});

export { login, refreshAccessToken };