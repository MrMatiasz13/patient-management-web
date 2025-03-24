import app from "./app";
import dotenv from "dotenv";
import db from "./database/database.config";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await db.sync();
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

