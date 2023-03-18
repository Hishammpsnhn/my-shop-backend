import express from "express";
import connectDB from "./config/db.js";
import colors from 'colors';
import dotenv from 'dotenv'

dotenv.config()
connectDB();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`.yellow.bold);
});
