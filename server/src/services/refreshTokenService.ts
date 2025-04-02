import bcrypt from "bcrypt-ts";
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import { REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET } from '../constants/configConstants';
import SequelizeRefreshToken from '../models/refreshToken';

class RefreshTokenService {
    async createRefreshToken(userId: number): Promise<string> {
        if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is undefined");

        try {
            const refreshToken = jwt.sign({ userId: userId }, 
                REFRESH_TOKEN_SECRET, 
                { expiresIn: REFRESH_TOKEN_EXPIRATION }
            );

            await SequelizeRefreshToken.create({
                userId: userId,
                token: refreshToken
            });

            return refreshToken;
        } catch (err) {
            throw new Error(`Failed to create refresh token: ${err}`);
        }
    }

    async verifyRefreshToken(token: string): Promise<JwtPayload | null> {
        try {
            const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET!) as JwtPayload;
            return decoded;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

export default RefreshTokenService;