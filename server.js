import express from "express";
import connectDB from "./config/db.js";
import colors from 'colors';
import dotenv from 'dotenv'
import path from 'path';
import morgan from 'morgan';
import cors from "cors";

import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB();

const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());

app.use('/api/users',userRoutes)

app.get('/', (req, res) => {
    res.send('API is running....')
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`.yellow.bold);
});
