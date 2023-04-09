import express from "express";
import { getProducts, createProduct, getProductById, createProductReview, deleteProduct, updateProduct } from "../controllers/productControllers.js";
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(createProduct)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router