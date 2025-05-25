import { NextFunction, Request, Response } from "express";
import { authService } from "../di";
import asyncHandler from "express-async-handler"; 
import { AuthError } from "../utils/errors/authError";

const login = (async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const { user, accessToken } = await authService.login(email, password);
        res.status(200).json({
             message: "Login successful", 
             token: accessToken, 
             user: {
                id: user.id,
                name: user.name,
                surename: user.surename,
                email: user.email,
             }
            });
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

const logout = (async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        await authService.logout(userId);
        res.status(204).json({ message: "Logouted" });
    } catch (err: any) {
        console.error("Logout error:", err);
        res.status(500).json({ error: err.message || "Internal server error" });
    }
});

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;

    const data = await authService.generateAccessToken(userId);
    const user = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        surename: data.user.surename,
    }
    res.status(201).json({ token: data.token, user: user });
});

export { 
    login,
    logout, 
    refreshAccessToken 
};