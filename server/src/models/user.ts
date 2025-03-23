import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";

interface User {
    id?: number,
    username: string,
    email: string,
    password: string
}

@Table({
    tableName: "users",
})
class SequelizeUser extends Model implements User {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;
}