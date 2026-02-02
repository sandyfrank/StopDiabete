import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import glucoseRoutes from './routes/glucoseRoutes'
import riskRoutes from './routes/riskRoutes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app: Application = express()
const PORT = parseInt(process.env.PORT || '5000')
const HOST = '0.0.0.0' // Écoute sur toutes les interfaces

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://10.162.144.137:3000', // Accès mobile via IP WiFi
    'http://10.162.144.137:3001', // Port alternatif si conflit
    'http://152.77.193.66:3000',  // Accès mobile via IP Ethernet
  ],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/glucose', glucoseRoutes)
app.use('/api/risk', riskRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Error handler (should be last)
app.use(errorHandler)

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 API available at http://localhost:${PORT}/api`)
  console.log(`📱 Mobile access: http://10.162.144.137:${PORT}/api`)
})

export default app
