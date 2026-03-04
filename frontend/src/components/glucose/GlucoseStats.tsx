import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface GlucoseStatsData {
  totalReadings: number
  average: number | null
  timeInRange: number | null
  timeBelowRange: number | null
  timeAboveRange: number | null
  estimatedHbA1c: number | null
  adherenceScore: number | null
  trend: string
  lastReading: any
  daysCovered: number
  period: number
}

interface Props {
  token: string
  refreshTrigger?: number
}

const trendIcon: Record<string, { icon: string; color: string; label: string }> = {
  rising:           { icon: '↑↑', color: 'text-danger-600',  label: 'En hausse' },
  slightly_rising:  { icon: '↗',  color: 'text-warning-600', label: 'Légèrement en hausse' },
  stable:           { icon: '→',  color: 'text-success-600', label: 'Stable' },
  slightly_falling: { icon: '↘',  color: 'text-primary-600', label: 'Légèrement en baisse' },
  falling:          { icon: '↓↓', color: 'text-primary-700', label: 'En baisse' },
  insufficient_data:{ icon: '—',  color: 'text-gray-400',    label: 'Données insuffisantes' },
}

const GlucoseStats = ({ token, refreshTrigger }: Props) => {
  const [stats, setStats] = useState<GlucoseStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState(30)

  useEffect(() => {
    fetchStats()
  }, [period, refreshTrigger])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/glucose/stats?days=${period}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.success) setStats(response.data.data)
    } catch (err) {
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const getTIRColor = (tir: number) => {
    if (tir >= 70) return { bar: 'bg-success-500', text: 'text-success-700', bg: 'bg-success-50' }
    if (tir >= 50) return { bar: 'bg-warning-500', text: 'text-warning-700', bg: 'bg-warning-50' }
    return { bar: 'bg-danger-500', text: 'text-danger-700', bg: 'bg-danger-50' }
  }

  const getAdherenceColor = (score: number) => {
    if (score >= 70) return 'text-success-600'
    if (score >= 40) return 'text-warning-600'
    return 'text-danger-600'
  }

  const getHbA1cStatus = (hba1c: number) => {
    if (hba1c < 5.7) return { label: 'Normal', color: 'text-success-600' }
    if (hba1c < 6.5) return { label: 'Pré-diabète', color: 'text-warning-600' }
    return { label: 'Diabète', color: 'text-danger-600' }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-200 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!stats || stats.totalReadings === 0) {
    return (
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6 mb-6 text-center">
        <p className="text-primary-700 text-sm">
          📊 Enregistrez vos premières mesures pour voir vos statistiques personnalisées
        </p>
      </div>
    )
  }

  const tirColors = getTIRColor(stats.timeInRange ?? 0)
  const trend = trendIcon[stats.trend] ?? trendIcon.insufficient_data
  const hba1cStatus = stats.estimatedHbA1c ? getHbA1cStatus(stats.estimatedHbA1c) : null

  return (
    <div className="mb-8">
      {/* Sélecteur de période */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">📊 Tableau de bord</h2>
        <div className="flex gap-2">
          {[7, 14, 30, 90].map(d => (
            <button
              key={d}
              onClick={() => setPeriod(d)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                period === d
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {d}j
            </button>
          ))}
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">

        {/* Time In Range */}
        <div className={`rounded-2xl p-4 border ${tirColors.bg} border-gray-200`}>
          <p className="text-xs font-medium text-gray-500 mb-1">Temps dans la cible</p>
          <p className={`text-3xl font-bold ${tirColors.text}`}>
            {stats.timeInRange}%
          </p>
          <p className="text-xs text-gray-500 mt-1">70–180 mg/dL</p>
          {/* Barre de progression */}
          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${tirColors.bar} transition-all`}
              style={{ width: `${stats.timeInRange}%` }}
            />
          </div>
        </div>

        {/* Moyenne */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 mb-1">Moyenne</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.average}
            <span className="text-sm text-gray-500 font-normal ml-1">mg/dL</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{stats.totalReadings} mesures</p>
          <div className="mt-2 flex items-center gap-1">
            <span className={`text-lg font-bold ${trend.color}`}>{trend.icon}</span>
            <span className={`text-xs ${trend.color}`}>{trend.label}</span>
          </div>
        </div>

        {/* HbA1c estimé */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 mb-1">HbA1c estimé</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.estimatedHbA1c}
            <span className="text-sm text-gray-500 font-normal ml-1">%</span>
          </p>
          {hba1cStatus && (
            <p className={`text-xs font-medium mt-1 ${hba1cStatus.color}`}>
              {hba1cStatus.label}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">Estimation ADAG</p>
        </div>

        {/* Score d'observance */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 mb-1">Observance</p>
          <p className={`text-3xl font-bold ${getAdherenceColor(stats.adherenceScore ?? 0)}`}>
            {stats.adherenceScore}%
          </p>
          <p className="text-xs text-gray-500 mt-1">{stats.daysCovered}/{stats.period} jours</p>
          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                (stats.adherenceScore ?? 0) >= 70 ? 'bg-success-500' :
                (stats.adherenceScore ?? 0) >= 40 ? 'bg-warning-500' : 'bg-danger-500'
              }`}
              style={{ width: `${stats.adherenceScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Barre TIR détaillée */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <p className="text-xs font-medium text-gray-600 mb-3">Répartition des mesures</p>
        <div className="flex rounded-full overflow-hidden h-4 mb-3">
          {(stats.timeBelowRange ?? 0) > 0 && (
            <div
              className="bg-danger-500 flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${stats.timeBelowRange}%` }}
              title={`En dessous : ${stats.timeBelowRange}%`}
            >
              {(stats.timeBelowRange ?? 0) > 8 ? `${stats.timeBelowRange}%` : ''}
            </div>
          )}
          <div
            className="bg-success-500 flex items-center justify-center text-white text-xs font-bold"
            style={{ width: `${stats.timeInRange}%` }}
            title={`Dans la cible : ${stats.timeInRange}%`}
          >
            {(stats.timeInRange ?? 0) > 15 ? `${stats.timeInRange}%` : ''}
          </div>
          {(stats.timeAboveRange ?? 0) > 0 && (
            <div
              className="bg-warning-500 flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${stats.timeAboveRange}%` }}
              title={`Au-dessus : ${stats.timeAboveRange}%`}
            >
              {(stats.timeAboveRange ?? 0) > 8 ? `${stats.timeAboveRange}%` : ''}
            </div>
          )}
        </div>
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-danger-500 inline-block"></span>
            En dessous &lt;70 : {stats.timeBelowRange}%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-success-500 inline-block"></span>
            Cible 70-180 : {stats.timeInRange}%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-warning-500 inline-block"></span>
            Au-dessus &gt;180 : {stats.timeAboveRange}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default GlucoseStats
