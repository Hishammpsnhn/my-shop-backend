import express from "express";
import { getProducts,createProduct } from "../controllers/productControllers.js";


const router = express.Router();

router.route('/').get(getProducts).post(createProduct)

export default router