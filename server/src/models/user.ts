import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  surename: string;
  email: string;
  password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, "id">;

@Table({ tableName: "users", timestamps: false })
class SequelizeUser
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  surename!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;
}

export default SequelizeUser;
