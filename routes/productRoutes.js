import express from "express";
import { getProducts, createProduct, getProductById, createProductReview, deleteProduct, updateProduct, topProducts } from "../controllers/productControllers.js";
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
router.route('/top').get(topProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router