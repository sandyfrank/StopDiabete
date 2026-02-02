import { useState } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

interface FormData {
  age: string
  weight: string
  height: string
  waistCircumference: string
  familyHistory: boolean
  physicalActivity: 'high' | 'moderate' | 'low'
  dietQuality: 'good' | 'moderate' | 'poor'
  smoking: boolean
  hypertension: boolean
  gestationalDiabetes: boolean
}

interface RiskResult {
  score: number
  level: 'low' | 'moderate' | 'high'
  recommendations: string[]
}

const RiskAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    age: '',
    weight: '',
    height: '',
    waistCircumference: '',
    familyHistory: false,
    physicalActivity: 'moderate',
    dietQuality: 'moderate',
    smoking: false,
    hypertension: false,
    gestationalDiabetes: false,
  })
  const [result, setResult] = useState<RiskResult | null>(null)

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight)
    const height = parseFloat(formData.height) / 100 // convertir en mètres
    if (weight && height) {
      return weight / (height * height)
    }
    return 0
  }

  const calculateRisk = () => {
    let score = 0

    // Âge (OMS/ADA)
    const age = parseInt(formData.age)
    if (age >= 45) score += 1
    if (age >= 55) score += 1

    // IMC (OMS)
    const bmi = calculateBMI()
    if (bmi >= 25 && bmi < 30) score += 1
    if (bmi >= 30) score += 2

    // Tour de taille (critères OMS)
    const waist = parseFloat(formData.waistCircumference)
    if (waist >= 80) score += 1 // Femme
    if (waist >= 94) score += 1 // Homme (simplifié)

    // Historique familial (ADA)
    if (formData.familyHistory) score += 2

    // Activité physique (OMS)
    if (formData.physicalActivity === 'low') score += 2
    if (formData.physicalActivity === 'moderate') score += 1

    // Alimentation
    if (formData.dietQuality === 'poor') score += 2
    if (formData.dietQuality === 'moderate') score += 1

    // Tabagisme (facteur de risque reconnu)
    if (formData.smoking) score += 1

    // Hypertension (ADA)
    if (formData.hypertension) score += 1

    // Diabète gestationnel (ADA)
    if (formData.gestationalDiabetes) score += 2

    // Déterminer le niveau de risque
    let level: 'low' | 'moderate' | 'high'
    if (score <= 2) level = 'low'
    else if (score <= 5) level = 'moderate'
    else level = 'high'

    // Générer des recommandations personnalisées
    const recommendations: string[] = []

    if (bmi >= 25) {
      recommendations.push('Maintenir un poids santé avec une alimentation équilibrée')
    }
    if (formData.physicalActivity === 'low') {
      recommendations.push('Pratiquer au moins 30 minutes d\'activité physique par jour')
    }
    if (formData.dietQuality !== 'good') {
      recommendations.push('Adopter une alimentation riche en fibres, fruits et légumes')
    }
    if (formData.smoking) {
      recommendations.push('Arrêter de fumer pour réduire considérablement le risque')
    }
    if (formData.hypertension) {
      recommendations.push('Surveiller régulièrement votre tension artérielle')
    }
    if (level === 'moderate' || level === 'high') {
      recommendations.push('Consulter un médecin pour un dépistage de la glycémie')
    }
    if (formData.familyHistory) {
      recommendations.push('Dépistage régulier recommandé en raison des antécédents familiaux')
    }

    setResult({ score, level, recommendations })
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateRisk()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetTest = () => {
    setCurrentStep(0)
    setResult(null)
    setFormData({
      age: '',
      weight: '',
      height: '',
      waistCircumference: '',
      familyHistory: false,
      physicalActivity: 'moderate',
      dietQuality: 'moderate',
      smoking: false,
      hypertension: false,
      gestationalDiabetes: false,
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.age && formData.weight && formData.height
      case 1:
        return formData.waistCircumference
      case 2:
      case 3:
        return true
      default:
        return false
    }
  }

  if (result) {
    const levelConfig = {
      low: {
        color: 'success',
        icon: '🟢',
        title: 'Risque Faible',
        description: 'Votre risque de développer le diabète de type 2 est faible. Continuez vos bonnes habitudes !',
        bgClass: 'bg-success-50 border-success-200',
        textClass: 'text-success-700',
      },
      moderate: {
        color: 'warning',
        icon: '🟠',
        title: 'Risque Modéré',
        description: 'Vous présentez certains facteurs de risque. Des changements de mode de vie peuvent réduire significativement ce risque.',
        bgClass: 'bg-warning-50 border-warning-200',
        textClass: 'text-warning-700',
      },
      high: {
        color: 'danger',
        icon: '🔴',
        title: 'Risque Élevé',
        description: 'Vous présentez plusieurs facteurs de risque importants. Une consultation médicale est fortement recommandée.',
        bgClass: 'bg-danger-50 border-danger-200',
        textClass: 'text-danger-700',
      },
    }

    const config = levelConfig[result.level]
    const bmi = calculateBMI()
    const currentDate = new Date().toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    })

    return (
      <>
        <style>{`
          @media print {
            body {
              background: white !important;
            }
            
            .no-print {
              display: none !important;
            }
            
            .print-only {
              display: block !important;
            }
            
            .print-report {
              margin: 0 !important;
              padding: 20mm !important;
              max-width: 100% !important;
              background: white !important;
              box-shadow: none !important;
            }
            
            .print-card {
              border: none !important;
              box-shadow: none !important;
              page-break-inside: avoid;
            }
            
            .print-header {
              border-bottom: 3px solid #0ea5e9;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            
            .print-logo {
              font-size: 24px;
              font-weight: bold;
              color: #0ea5e9;
            }
            
            .print-title {
              font-size: 28px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 10px;
            }
            
            .print-section {
              margin-top: 20px;
              page-break-inside: avoid;
            }
            
            .print-section-title {
              font-size: 18px;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 12px;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 6px;
            }
            
            .print-risk-badge {
              display: inline-block;
              padding: 8px 16px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
            }
            
            .print-risk-low {
              background: #dcfce7;
              color: #166534;
              border: 2px solid #22c55e;
            }
            
            .print-risk-moderate {
              background: #fef3c7;
              color: #92400e;
              border: 2px solid #f59e0b;
            }
            
            .print-risk-high {
              background: #fee2e2;
              color: #991b1b;
              border: 2px solid #ef4444;
            }
            
            .print-info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              margin: 15px 0;
            }
            
            .print-info-item {
              padding: 8px;
              background: #f9fafb;
              border-left: 3px solid #0ea5e9;
            }
            
            .print-info-label {
              font-size: 12px;
              color: #6b7280;
              font-weight: 500;
            }
            
            .print-info-value {
              font-size: 16px;
              color: #1f2937;
              font-weight: 600;
            }
            
            .print-recommendations {
              list-style: none;
              padding: 0;
            }
            
            .print-recommendations li {
              padding: 8px 0 8px 30px;
              position: relative;
              color: #374151;
              line-height: 1.6;
            }
            
            .print-recommendations li:before {
              content: "✓";
              position: absolute;
              left: 5px;
              color: #0ea5e9;
              font-weight: bold;
              font-size: 16px;
            }
            
            .print-footer {
              margin-top: 30px;
              padding-top: 15px;
              border-top: 2px solid #e5e7eb;
              font-size: 11px;
              color: #6b7280;
            }
            
            .print-disclaimer {
              background: #f3f4f6;
              border-left: 4px solid #fbbf24;
              padding: 12px;
              margin: 15px 0;
            }
            
            .print-disclaimer-title {
              font-weight: 600;
              color: #92400e;
              margin-bottom: 5px;
            }
            
            .print-disclaimer-text {
              font-size: 12px;
              color: #4b5563;
              line-height: 1.5;
            }
          }
          
          .print-only {
            display: none;
          }
        `}</style>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print-report">
          {/* En-tête pour l'impression */}
          <div className="print-only print-header">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="print-logo">🩺 StopDiabète</div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
                  Prévention et gestion du diabète
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Date du rapport</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{currentDate}</p>
              </div>
            </div>
            <h1 className="print-title">Rapport d'Évaluation du Risque de Diabète</h1>
          </div>

          <Card className="mb-8 print-card">
            <div className="text-center mb-8 no-print">
              <div className="text-7xl mb-4">{config.icon}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {config.title}
              </h2>
              <p className="text-lg text-gray-600">
                Score de risque : {result.score} points
              </p>
            </div>

            {/* Version imprimable du résultat */}
            <div className="print-only print-section">
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span className={`print-risk-badge print-risk-${result.level}`}>
                  Niveau de risque : {config.title}
                </span>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '10px' }}>
                  Score total : {result.score} points
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border-2 ${config.bgClass} mb-8 no-print`}>
              <p className={`text-center font-medium ${config.textClass}`}>
                {config.description}
              </p>
            </div>

            {/* Informations du patient */}
            <div className="print-section">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 print-section-title">
                📋 Informations de l'évaluation
              </h3>
              <div className="print-info-grid">
                <div className="print-info-item">
                  <div className="print-info-label">Âge</div>
                  <div className="print-info-value">{formData.age} ans</div>
                </div>
                <div className="print-info-item">
                  <div className="print-info-label">IMC (Indice de Masse Corporelle)</div>
                  <div className="print-info-value">
                    {bmi.toFixed(1)} kg/m²
                    {bmi < 18.5 && ' (Insuffisance pondérale)'}
                    {bmi >= 18.5 && bmi < 25 && ' (Normal)'}
                    {bmi >= 25 && bmi < 30 && ' (Surpoids)'}
                    {bmi >= 30 && ' (Obésité)'}
                  </div>
                </div>
                <div className="print-info-item">
                  <div className="print-info-label">Tour de taille</div>
                  <div className="print-info-value">{formData.waistCircumference} cm</div>
                </div>
                <div className="print-info-item">
                  <div className="print-info-label">Activité physique</div>
                  <div className="print-info-value">
                    {formData.physicalActivity === 'high' && 'Élevée'}
                    {formData.physicalActivity === 'moderate' && 'Modérée'}
                    {formData.physicalActivity === 'low' && 'Faible'}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '15px' }}>
                <div className="print-info-label" style={{ marginBottom: '8px' }}>Facteurs de risque identifiés :</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.familyHistory && (
                    <span style={{ 
                      background: '#fef3c7', 
                      color: '#92400e', 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      Antécédents familiaux
                    </span>
                  )}
                  {formData.hypertension && (
                    <span style={{ 
                      background: '#fef3c7', 
                      color: '#92400e', 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      Hypertension
                    </span>
                  )}
                  {formData.smoking && (
                    <span style={{ 
                      background: '#fef3c7', 
                      color: '#92400e', 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      Tabagisme
                    </span>
                  )}
                  {formData.gestationalDiabetes && (
                    <span style={{ 
                      background: '#fef3c7', 
                      color: '#92400e', 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      Diabète gestationnel
                    </span>
                  )}
                  {formData.dietQuality === 'poor' && (
                    <span style={{ 
                      background: '#fef3c7', 
                      color: '#92400e', 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      Alimentation déséquilibrée
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8 print-section">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 print-section-title">
                � Recommandations personnalisées
              </h3>
              <ul className="space-y-3 no-print">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
              <ul className="print-only print-recommendations">
                {result.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 mb-8 print-disclaimer">
              <h4 className="font-semibold text-gray-900 mb-2 print-disclaimer-title">
                ⚠️ Important - Clause de non-responsabilité médicale
              </h4>
              <p className="text-sm text-gray-700 print-disclaimer-text">
                Ce rapport d'évaluation est un outil de prévention basé sur des critères médicaux reconnus 
                par l'Organisation Mondiale de la Santé (OMS) et l'American Diabetes Association (ADA). 
                Il ne constitue pas un diagnostic médical et ne remplace en aucun cas une consultation 
                avec un professionnel de santé qualifié. En cas de risque modéré ou élevé, il est 
                fortement recommandé de consulter votre médecin traitant pour réaliser des examens 
                complémentaires (glycémie à jeun, HbA1c, etc.).
              </p>
            </div>

            {/* Footer pour l'impression */}
            <div className="print-only print-footer">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>StopDiabète</p>
                  <p>Application de prévention et gestion du diabète</p>
                  <p style={{ marginTop: '5px' }}>🌐 www.stopdiabete.com</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>Méthodologie</p>
                  <p>Algorithme basé sur les recommandations :</p>
                  <p>• Organisation Mondiale de la Santé (OMS)</p>
                  <p>• American Diabetes Association (ADA)</p>
                </div>
              </div>
              <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                <p>Ce document a été généré automatiquement le {currentDate}</p>
                <p style={{ marginTop: '5px' }}>Conservez ce rapport et présentez-le à votre médecin lors de votre prochaine consultation</p>
              </div>
            </div>

            <div className="flex gap-4 no-print">
              <Button variant="primary" onClick={resetTest} className="flex-1">
                Refaire le test
              </Button>
              <Button variant="secondary" onClick={() => window.print()} className="flex-1">
                📄 Imprimer le rapport
              </Button>
            </div>
          </Card>
        </div>
      </>
    )
  }

  const steps = [
    {
      title: 'Informations générales',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Âge (années) <span className="text-danger-600">*</span>
            </label>
            <Input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Ex: 35"
              min="18"
              max="120"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poids (kg) <span className="text-danger-600">*</span>
              </label>
              <Input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Ex: 70"
                min="30"
                max="300"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille (cm) <span className="text-danger-600">*</span>
              </label>
              <Input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="Ex: 170"
                min="100"
                max="250"
              />
            </div>
          </div>

          {formData.weight && formData.height && (
            <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-900">
                Votre IMC : <span className="text-primary-600">{calculateBMI().toFixed(1)}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {calculateBMI() < 18.5 && 'Insuffisance pondérale'}
                {calculateBMI() >= 18.5 && calculateBMI() < 25 && 'Poids normal'}
                {calculateBMI() >= 25 && calculateBMI() < 30 && 'Surpoids'}
                {calculateBMI() >= 30 && 'Obésité'}
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Mesures corporelles',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tour de taille (cm) <span className="text-danger-600">*</span>
            </label>
            <Input
              type="number"
              value={formData.waistCircumference}
              onChange={(e) => setFormData({ ...formData, waistCircumference: e.target.value })}
              placeholder="Ex: 85"
              min="40"
              max="200"
            />
            <p className="text-xs text-gray-500 mt-2">
              Mesurez au niveau du nombril, en position debout
            </p>
          </div>

          <div className="bg-warning-50 border-2 border-warning-200 rounded-xl p-4">
            <p className="text-sm font-medium text-warning-900 mb-2">
              💡 Pourquoi cette mesure ?
            </p>
            <p className="text-xs text-warning-800">
              Le tour de taille est un indicateur important du risque métabolique. 
              Un tour de taille élevé peut indiquer une graisse abdominale excessive, 
              facteur de risque pour le diabète de type 2.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Antécédents et santé',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
              <input
                type="checkbox"
                checked={formData.familyHistory}
                onChange={(e) => setFormData({ ...formData, familyHistory: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">
                  Antécédents familiaux de diabète
                </span>
                <p className="text-xs text-gray-600">
                  Parent, frère, sœur avec diabète de type 2
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
              <input
                type="checkbox"
                checked={formData.hypertension}
                onChange={(e) => setFormData({ ...formData, hypertension: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">
                  Hypertension artérielle
                </span>
                <p className="text-xs text-gray-600">
                  Tension élevée diagnostiquée ou sous traitement
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
              <input
                type="checkbox"
                checked={formData.gestationalDiabetes}
                onChange={(e) => setFormData({ ...formData, gestationalDiabetes: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">
                  Diabète gestationnel (femmes)
                </span>
                <p className="text-xs text-gray-600">
                  Diabète durant une grossesse
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
              <input
                type="checkbox"
                checked={formData.smoking}
                onChange={(e) => setFormData({ ...formData, smoking: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">
                  Tabagisme actif
                </span>
                <p className="text-xs text-gray-600">
                  Fumeur régulier
                </p>
              </div>
            </label>
          </div>
        </div>
      ),
    },
    {
      title: 'Mode de vie',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Niveau d'activité physique
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
                <input
                  type="radio"
                  name="activity"
                  checked={formData.physicalActivity === 'high'}
                  onChange={() => setFormData({ ...formData, physicalActivity: 'high' })}
                  className="w-5 h-5 text-primary-600"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Élevé</span>
                  <p className="text-xs text-gray-600">≥ 30 min/jour d'activité modérée</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
                <input
                  type="radio"
                  name="activity"
                  checked={formData.physicalActivity === 'moderate'}
                  onChange={() => setFormData({ ...formData, physicalActivity: 'moderate' })}
                  className="w-5 h-5 text-primary-600"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Modéré</span>
                  <p className="text-xs text-gray-600">10-30 min/jour d'activité</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
                <input
                  type="radio"
                  name="activity"
                  checked={formData.physicalActivity === 'low'}
                  onChange={() => setFormData({ ...formData, physicalActivity: 'low' })}
                  className="w-5 h-5 text-primary-600"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Faible</span>
                  <p className="text-xs text-gray-600">&lt; 10 min/jour d'activité</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Qualité de l'alimentation
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
                <input
                  type="radio"
                  name="diet"
                  checked={formData.dietQuality === 'good'}
                  onChange={() => setFormData({ ...formData, dietQuality: 'good' })}
                  className="w-5 h-5 text-primary-600"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Bonne</span>
                  <p className="text-xs text-gray-600">Riche en fibres, fruits, légumes</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
                <input
                  type="radio"
                  name="diet"
                  checked={formData.dietQuality === 'moderate'}
                  onChange={() => setFormData({ ...formData, dietQuality: 'moderate' })}
                  className="w-5 h-5 text-primary-600"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Moyenne</span>
                  <p className="text-xs text-gray-600">Équilibre variable</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors">
                <input
                  type="radio"
                  name="diet"
                  checked={formData.dietQuality === 'poor'}
                  onChange={() => setFormData({ ...formData, dietQuality: 'poor' })}
                  className="w-5 h-5 text-primary-600"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Pauvre</span>
                  <p className="text-xs text-gray-600">Riche en sucres et graisses</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Test de Risque de Diabète</h1>
        <p className="text-gray-600 mt-2">
          Évaluez votre risque de développer le diabète de type 2
        </p>
      </div>

      <Card className="mb-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Étape {currentStep + 1} sur {steps.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {steps[currentStep].title}
        </h2>

        {steps[currentStep].content}

        <div className="flex gap-4 mt-8">
          {currentStep > 0 && (
            <Button variant="secondary" onClick={handleBack} className="flex-1">
              Précédent
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1"
          >
            {currentStep === steps.length - 1 ? 'Voir les résultats' : 'Suivant'}
          </Button>
        </div>
      </Card>

      <div className="bg-gray-50 rounded-2xl p-6 text-center text-sm text-gray-600">
        <p>
          🔒 Vos données restent privées et ne sont pas stockées sur nos serveurs.
          Ce test est basé sur les recommandations de l'OMS et de l'ADA.
        </p>
      </div>
    </div>
  )
}

export default RiskAssessment
