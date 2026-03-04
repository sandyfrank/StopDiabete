import { Router } from 'express'
import { register, login, logout, getProfile, updateProfile } from '../controllers/authController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

// Public routes
router.post('/register', register)
router.post('/login', login)

// Protected routes
router.post('/logout', authMiddleware, logout)
router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)

export default router
