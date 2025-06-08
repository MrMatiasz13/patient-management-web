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

interface PatientAttributes {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  imagePath?: string;
  phoneNumber?: string;
}

export type PatientCreationAttributes = Optional<PatientAttributes, "id">;

@Table({ tableName: "patients", timestamps: false })
class SequelizePatient
  extends Model<PatientAttributes, PatientCreationAttributes>
  implements PatientAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  name!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  surname!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  birthDate!: string;

  @Column(DataType.TEXT)
  imagePath?: string;

  @Column(DataType.TEXT)
  phoneNumber?: string;
}

export default SequelizePatient;
