import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "patients", timestamps: false })
class SequelizePatient extends Model {
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
