import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../constants/configConstants";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: { id: number; username: string; email: string };
}

const verifyToken = async(req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token) {
        res.status(401).json({ error: "Access denied." });
        return;
    }

    try {
        const secretKey = SECRET_KEY;
        if (!secretKey) throw new Error("SECRET_KEY is undefinded.");

        const decodedUser = jwt.verify(token, secretKey) as { id: number, username: string, email: string };
        req.user = decodedUser;
        next();
    } catch(err) {
        res.status(403).json({ message: "Access denied. Invalid or expired token." });
    }
};

export default verifyToken;