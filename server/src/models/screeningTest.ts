import { Optional } from "sequelize";
import db from "../database/database.config";
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface ScreeningTestAttributes {
  id: number;
  patientId: number;
  date: string;
  formState: Record<string, boolean>;
  conclusion?: string;
}

export type ScreeningTestCreationAttributes = Optional<
  ScreeningTestAttributes,
  "id"
>;

@Table({ tableName: "screeningTest", timestamps: false })
class SequelizeScreeningTest extends Model implements ScreeningTestAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  patientId!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  date!: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  formState!: Record<string, boolean>;

  @Column(DataType.TEXT)
  conclusion?: string;
}

export default SequelizeScreeningTest;
