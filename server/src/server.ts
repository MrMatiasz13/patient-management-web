import app from "./app";
import dotenv from "dotenv";
import db from "./database/database.config";

dotenv.config();

const port = process.env.PORT || 5000;

db.sync()
    .then(() => console.log('Database connected.'))
    .catch((err) => console.error('Failed to sync db: ', err));

app.listen(port, () => {
    console.log('Server is running on: ', port);
});