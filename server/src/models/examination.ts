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

@Table({ tableName: "examination", timestamps: false })
class SequelizeExamination extends Model {
  @PrimaryKey
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

export default SequelizeExamination;
