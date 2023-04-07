import express from "express";
import { getProducts, createProduct, getProductById, createProductReview } from "../controllers/productControllers.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById)
router.route('/:id/reviews').post(protect, createProductReview)

export default router