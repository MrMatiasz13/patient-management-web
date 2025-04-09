import jwt, { JwtPayload } from 'jsonwebtoken';
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

            const existingToken = await SequelizeRefreshToken.findOne({ where: { userId: userId } });
            if (!existingToken) {
                await SequelizeRefreshToken.create({
                    userId: userId,
                    token: refreshToken
                });
    
                return refreshToken;
            }

            await existingToken.update({ token: refreshToken });
            
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

    async getRefreshToken(userId: number): Promise<string> {
        const record = await SequelizeRefreshToken.findOne({ where: { userId: userId } });
        if (!record) throw new Error("There is no token with this user id.");

        return record.token;
    }
}

export default RefreshTokenService;