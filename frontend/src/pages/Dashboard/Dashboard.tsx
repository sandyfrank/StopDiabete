import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const API_URL = 'http://localhost:5000/api'

interface GlucoseReading {
  id: string
  value: number
  measured_at: string
  measurement_type: string
}

interface Stats {
  avgGlucose: number
  lastReading: number
  totalReadings: number
  trend: 'up' | 'down' | 'stable'
  timeInRange: number | null
  estimatedHbA1c: number | null
}

const Dashboard = () => {
  const { user, token } = useAuth()
  const [readings, setReadings] = useState<GlucoseReading[]>([])
  const [stats, setStats] = useState<Stats>({
    avgGlucose: 0,
    lastReading: 0,
    totalReadings: 0,
    trend: 'stable',
    timeInRange: null,
    estimatedHbA1c: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    fetchDashboardData()
  }, [token])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)

      // Appel parallèle : liste des mesures (7 derniers jours) + stats avancées
      const [readingsRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/glucose`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/glucose/stats?days=7`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ])

      // Mesures pour le graphique : les 7 dernières seulement
      const allReadings: GlucoseReading[] = readingsRes.data.data || []
      const last7 = allReadings.slice(0, 14).reverse() // max 14 points, ordre chronologique
      setReadings(last7)

      // Stats depuis l'endpoint dédié
      const s = statsRes.data.data
      const lastVal = allReadings[0]?.value ?? 0
      const secondVal = allReadings[1]?.value ?? 0
      const trend: 'up' | 'down' | 'stable' =
        Number(lastVal) > Number(secondVal) + 5 ? 'up' :
        Number(lastVal) < Number(secondVal) - 5 ? 'down' : 'stable'

      setStats({
        avgGlucose: s.average ?? 0,
        lastReading: Number(lastVal),
        totalReadings: allReadings.length,
        trend,
        timeInRange: s.timeInRange,
        estimatedHbA1c: s.estimatedHbA1c,
      })
    } catch (err) {
      console.error('Erreur chargement dashboard:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const chartData = {
    labels: readings.map(r => {
      const date = new Date(r.measured_at)
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    }),
    datasets: [
      {
        label: 'Glycémie (mg/dL)',
        data: readings.map(r => Number(r.value)),
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: readings.map(r => {
          const v = Number(r.value)
          if (v < 70) return 'rgb(239, 68, 68)'
          if (v > 180) return 'rgb(245, 158, 11)'
          return 'rgb(14, 165, 233)'
        }),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          label: (ctx: any) => {
            const v = ctx.raw
            const status = v < 70 ? '🔴 Bas' : v > 180 ? '🟡 Élevé' : '🟢 Normal'
            return ` ${v} mg/dL — ${status}`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: readings.length > 0 ? Math.max(40, Math.min(...readings.map(r => Number(r.value))) - 20) : 60,
        max: readings.length > 0 ? Math.min(400, Math.max(...readings.map(r => Number(r.value))) + 30) : 200,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          callback: function(value: string | number) { return `${value} mg/dL` },
        },
      },
      x: { grid: { display: false } },
    },
  } as any

  const getTrendIcon = () => {
    switch (stats.trend) {
      case 'up':
        return '📈'
      case 'down':
        return '📉'
      default:
        return '➡️'
    }
  }

  const getTrendColor = () => {
    switch (stats.trend) {
      case 'up':
        return 'text-warning-600'
      case 'down':
        return 'text-success-600'
      default:
        return 'text-gray-600'
    }
  }

  const getGlucoseStatus = (value: number) => {
    if (value < 70) return { text: 'Trop bas', color: 'text-danger-600', bg: 'bg-danger-50' }
    if (value < 100) return { text: 'Normal', color: 'text-success-600', bg: 'bg-success-50' }
    if (value < 126) return { text: 'Pré-diabète', color: 'text-warning-600', bg: 'bg-warning-50' }
    return { text: 'Élevé', color: 'text-danger-600', bg: 'bg-danger-50' }
  }

  const lastReadingStatus = getGlucoseStatus(stats.lastReading)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bonjour {user?.firstName} 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Voici un aperçu de votre suivi santé
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="glassmorphism col-span-1">
          <p className="text-xs text-gray-600 mb-1">Dernière mesure</p>
          <p className="text-2xl font-bold text-gray-900">{stats.lastReading || '—'}</p>
          <p className="text-xs text-gray-500">mg/dL</p>
          {stats.lastReading > 0 && (
            <span className={`text-xs font-medium mt-1 inline-block ${lastReadingStatus.color}`}>
              {lastReadingStatus.text}
            </span>
          )}
        </Card>

        <Card className="glassmorphism col-span-1">
          <p className="text-xs text-gray-600 mb-1">Moyenne 7j</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgGlucose || '—'}</p>
          <p className="text-xs text-gray-500">mg/dL</p>
          <span className={`text-xs font-medium mt-1 inline-block ${getTrendColor()}`}>
            {getTrendIcon()} {stats.trend === 'up' ? 'Hausse' : stats.trend === 'down' ? 'Baisse' : 'Stable'}
          </span>
        </Card>

        <Card className="glassmorphism col-span-1">
          <p className="text-xs text-gray-600 mb-1">Temps dans cible</p>
          <p className={`text-2xl font-bold ${
            stats.timeInRange === null ? 'text-gray-400' :
            stats.timeInRange >= 70 ? 'text-success-600' :
            stats.timeInRange >= 50 ? 'text-warning-600' : 'text-danger-600'
          }`}>
            {stats.timeInRange !== null ? `${stats.timeInRange}%` : '—'}
          </p>
          <p className="text-xs text-gray-500">70–180 mg/dL</p>
          <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${
              (stats.timeInRange ?? 0) >= 70 ? 'bg-success-500' :
              (stats.timeInRange ?? 0) >= 50 ? 'bg-warning-500' : 'bg-danger-500'
            }`} style={{ width: `${stats.timeInRange ?? 0}%` }} />
          </div>
        </Card>

        <Card className="glassmorphism col-span-1">
          <p className="text-xs text-gray-600 mb-1">HbA1c estimé</p>
          <p className={`text-2xl font-bold ${
            stats.estimatedHbA1c === null ? 'text-gray-400' :
            stats.estimatedHbA1c < 5.7 ? 'text-success-600' :
            stats.estimatedHbA1c < 6.5 ? 'text-warning-600' : 'text-danger-600'
          }`}>
            {stats.estimatedHbA1c !== null ? `${stats.estimatedHbA1c}%` : '—'}
          </p>
          <p className="text-xs text-gray-500">
            {stats.estimatedHbA1c === null ? 'Pas de données' :
             stats.estimatedHbA1c < 5.7 ? 'Normal' :
             stats.estimatedHbA1c < 6.5 ? 'Pré-diabète' : 'Diabète'}
          </p>
        </Card>

        <Card className="glassmorphism col-span-1">
          <p className="text-xs text-gray-600 mb-1">Total mesures</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalReadings}</p>
          <p className="text-xs text-gray-500">enregistrements</p>
          <span className="text-lg mt-1 block">📊</span>
        </Card>

        <Card className="glassmorphism col-span-1 flex flex-col justify-between">
          <p className="text-xs text-gray-600 mb-2">Nouvelle mesure</p>
          <Link to="/glucose">
            <Button variant="primary" size="sm" className="w-full text-xs">
              + Ajouter
            </Button>
          </Link>
        </Card>
      </div>

      {/* Graphique */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Évolution de la glycémie</h2>
            <p className="text-sm text-gray-600 mt-1">
              {readings.length > 0 ? `${readings.length} dernières mesures` : 'Aucune mesure'}
            </p>
          </div>
          <Link to="/glucose">
            <Button variant="primary" size="sm">
              Ajouter une mesure
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : readings.length > 0 ? (
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune mesure enregistrée
            </h3>
            <p className="text-gray-600 mb-4">
              Commencez à suivre votre glycémie pour voir l'évolution
            </p>
            <Link to="/glucose">
              <Button variant="primary">Ajouter ma première mesure</Button>
            </Link>
          </div>
        )}
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/glucose" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🩸</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ma Glycémie
              </h3>
              <p className="text-sm text-gray-600">
                Suivez et enregistrez vos mesures de glycémie
              </p>
            </div>
          </Card>
        </Link>

        <Link to="/risk-assessment" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-warning-500 to-warning-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Test de Risque
              </h3>
              <p className="text-sm text-gray-600">
                Évaluez votre risque de développer le diabète
              </p>
            </div>
          </Card>
        </Link>

        <Link to="/education" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Éducation
              </h3>
              <p className="text-sm text-gray-600">
                Apprenez à mieux comprendre le diabète
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
