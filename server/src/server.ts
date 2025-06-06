import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import db from "./database/database.config";
import { PORT } from "./constants/configConstants";
import SequelizeExamination from "./models/examination";

const startServer = async () => {
  try {
    await db.sync({ force: false, alter: true });
    console.log("Database connected.");

    app.listen(PORT, () => {
      console.log("Server is running on: ", PORT);
    });
  } catch (err) {
    console.error("Failed to sync db: ", err);
    process.exit(1);
  }
};

startServer();
