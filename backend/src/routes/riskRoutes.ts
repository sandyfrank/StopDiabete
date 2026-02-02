import { Router } from 'express'

const router = Router()

// Route publique pour l'évaluation du risque
router.post('/assess', (_req, res) => {
  // TODO: Implémenter l'algorithme d'arbre de décision
  res.json({ success: true, message: 'À implémenter' })
})

export default router
