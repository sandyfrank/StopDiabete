import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import axios from 'axios'

interface GlucoseEntry {
  id: string
  value: number
  measured_at: string
  measurement_type: 'fasting' | 'after_meal' | 'before_meal' | 'before_sleep' | 'random'
  notes?: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const GlucoseTracker = () => {
  const { token } = useAuth()
  const [entries, setEntries] = useState<GlucoseEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    value: '',
    measurement_type: 'fasting',
    measured_at: new Date().toISOString().slice(0, 16),
    notes: '',
  })

  const [showForm, setShowForm] = useState(false)

  // Charger les mesures au montage du composant
  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(`${API_URL}/glucose`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        setEntries(response.data.data)
      }
    } catch (err: any) {
      console.error('Error fetching glucose entries:', err)
      setError('Erreur lors du chargement des mesures')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      setError('')

      const response = await axios.post(
        `${API_URL}/glucose`,
        {
          value: parseFloat(formData.value),
          measurement_type: formData.measurement_type,
          measured_at: formData.measured_at + ':00Z',
          notes: formData.notes || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.success) {
        // Ajouter la nouvelle entrée en haut de la liste
        setEntries([response.data.data, ...entries])
        
        // Réinitialiser le formulaire
        setFormData({
          value: '',
          measurement_type: 'fasting',
          measured_at: new Date().toISOString().slice(0, 16),
          notes: '',
        })
        setShowForm(false)
      }
    } catch (err: any) {
      console.error('Error creating glucose entry:', err)
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setSubmitting(false)
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      fasting: 'À jeun',
      after_meal: 'Après repas',
      before_meal: 'Avant repas',
      before_sleep: 'Avant coucher',
      random: 'Aléatoire',
    }
    return labels[type] || type
  }

  const getStatusColor = (value: number, type: string) => {
    if (type === 'fasting') {
      if (value < 70) return 'bg-danger-100 text-danger-700 border-danger-200'
      if (value <= 100) return 'bg-success-100 text-success-700 border-success-200'
      if (value <= 125) return 'bg-warning-100 text-warning-700 border-warning-200'
      return 'bg-danger-100 text-danger-700 border-danger-200'
    } else if (type === 'after_meal') {
      if (value < 140) return 'bg-success-100 text-success-700 border-success-200'
      if (value <= 199) return 'bg-warning-100 text-warning-700 border-warning-200'
      return 'bg-danger-100 text-danger-700 border-danger-200'
    }
    if (value < 70) return 'bg-danger-100 text-danger-700 border-danger-200'
    if (value <= 140) return 'bg-success-100 text-success-700 border-success-200'
    return 'bg-warning-100 text-warning-700 border-warning-200'
  }

  const getStatusText = (value: number, type: string) => {
    if (type === 'fasting') {
      if (value < 70) return 'Hypoglycémie'
      if (value <= 100) return 'Normal'
      if (value <= 125) return 'Pré-diabète'
      return 'Élevé'
    } else if (type === 'after_meal') {
      if (value < 140) return 'Normal'
      if (value <= 199) return 'Élevé'
      return 'Très élevé'
    }
    if (value < 70) return 'Bas'
    if (value <= 140) return 'Normal'
    return 'Élevé'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ma Glycémie</h1>
          <p className="text-gray-600 mt-2">
            Suivez et enregistrez vos mesures de glycémie
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Annuler' : '+ Nouvelle mesure'}
        </Button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Formulaire d'ajout */}
      {showForm && (
        <Card className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Ajouter une mesure
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Glycémie (mg/dL) <span className="text-danger-600">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Ex: 95"
                  required
                  min="20"
                  max="600"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de mesure <span className="text-danger-600">*</span>
                </label>
                <select
                  value={formData.measurement_type}
                  onChange={(e) => setFormData({ ...formData, measurement_type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                  disabled={submitting}
                >
                  <option value="fasting">À jeun</option>
                  <option value="before_meal">Avant repas</option>
                  <option value="after_meal">Après repas</option>
                  <option value="before_sleep">Avant coucher</option>
                  <option value="random">Aléatoire</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date et heure <span className="text-danger-600">*</span>
              </label>
              <Input
                type="datetime-local"
                value={formData.measured_at}
                onChange={(e) => setFormData({ ...formData, measured_at: e.target.value })}
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optionnel)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ex: Après sport, repas riche, stress..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                disabled={submitting}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="primary" className="flex-1" disabled={submitting}>
                {submitting ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
                className="flex-1"
                disabled={submitting}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Guide de référence */}
      <Card className="mb-8 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 Valeurs de référence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-900 mb-2">À jeun (matinée) :</p>
            <ul className="space-y-1 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-success-500"></span>
                Normal : 70-100 mg/dL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-warning-500"></span>
                Pré-diabète : 100-125 mg/dL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-danger-500"></span>
                Diabète : ≥ 126 mg/dL
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-2">Après repas (2h) :</p>
            <ul className="space-y-1 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-success-500"></span>
                Normal : &lt; 140 mg/dL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-warning-500"></span>
                Pré-diabète : 140-199 mg/dL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-danger-500"></span>
                Diabète : ≥ 200 mg/dL
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Liste des mesures */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Historique des mesures
        </h2>
        
        {loading ? (
          <Card>
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des mesures...</p>
            </div>
          </Card>
        ) : entries.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🩸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune mesure enregistrée
              </h3>
              <p className="text-gray-600 mb-4">
                Commencez à suivre votre glycémie dès maintenant
              </p>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                Ajouter ma première mesure
              </Button>
            </div>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {entry.value}
                    </span>
                    <span className="text-gray-500">mg/dL</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(entry.value, entry.measurement_type)}`}>
                      {getStatusText(entry.value, entry.measurement_type)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🕐</span>
                      {formatDate(entry.measured_at)}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-lg">📋</span>
                      {getTypeLabel(entry.measurement_type)}
                    </span>
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      💭 {entry.notes}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default GlucoseTracker
