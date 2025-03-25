import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler"; 
import { authService } from "../services";

const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    await authService.login(email, password);
    res.status(201).json({ message: "Login successful" });
});

export default login;