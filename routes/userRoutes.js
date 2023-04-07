import express from "express";
import { registerUser, authUser, getUserProfile, updateUserProfile, getUsers, deleteUser } from "../controllers/userControllers.js";
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router
    .route('/:id')
    .delete(protect, admin, deleteUser)

export default router