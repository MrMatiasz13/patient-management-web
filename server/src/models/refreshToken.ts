import { Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface RefeshTokenAttributes {
  id: number;
  userId: number;
  token: string;
}

export type RefreshTokenCreationAttributes = Optional<
  RefeshTokenAttributes,
  "id"
>;

@Table({ tableName: "refresh_tokens", timestamps: true })
class SequelizeRefreshToken
  extends Model<RefeshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefeshTokenAttributes
{
  @PrimaryKey
  @AutoIncrement
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
