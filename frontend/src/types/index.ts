// User types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  phone?: string
  diabetesType?: 'type1' | 'type2' | 'gestational' | 'prediabetes' | 'none'
  diagnosisDate?: string
  hasFamilyHistory: boolean
  createdAt: string
}

// Glucose reading types
export interface GlucoseReading {
  id: string
  userId: string
  glucoseValue: number
  measurementTime: string
  measurementContext: 'fasting' | 'before_meal' | 'after_meal' | 'bedtime' | 'random'
  notes?: string
  foodConsumed?: string
  medicationTaken?: string
  physicalActivity?: string
  symptoms?: string
  createdAt: string
}

export interface GlucoseStatistics {
  average: number
  min: number
  max: number
  count: number
  timeInRange: {
    low: number
    normal: number
    high: number
  }
  trend: 'improving' | 'stable' | 'worsening'
}

// Risk assessment types
export interface RiskAssessmentInput {
  age: number
  weight: number
  height: number
  waistCircumference?: number
  hasFamilyHistory: boolean
  hasGestationalDiabetes?: boolean
  physicalActivityLevel: 'low' | 'moderate' | 'high'
  dietQuality: 'poor' | 'average' | 'good'
  smokingStatus: boolean
  hasHypertension?: boolean
  fastingGlucose?: number
  randomGlucose?: number
}

export interface RiskAssessment {
  id: string
  userId: string
  assessmentDate: string
  totalRiskScore: number
  riskLevel: 'low' | 'moderate' | 'high' | 'very_high'
  recommendations: Recommendation[]
  factors: RiskFactor[]
}

export interface RiskFactor {
  factor: string
  value: string | number
  points: number
  description: string
}

export interface Recommendation {
  category: 'diet' | 'exercise' | 'lifestyle' | 'medical'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  actionItems: string[]
}

// Article types
export interface Article {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  featuredImageUrl?: string
  category: 'prevention' | 'nutrition' | 'exercise' | 'medication' | 'lifestyle'
  tags: string[]
  targetAudience: string[]
  readingTimeMinutes: number
  isPublished: boolean
  publishedAt?: string
  viewsCount: number
}

// Reminder types
export interface Reminder {
  id: string
  userId: string
  title: string
  description?: string
  reminderType: 'glucose_check' | 'medication' | 'appointment' | 'exercise' | 'custom'
  reminderTime: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom'
  daysOfWeek?: number[]
  isActive: boolean
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  hasFamilyHistory: boolean
}

export interface AuthResponse {
  user: User
  token: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
