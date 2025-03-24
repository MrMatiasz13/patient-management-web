import { Sequelize } from "sequelize-typescript";

const db = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false,
});

export default db;
