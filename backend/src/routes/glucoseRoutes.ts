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

// GET /api/glucose/stats - Statistiques avancées (TIR, HbA1c estimé, observance)
// ⚠️ DOIT être AVANT /:id pour éviter la capture par Express
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest
    const userId = authReq.user?.id
    const days = parseInt(req.query.days as string) || 30

    const result = await pool.query(
      `SELECT value, measurement_type, measured_at
       FROM glucose_readings
       WHERE user_id = $1
         AND measured_at >= NOW() - INTERVAL '1 day' * $2
       ORDER BY measured_at DESC`,
      [userId, days]
    )

    const readings = result.rows
    if (readings.length === 0) {
      return res.json({
        success: true,
        data: {
          totalReadings: 0,
          average: null,
          timeInRange: null,
          timeBelowRange: null,
          timeAboveRange: null,
          estimatedHbA1c: null,
          adherenceScore: null,
          trend: 'insufficient_data',
          lastReading: null,
          daysCovered: 0,
          period: days,
        }
      })
    }

    const values = readings.map((r: any) => Number(r.value))
    const average = values.reduce((a: number, b: number) => a + b, 0) / values.length

    const inRange = values.filter((v: number) => v >= 70 && v <= 180).length
    const belowRange = values.filter((v: number) => v < 70).length
    const aboveRange = values.filter((v: number) => v > 180).length
    const timeInRange = Math.round((inRange / values.length) * 100)
    const timeBelowRange = Math.round((belowRange / values.length) * 100)
    const timeAboveRange = Math.round((aboveRange / values.length) * 100)

    // Formule ADAG : eA1C = (average + 46.7) / 28.7
    const estimatedHbA1c = Math.round(((average + 46.7) / 28.7) * 10) / 10

    const uniqueDays = new Set(
      readings.map((r: any) => new Date(r.measured_at).toDateString())
    ).size
    const adherenceScore = Math.min(Math.round((uniqueDays / days) * 100), 100)

    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    const recent7 = readings.filter((r: any) => new Date(r.measured_at) >= sevenDaysAgo)
    const prev7 = readings.filter((r: any) => {
      const d = new Date(r.measured_at)
      return d >= fourteenDaysAgo && d < sevenDaysAgo
    })

    let trend = 'stable'
    if (recent7.length > 0 && prev7.length > 0) {
      const avg7 = recent7.reduce((s: number, r: any) => s + Number(r.value), 0) / recent7.length
      const avgPrev7 = prev7.reduce((s: number, r: any) => s + Number(r.value), 0) / prev7.length
      const diff = avg7 - avgPrev7
      if (diff > 10) trend = 'rising'
      else if (diff > 5) trend = 'slightly_rising'
      else if (diff < -10) trend = 'falling'
      else if (diff < -5) trend = 'slightly_falling'
      else trend = 'stable'
    } else if (recent7.length > 0) {
      trend = 'insufficient_data'
    }

    return res.json({
      success: true,
      data: {
        totalReadings: readings.length,
        average: Math.round(average),
        timeInRange,
        timeBelowRange,
        timeAboveRange,
        estimatedHbA1c,
        adherenceScore,
        trend,
        lastReading: readings[0],
        daysCovered: uniqueDays,
        period: days,
      }
    })
  } catch (error) {
    console.error('Error computing glucose stats:', error)
    return res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// GET /api/glucose/recommendations - Recommandations personnalisées
// ⚠️ DOIT être AVANT /:id
router.get('/recommendations', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest
    const userId = authReq.user?.id

    const last24h = await pool.query(
      `SELECT value, measurement_type, measured_at
       FROM glucose_readings
       WHERE user_id = $1 AND measured_at >= NOW() - INTERVAL '24 hours'
       ORDER BY measured_at DESC`,
      [userId]
    )

    const last30days = await pool.query(
      `SELECT value, measurement_type, measured_at
       FROM glucose_readings
       WHERE user_id = $1 AND measured_at >= NOW() - INTERVAL '30 days'
       ORDER BY measured_at DESC`,
      [userId]
    )

    const alerts: any[] = []
    const recommendations: any[] = []
    const recent = last24h.rows
    const allReadings = last30days.rows

    const latestReading = recent[0]
    if (latestReading) {
      const v = Number(latestReading.value)
      if (v < 70) {
        alerts.push({ type: 'critical', icon: '🚨', title: 'Hypoglycémie détectée',
          message: `Votre dernière mesure est de ${v} mg/dL. Consommez immédiatement 15g de sucre rapide.`,
          action: 'Resucrez-vous et remesurer dans 15 min' })
      } else if (v > 250) {
        alerts.push({ type: 'critical', icon: '⚠️', title: 'Hyperglycémie sévère',
          message: `Votre dernière mesure est de ${v} mg/dL. Consultez un médecin si ça persiste.`,
          action: 'Hydratez-vous et évitez tout sucre' })
      } else if (v > 180) {
        alerts.push({ type: 'warning', icon: '📈', title: 'Glycémie élevée',
          message: `${v} mg/dL — Au-dessus de la cible (180 mg/dL).`,
          action: 'Marcher 15-20 min peut aider à faire baisser la glycémie' })
      }
    }

    if (recent.length === 0) {
      alerts.push({ type: 'reminder', icon: '🔔', title: 'Rappel de mesure',
        message: 'Aucune mesure enregistrée depuis 24h.',
        action: 'Prenez votre glycémie maintenant' })
    }

    if (allReadings.length >= 5) {
      const values = allReadings.map((r: any) => Number(r.value))
      const avg = values.reduce((a: number, b: number) => a + b, 0) / values.length
      const inRange = values.filter((v: number) => v >= 70 && v <= 180).length
      const tir = Math.round((inRange / values.length) * 100)

      if (tir >= 70) {
        recommendations.push({ type: 'success', icon: '🏆', title: 'Excellent contrôle glycémique !',
          message: `${tir}% du temps dans la cible (70-180 mg/dL). Continuez ainsi !`,
          action: 'Maintenez vos bonnes habitudes' })
      } else if (tir >= 50) {
        recommendations.push({ type: 'info', icon: '💪', title: 'Bon contrôle, améliorable',
          message: `${tir}% du temps dans la cible. L'objectif est 70%+.`,
          action: 'Réduisez les sucres raffinés et marchez après les repas' })
      } else {
        recommendations.push({ type: 'warning', icon: '🎯', title: 'Contrôle glycémique à améliorer',
          message: `Seulement ${tir}% du temps dans la cible (70-180 mg/dL).`,
          action: 'Consultez votre médecin pour ajuster votre traitement' })
      }

      if (avg > 180) {
        recommendations.push({ type: 'warning', icon: '🥗', title: 'Alimentation à surveiller',
          message: `Votre moyenne de ${Math.round(avg)} mg/dL suggère une alimentation riche en glucides.`,
          action: 'Privilégiez les légumes, protéines et grains entiers' })
      }

      const afterMeal = allReadings.filter((r: any) => r.measurement_type === 'after_meal')
      if (afterMeal.length >= 3) {
        const avgAfter = afterMeal.reduce((s: number, r: any) => s + Number(r.value), 0) / afterMeal.length
        if (avgAfter > 160) {
          recommendations.push({ type: 'info', icon: '🚶', title: 'Marche post-repas recommandée',
            message: `Votre glycémie post-repas moyenne est de ${Math.round(avgAfter)} mg/dL.`,
            action: '15-20 min de marche après chaque repas peut réduire de 20-30 mg/dL' })
        }
      }

      const uniqueDays = new Set(allReadings.map((r: any) => new Date(r.measured_at).toDateString())).size
      if (uniqueDays < 15) {
        recommendations.push({ type: 'info', icon: '📅', title: 'Mesurez plus régulièrement',
          message: `Seulement ${uniqueDays} jours de mesures sur 30. Une mesure/jour minimum est recommandée.`,
          action: 'Fixez une alarme quotidienne pour ne pas oublier' })
      }
    } else {
      recommendations.push({ type: 'info', icon: '📊', title: 'Continuez à enregistrer vos mesures',
        message: 'Enregistrez au moins 5 mesures pour obtenir des recommandations personnalisées.',
        action: 'Prenez votre glycémie chaque matin à jeun' })
    }

    return res.json({ success: true, data: { alerts, recommendations } })
  } catch (error) {
    console.error('Error computing recommendations:', error)
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
