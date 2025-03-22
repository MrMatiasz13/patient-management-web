import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
});