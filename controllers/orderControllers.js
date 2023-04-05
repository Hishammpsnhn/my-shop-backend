import expressAsyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

// @desc    Create new order
// @route   POST /api/orders
// @access  Priv
export const addOrderItems = expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
        return
    } else {
        try {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            })
            const createdOrder = await order.save()
            res.status(201).json(createdOrder)

        } catch (error) {
            console.log(error)
        }
    }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
  
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })