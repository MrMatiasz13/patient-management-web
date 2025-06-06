import { Sequelize } from "sequelize-typescript";
import SequelizeExamination from "../models/examination";
import SequelizePatient from "../models/patient";
import SequelizeUser from "../models/user";
import SequelizeRefreshToken from "../models/refreshToken";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false,
  models: [
    SequelizeExamination,
    SequelizePatient,
    SequelizeUser,
    SequelizeRefreshToken,
  ],
});

export default db;
