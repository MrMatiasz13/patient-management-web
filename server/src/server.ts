import app from "./app";
import dotenv from "dotenv";
import db from "./database/database.config";
import { PORT } from "./constants/configConstants";

dotenv.config();

const port = PORT;

const startServer = async () => {
    try {
        await db.sync({force: false});
        console.log('Database connected.');

        app.listen(port, () => {
            console.log('Server is running on: ', port);
        });
    } catch (err) {
        console.error('Failed to sync db: ', err);
        process.exit(1);
    }
};

startServer();

