import express from 'express'
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    allOrdersList
} from '../controllers/orderControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(protect,addOrderItems).get(protect,admin,allOrdersList)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/Deliver').put(protect, updateOrderToDelivered)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect, getOrderById)


export default router