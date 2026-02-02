import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import pool from '../config/database'
import { ApiError } from '../middleware/errorHandler'
import { AuthRequest } from '../middleware/auth'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

interface RegisterBody {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  hasFamilyHistory?: boolean
}

interface LoginBody {
  email: string
  password: string
}

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth, hasFamilyHistory } = req.body

    // Validation
    if (!email || !password || !firstName || !lastName) {
      throw new ApiError(400, 'Tous les champs obligatoires doivent être remplis')
    }

    if (password.length < 8) {
      throw new ApiError(400, 'Le mot de passe doit contenir au moins 8 caractères')
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    )

    if (existingUser.rows.length > 0) {
      throw new ApiError(409, 'Cet email est déjà utilisé')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create user
    const userId = uuidv4()
    const result = await pool.query(
      `INSERT INTO users (
        id, email, password_hash, first_name, last_name, 
        date_of_birth, has_family_history
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id, email, first_name, last_name, date_of_birth, has_family_history, created_at`,
      [
        userId,
        email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        dateOfBirth || null,
        hasFamilyHistory || false
      ]
    )

    const user = result.rows[0]

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        dateOfBirth: user.date_of_birth,
        hasFamilyHistory: user.has_family_history,
        createdAt: user.created_at
      }
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      throw new ApiError(400, 'Email et mot de passe requis')
    }

    // Find user
    const result = await pool.query(
      `SELECT id, email, password_hash, first_name, last_name, 
              date_of_birth, has_family_history, created_at 
       FROM users WHERE email = $1`,
      [email.toLowerCase()]
    )

    if (result.rows.length === 0) {
      throw new ApiError(401, 'Email ou mot de passe incorrect')
    }

    const user = result.rows[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      throw new ApiError(401, 'Email ou mot de passe incorrect')
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        dateOfBirth: user.date_of_birth,
        hasFamilyHistory: user.has_family_history,
        createdAt: user.created_at
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Non authentifié')
    }

    const result = await pool.query(
      `SELECT id, email, first_name, last_name, date_of_birth, 
              has_family_history, diabetes_type, created_at 
       FROM users WHERE id = $1`,
      [req.user.id]
    )

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Utilisateur non trouvé')
    }

    const user = result.rows[0]

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        dateOfBirth: user.date_of_birth,
        hasFamilyHistory: user.has_family_history,
        diabetesType: user.diabetes_type,
        createdAt: user.created_at
      }
    })
  } catch (error) {
    next(error)
  }
}

export const logout = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // In a JWT-based auth, logout is handled client-side by removing the token
    // But we can log it for audit purposes
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    })
  } catch (error) {
    next(error)
  }
}
