import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../database/database.config";

class SequelizePatient extends Model<InferAttributes<SequelizePatient>, InferCreationAttributes<SequelizePatient>> {
    declare id?: number;
    declare name: string;
    declare surename: string;
    declare imagePath?: string;
    declare phoneNumber?: string;
}

SequelizePatient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, 
    {
        sequelize: db,
        timestamps: false,
        tableName: 'patients'
    }
);

export default SequelizePatient;