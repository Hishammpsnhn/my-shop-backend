import express from "express";
import { getProducts, createProduct, getProductById } from "../controllers/productControllers.js";


const router = express.Router();

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById)

export default router