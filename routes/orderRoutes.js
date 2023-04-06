import express from 'express'
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid
} from '../controllers/orderControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(protect,addOrderItems)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/Deliver').put(protect, updateOrderToDelivered)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect, getOrderById)


export default router