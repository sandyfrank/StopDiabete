import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError } from './errorHandler'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const authMiddleware = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Token manquant')
    }

    const token = authHeader.substring(7)
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

    try {
      const decoded = jwt.verify(token, secret) as { id: string; email: string }
      req.user = decoded
      next()
    } catch (jwtError) {
      throw new ApiError(401, 'Token invalide ou expiré')
    }
  } catch (error) {
    next(error)
  }
}
