import { Optional } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface refeshTokenAttributes {
  id: number;
  userId: number;
  token: string;
}

export type refreshTokenCreationAttributes = Optional<
  refeshTokenAttributes,
  "id"
>;

@Table({ tableName: "refresh_tokens", timestamps: true })
class SequelizeRefreshToken
  extends Model<refeshTokenAttributes, refreshTokenCreationAttributes>
  implements refeshTokenAttributes
{
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  token!: string;
}

export default SequelizeRefreshToken;

export const clearRefreshTokens = async () => {
  SequelizeRefreshToken.destroy({
    where: {},
  });
};
