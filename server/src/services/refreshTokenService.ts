import jwt, { JwtPayload } from "jsonwebtoken";
import {
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
} from "../constants/configConstants";
import SequelizeRefreshToken from "../models/refreshToken";
import RefreshTokenRepository from "../repositories/refreshTokenRepository";

class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async createRefreshToken(userId: number): Promise<string> {
    if (!REFRESH_TOKEN_SECRET)
      throw new Error("REFRESH_TOKEN_SECRET is undefined");

    try {
      const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      });

      const existingToken =
        await this.refreshTokenRepository.getByUserId(userId);

      if (!existingToken) {
        await this.refreshTokenRepository.create({
          userId: userId,
          token: refreshToken,
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
    const record = await this.refreshTokenRepository.getByUserId(userId);
    if (!record) throw new Error("Token not found");

    return record.token;
  }

  async deleteRefreshToken(userId: number): Promise<void> {
    const record = await this.refreshTokenRepository.getByUserId(userId);
    if (!record) throw new Error("Token not found");

    await this.refreshTokenRepository.delete(record);
  }
}

export default RefreshTokenService;
