import Product from "../models/productModal.js";
import expressAsyncHandler from "express-async-handler";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = expressAsyncHandler(async (req, res) => {
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
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = expressAsyncHandler(async (req, res) => {
  // const {name, description,price,user,image,brand,category,countInStock,numReviews} = req.body
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: "64267c2f45ca07623fda474e",
    image: '/uploads/image-1681148418197.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc   delete product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = expressAsyncHandler(async (req, res) => {

  const result = await Product.findByIdAndDelete(req.params.id)

  if (result) {
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    get top 3 products
// @route   get /api/products/top
// @access  Private/Admin
export const topProducts = expressAsyncHandler(async (req, res) => {
  const topProduct = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(topProduct)
})