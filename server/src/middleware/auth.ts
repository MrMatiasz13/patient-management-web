import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../constants/configConstants";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: { id: string; username: string; email: string };
}

const veryfiToken = async(req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("authorization");
    if (!token) {
        res.status(401).json({ error: "Access denied!" });
        return;
    }

    try {
        const secretKey = SECRET_KEY;
        if (!secretKey) throw new Error("SECRET_KEY is undefinded.");

        const decodedUser = jwt.verify(token, secretKey) as { id: string, username: string, email: string };
        req.user = decodedUser;
        next();
    } catch(err) {
        return res.status(403).json({ message: "Access denied. Invalid or expired token." });
    }
};

export default veryfiToken;