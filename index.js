import express from "express";
import connectDB from "./config/db.js";
import colors from 'colors';
import dotenv from 'dotenv'
import path from 'path';
import morgan from 'morgan';
import cors from "cors";

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

const app = express();
app.use(cors());
connectDB();


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
    res.send('API is running....')
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`.yellow.bold);
});
