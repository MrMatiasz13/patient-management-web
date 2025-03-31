import { SignOptions } from "jsonwebtoken";

export const PORT = process.env.PORT || 5000;

export const SECRET_KEY = process.env.SECRET_KEY;
export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION as SignOptions["expiresIn"];
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION as SignOptions["expiresIn"];
