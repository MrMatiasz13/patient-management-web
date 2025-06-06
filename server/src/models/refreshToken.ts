import db from "../database/database.config";
import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "refresh_tokens", timestamps: true })
class SequelizeRefreshToken extends Model {
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
