import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "../database/database.config";

class SequelizePatient extends Model<
  InferAttributes<SequelizePatient>,
  InferCreationAttributes<SequelizePatient>
> {
  declare id?: number;
  declare name: string;
  declare surname: string;
  declare birthDate: string;
  declare imagePath?: string;
  declare phoneNumber?: string;
}

SequelizePatient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    surname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    tableName: "patients",
  }
);

export default SequelizePatient;
