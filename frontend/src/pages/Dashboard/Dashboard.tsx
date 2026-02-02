import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { Link } from 'react-router-dom'
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
}

const Dashboard = () => {
  const { user } = useAuth()
  const [readings, setReadings] = useState<GlucoseReading[]>([])
  const [stats, setStats] = useState<Stats>({
    avgGlucose: 0,
    lastReading: 0,
    totalReadings: 0,
    trend: 'stable'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Remplacer par un vrai appel API
    // Données de démonstration
    const demoReadings: GlucoseReading[] = [
      { id: '1', value: 95, measured_at: '2026-01-27T08:00:00Z', measurement_type: 'fasting' },
      { id: '2', value: 120, measured_at: '2026-01-28T12:00:00Z', measurement_type: 'after_meal' },
      { id: '3', value: 88, measured_at: '2026-01-29T08:00:00Z', measurement_type: 'fasting' },
      { id: '4', value: 115, measured_at: '2026-01-30T12:00:00Z', measurement_type: 'after_meal' },
      { id: '5', value: 92, measured_at: '2026-01-31T08:00:00Z', measurement_type: 'fasting' },
      { id: '6', value: 110, measured_at: '2026-02-01T12:00:00Z', measurement_type: 'after_meal' },
      { id: '7', value: 90, measured_at: '2026-02-02T08:00:00Z', measurement_type: 'fasting' },
    ]

    setReadings(demoReadings)
    
    // Calculer les statistiques
    const avg = demoReadings.reduce((sum, r) => sum + r.value, 0) / demoReadings.length
    const last = demoReadings[demoReadings.length - 1]?.value || 0
    const secondLast = demoReadings[demoReadings.length - 2]?.value || 0
    const trend = last > secondLast + 5 ? 'up' : last < secondLast - 5 ? 'down' : 'stable'

    setStats({
      avgGlucose: Math.round(avg),
      lastReading: last,
      totalReadings: demoReadings.length,
      trend
    })
    setIsLoading(false)
  }, [])

  const chartData = {
    labels: readings.map(r => {
      const date = new Date(r.measured_at)
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    }),
    datasets: [
      {
        label: 'Glycémie (mg/dL)',
        data: readings.map(r => r.value),
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(14, 165, 233)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 140,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: string | number) {
            return `${value} mg/dL`
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glassmorphism">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Dernière mesure</p>
              <p className="text-3xl font-bold text-gray-900">{stats.lastReading}</p>
              <p className="text-sm text-gray-500 mt-1">mg/dL</p>
            </div>
            <div className={`px-3 py-1 rounded-full ${lastReadingStatus.bg}`}>
              <span className={`text-sm font-medium ${lastReadingStatus.color}`}>
                {lastReadingStatus.text}
              </span>
            </div>
          </div>
        </Card>

        <Card className="glassmorphism">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Moyenne 7 jours</p>
              <p className="text-3xl font-bold text-gray-900">{stats.avgGlucose}</p>
              <p className="text-sm text-gray-500 mt-1">mg/dL</p>
            </div>
            <div className="text-4xl">{getTrendIcon()}</div>
          </div>
        </Card>

        <Card className="glassmorphism">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tendance</p>
              <p className={`text-2xl font-bold ${getTrendColor()}`}>
                {stats.trend === 'up' ? 'En hausse' : stats.trend === 'down' ? 'En baisse' : 'Stable'}
              </p>
              <p className="text-sm text-gray-500 mt-1">derniers jours</p>
            </div>
          </div>
        </Card>

        <Card className="glassmorphism">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Mesures totales</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalReadings}</p>
              <p className="text-sm text-gray-500 mt-1">enregistrements</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </Card>
      </div>

      {/* Graphique */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Évolution de la glycémie</h2>
            <p className="text-sm text-gray-600 mt-1">Derniers 7 jours</p>
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
