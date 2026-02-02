/**
 * Utility to wait for API to be ready before app initialization
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const MAX_RETRIES = 30
const RETRY_DELAY_MS = 1000

interface HealthResponse {
  status: string
  message: string
  database?: {
    connected: boolean
  }
}

/**
 * Check if API is reachable and database is connected
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health/full`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return false
    }

    const data: HealthResponse = await response.json()
    return data.status === 'ok' && data.database?.connected === true
  } catch (error) {
    return false
  }
}

/**
 * Wait for API to be ready with retries
 * Returns true if API is ready, false if max retries exceeded
 */
export const waitForApi = async (
  onRetry?: (attempt: number, maxRetries: number) => void
): Promise<boolean> => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const isHealthy = await checkApiHealth()
    
    if (isHealthy) {
      console.log(`✅ API is ready (attempt ${attempt}/${MAX_RETRIES})`)
      return true
    }

    if (onRetry) {
      onRetry(attempt, MAX_RETRIES)
    }

    console.log(`⏳ Waiting for API... (attempt ${attempt}/${MAX_RETRIES})`)
    
    // Wait before next retry (except on last attempt)
    if (attempt < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
    }
  }

  console.error(`❌ API not ready after ${MAX_RETRIES} attempts`)
  return false
}
