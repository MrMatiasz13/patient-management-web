import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET } from '../constants/configConstants';
import SequelizeRefreshToken from '../models/refreshToken';

class RefreshTokenService {
    async createRefreshToken(userId: number): Promise<string> {
        if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is undefined");

        try {
            const refreshToken = jwt.sign({ id: userId }, 
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
}

export default RefreshTokenService;