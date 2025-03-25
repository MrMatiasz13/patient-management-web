import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../database/database.config";

class SequelizeUser extends Model<InferAttributes<SequelizeUser>, InferCreationAttributes<SequelizeUser>> {
    declare id?: number;
    declare username: string;
    declare email: string;
    declare password: string;
}

SequelizeUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,
        timestamps: false,
        tableName: 'users'
    }
);

export default SequelizeUser;