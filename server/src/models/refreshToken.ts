import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../database/database.config";

class SequelizeRefreshToken extends Model<InferAttributes<SequelizeRefreshToken>, InferCreationAttributes<SequelizeRefreshToken>> {
    declare id?: number;
    declare userId: number;
    declare token: string;
}

SequelizeRefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        timestamps: true,
        tableName: 'refresh_tokens'
    }
);

export default SequelizeRefreshToken;


export const clearRefreshTokens = async () => {
    SequelizeRefreshToken.destroy({
        where: {},
    });
};
