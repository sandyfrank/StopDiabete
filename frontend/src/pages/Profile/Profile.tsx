import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  dateOfBirth?: string
  gender?: string
  phone?: string
  diabetesType?: string
  diagnosisDate?: string
  hasFamilyHistory: boolean
  createdAt: string
}

const DIABETES_LABELS: Record<string, string> = {
  none:        'Pas de diabète',
  prediabetes: 'Pré-diabète',
  type1:       'Diabète de type 1',
  type2:       'Diabète de type 2',
  gestational: 'Diabète gestationnel',
}

const GENDER_LABELS: Record<string, string> = {
  male:   'Homme',
  female: 'Femme',
  other:  'Autre',
}

const Profile = () => {
  const { token } = useAuth()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    diabetesType: '',
    diagnosisDate: '',
    hasFamilyHistory: false,
  })

  useEffect(() => {
    if (token) fetchProfile()
  }, [token])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const u = res.data.user
      setProfile(u)
      setForm({
        firstName:        u.firstName || '',
        lastName:         u.lastName || '',
        dateOfBirth:      u.dateOfBirth ? u.dateOfBirth.slice(0, 10) : '',
        gender:           u.gender || '',
        phone:            u.phone || '',
        diabetesType:     u.diabetesType || '',
        diagnosisDate:    u.diagnosisDate ? u.diagnosisDate.slice(0, 10) : '',
        hasFamilyHistory: u.hasFamilyHistory || false,
      })
    } catch {
      setError('Erreur lors du chargement du profil')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      const res = await axios.put(`${API_URL}/auth/profile`, form, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      })
      setProfile(res.data.user)
      setEditMode(false)
      setSuccess('Profil mis à jour avec succès ✓')
      setTimeout(() => setSuccess(''), 4000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const getInitials = () => {
    if (!profile) return '?'
    return `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase()
  }

  const formatDate = (d?: string) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  }

  const getMemberDuration = () => {
    if (!profile?.createdAt) return ''
    const months = Math.floor((Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))
    if (months < 1) return "Membre depuis moins d'un mois"
    if (months < 12) return `Membre depuis ${months} mois`
    return `Membre depuis ${Math.floor(months / 12)} an${Math.floor(months / 12) > 1 ? 's' : ''}`
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="h-48 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600 mt-2">Gérez vos informations personnelles et médicales</p>
      </div>

      {/* Notifications */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-green-600 text-lg">✓</span>
          <p className="text-green-800 text-sm font-medium">{success}</p>
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Avatar + résumé */}
      <Card className="mb-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {getInitials()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{profile?.email}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {profile?.diabetesType && (
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                  🩺 {DIABETES_LABELS[profile.diabetesType] || profile.diabetesType}
                </span>
              )}
              {profile?.gender && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  {GENDER_LABELS[profile.gender] || profile.gender}
                </span>
              )}
              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                📅 {getMemberDuration()}
              </span>
            </div>
          </div>
          <Button
            variant={editMode ? 'secondary' : 'primary'}
            onClick={() => { setEditMode(!editMode); setError('') }}
          >
            {editMode ? 'Annuler' : '✏️ Modifier'}
          </Button>
        </div>
      </Card>

      {editMode ? (
        /* ===== FORMULAIRE D'ÉDITION ===== */
        <form onSubmit={handleSave} className="space-y-6">

          {/* Informations personnelles */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">👤</span>
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <Input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="Prénom" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <Input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Nom" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                <Input type="date" value={form.dateOfBirth} onChange={e => setForm({ ...form, dateOfBirth: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                <select
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="">— Sélectionner —</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <Input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+237 6XX XXX XXX" />
              </div>
            </div>
          </Card>

          {/* Informations médicales */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">🩺</span>
              Informations médicales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de diabète</label>
                <select
                  value={form.diabetesType}
                  onChange={e => setForm({ ...form, diabetesType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="">— Sélectionner —</option>
                  <option value="none">Pas de diabète</option>
                  <option value="prediabetes">Pré-diabète</option>
                  <option value="type1">Diabète de type 1</option>
                  <option value="type2">Diabète de type 2</option>
                  <option value="gestational">Diabète gestationnel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de diagnostic</label>
                <Input type="date" value={form.diagnosisDate} onChange={e => setForm({ ...form, diagnosisDate: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.hasFamilyHistory}
                    onChange={e => setForm({ ...form, hasFamilyHistory: e.target.checked })}
                    className="w-5 h-5 rounded text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Antécédents familiaux de diabète</p>
                    <p className="text-xs text-gray-500">Un parent proche (père, mère, frère, sœur) a du diabète</p>
                  </div>
                </label>
              </div>
            </div>
          </Card>

          {/* Boutons */}
          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1" disabled={saving}>
              {saving ? 'Enregistrement...' : '💾 Enregistrer les modifications'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setEditMode(false)} disabled={saving}>
              Annuler
            </Button>
          </div>
        </form>

      ) : (
        /* ===== MODE LECTURE ===== */
        <div className="space-y-6">

          {/* Informations personnelles */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">👤</span>
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Prénom',            value: profile?.firstName },
                { label: 'Nom',               value: profile?.lastName },
                { label: 'Email',             value: profile?.email },
                { label: 'Téléphone',         value: profile?.phone || '—' },
                { label: 'Date de naissance', value: formatDate(profile?.dateOfBirth) },
                { label: 'Genre',             value: profile?.gender ? GENDER_LABELS[profile.gender] || profile.gender : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-900">{value || '—'}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Informations médicales */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">🩺</span>
              Informations médicales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Type de diabète</p>
                <p className="text-sm font-semibold text-gray-900">
                  {profile?.diabetesType ? DIABETES_LABELS[profile.diabetesType] || profile.diabetesType : '—'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Date de diagnostic</p>
                <p className="text-sm font-semibold text-gray-900">{formatDate(profile?.diagnosisDate)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
                <p className="text-xs font-medium text-gray-500 mb-1">Antécédents familiaux</p>
                <p className={`text-sm font-semibold ${profile?.hasFamilyHistory ? 'text-yellow-700' : 'text-green-700'}`}>
                  {profile?.hasFamilyHistory ? "⚠️ Oui — antécédents familiaux de diabète" : "✓ Non — pas d'antécédents familiaux"}
                </p>
              </div>
            </div>
          </Card>

          {/* Compte */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">🔒</span>
              Mon compte
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Membre depuis</p>
                <p className="text-sm font-semibold text-gray-900">{formatDate(profile?.createdAt)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Email (non modifiable)</p>
                <p className="text-sm font-semibold text-gray-900">{profile?.email}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Profile
