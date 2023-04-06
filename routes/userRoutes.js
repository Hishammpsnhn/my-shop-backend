import express from "express";
import { registerUser, authUser, getUserProfile, updateUserProfile } from "../controllers/userControllers.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile')
    // .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router