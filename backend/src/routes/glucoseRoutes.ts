import { Router, Request, Response } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import pool from '../config/database'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// Toutes les routes glucose nécessitent l'authentification
router.use(authMiddleware)

// GET /api/glucose - Récupérer toutes les mesures de glycémie de l'utilisateur
router.get('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest
    const userId = authReq.user?.id

    const result = await pool.query(
      `SELECT id, user_id, value, measurement_type, measured_at, notes, created_at
       FROM glucose_readings 
       WHERE user_id = $1 
       ORDER BY measured_at DESC`,
      [userId]
    )

    return res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Error fetching glucose readings:', error)
    return res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// POST /api/glucose - Créer une nouvelle mesure de glycémie
router.post('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest
    const userId = authReq.user?.id
    const { value, measurement_type, measured_at, notes } = req.body

    // Validation
    if (!value || !measurement_type || !measured_at) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valeur, type de mesure et date/heure sont requis' 
      })
    }

    if (value < 20 || value > 600) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valeur de glycémie invalide (doit être entre 20 et 600 mg/dL)' 
      })
    }

    const validTypes = ['fasting', 'after_meal', 'before_meal', 'before_sleep', 'random']
    if (!validTypes.includes(measurement_type)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Type de mesure invalide' 
      })
    }

    const id = uuidv4()
    const result = await pool.query(
      `INSERT INTO glucose_readings (id, user_id, value, measurement_type, measured_at, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, user_id, value, measurement_type, measured_at, notes, created_at`,
      [id, userId, value, measurement_type, measured_at, notes || null]
    )

    return res.status(201).json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Error creating glucose reading:', error)
    return res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// GET /api/glucose/:id - Récupérer une mesure spécifique
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest
    const userId = authReq.user?.id
    const { id } = req.params

    const result = await pool.query(
      `SELECT id, user_id, value, measurement_type, measured_at, notes, created_at
       FROM glucose_readings 
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Mesure non trouvée' })
    }

    return res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Error fetching glucose reading:', error)
    return res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// PUT /api/glucose/:id - Modifier une mesure
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest
    const userId = authReq.user?.id
    const { id } = req.params
    const { value, measurement_type, measured_at, notes } = req.body

    // Vérifier que la mesure appartient à l'utilisateur
    const checkResult = await pool.query(
      'SELECT id FROM glucose_readings WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Mesure non trouvée' })
    }

    // Validation
    if (value && (value < 20 || value > 600)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valeur de glycémie invalide' 
      })
    }

    const result = await pool.query(
      `UPDATE glucose_readings 
       SET value = COALESCE($1, value),
           measurement_type = COALESCE($2, measurement_type),
           measured_at = COALESCE($3, measured_at),
           notes = COALESCE($4, notes)
       WHERE id = $5 AND user_id = $6
       RETURNING id, user_id, value, measurement_type, measured_at, notes, created_at`,
      [value, measurement_type, measured_at, notes, id, userId]
    )

    return res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Error updating glucose reading:', error)
    return res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// DELETE /api/glucose/:id - Supprimer une mesure
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest
    const userId = authReq.user?.id
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM glucose_readings WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Mesure non trouvée' })
    }

    return res.json({ success: true, message: 'Mesure supprimée avec succès' })
  } catch (error) {
    console.error('Error deleting glucose reading:', error)
    return res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

export default router
