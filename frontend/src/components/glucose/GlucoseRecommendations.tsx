import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface Alert {
  type: 'critical' | 'warning' | 'reminder'
  icon: string
  title: string
  message: string
  action: string
}

interface Recommendation {
  type: 'success' | 'info' | 'warning'
  icon: string
  title: string
  message: string
  action: string
}

interface Props {
  token: string
  refreshTrigger?: number
}

const alertStyles: Record<string, string> = {
  critical: 'bg-danger-50 border-danger-300 text-danger-800',
  warning:  'bg-warning-50 border-warning-300 text-warning-800',
  reminder: 'bg-blue-50 border-blue-300 text-blue-800',
}

const recStyles: Record<string, string> = {
  success: 'bg-success-50 border-success-200 text-success-800',
  info:    'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-warning-50 border-warning-200 text-warning-800',
}

const GlucoseRecommendations = ({ token, refreshTrigger }: Props) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchRecommendations()
  }, [refreshTrigger])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/glucose/recommendations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.success) {
        setAlerts(response.data.data.alerts)
        setRecommendations(response.data.data.recommendations)
        setDismissed(new Set()) // reset dismissed on refresh
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err)
    } finally {
      setLoading(false)
    }
  }

  const dismiss = (index: number) => {
    setDismissed(prev => new Set([...prev, index]))
  }

  const visibleAlerts = alerts.filter((_, i) => !dismissed.has(i))
  const visibleRecs = recommendations.filter((_, i) => !dismissed.has(1000 + i))

  if (loading) {
    return (
      <div className="mb-6 space-y-3">
        {[1, 2].map(i => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-200 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (visibleAlerts.length === 0 && visibleRecs.length === 0) return null

  return (
    <div className="mb-8 space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">🤖 Coaching personnalisé</h2>

      {/* Alertes critiques */}
      {visibleAlerts.map((alert, i) => (
        <div
          key={i}
          className={`rounded-2xl border p-4 flex gap-3 ${alertStyles[alert.type]}`}
        >
          <span className="text-2xl flex-shrink-0">{alert.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{alert.title}</p>
            <p className="text-sm mt-0.5 opacity-90">{alert.message}</p>
            <p className="text-xs mt-2 font-medium opacity-80">
              💡 {alert.action}
            </p>
          </div>
          <button
            onClick={() => dismiss(i)}
            className="flex-shrink-0 opacity-50 hover:opacity-100 text-lg leading-none"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
      ))}

      {/* Recommandations personnalisées */}
      {visibleRecs.map((rec, i) => (
        <div
          key={i}
          className={`rounded-2xl border p-4 flex gap-3 ${recStyles[rec.type]}`}
        >
          <span className="text-2xl flex-shrink-0">{rec.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{rec.title}</p>
            <p className="text-sm mt-0.5 opacity-90">{rec.message}</p>
            <p className="text-xs mt-2 font-medium opacity-80">
              → {rec.action}
            </p>
          </div>
          <button
            onClick={() => dismiss(1000 + i)}
            className="flex-shrink-0 opacity-50 hover:opacity-100 text-lg leading-none"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default GlucoseRecommendations
