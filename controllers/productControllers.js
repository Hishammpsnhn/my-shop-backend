import asyncHandler from "express-async-handler";
import Product from "../models/productModal.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Product.countDocuments({ ...keyword })
    console.log(count)
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const {name, description,price,user,image,brand,category,countInStock,numReviews} = req.body
    const product = new Product({
      name,
      price,
      user,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description,
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })
  