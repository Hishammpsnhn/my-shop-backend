import express from 'express'
import {
    addOrderItems,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid
} from '../controllers/orderControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect,addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/Deliver').put(protect, updateOrderToDelivered)


export default router