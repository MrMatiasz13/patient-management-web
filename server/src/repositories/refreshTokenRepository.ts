import { refreshTokenDto } from "../dtos/refreshTokenDto";
import SequelizeRefreshToken from "../models/refreshToken";

class RefreshTokenRepository {
  async getByUserId(userId: number): Promise<SequelizeRefreshToken | null> {
    return SequelizeRefreshToken.findOne({ where: { userId } });
  }

  async create(data: refreshTokenDto): Promise<SequelizeRefreshToken> {
    return SequelizeRefreshToken.create(data);
  }

  async delete(token: SequelizeRefreshToken): Promise<void> {
    return token.destroy();
  }
}

export default RefreshTokenRepository;
