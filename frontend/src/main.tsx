import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { waitForApi } from './utils/apiHealthCheck'

// Show loading state while waiting for API
const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

// Render loading state initially
root.render(
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9fafb',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '4px solid #e5e7eb',
      borderTopColor: '#3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{
      marginTop: '16px',
      fontSize: '16px',
      color: '#6b7280'
    }}>
      ⏳ Connexion à l'API en cours...
    </p>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

// Wait for API to be ready, then render the app
waitForApi((attempt, maxRetries) => {
  console.log(`Tentative ${attempt}/${maxRetries} de connexion à l'API...`)
}).then(isReady => {
  if (isReady) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } else {
    root.render(
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#fef2f2',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#fee2e2',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '32px' }}>⚠️</span>
        </div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#991b1b',
          marginBottom: '8px'
        }}>
          Impossible de se connecter à l'API
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#7f1d1d',
          marginBottom: '24px',
          maxWidth: '500px'
        }}>
          Le serveur backend ne répond pas. Veuillez vérifier que le backend est démarré.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
        >
          Réessayer
        </button>
        <p style={{
          marginTop: '24px',
          fontSize: '14px',
          color: '#991b1b',
          fontFamily: 'monospace',
          backgroundColor: '#fee2e2',
          padding: '12px',
          borderRadius: '6px',
          maxWidth: '500px'
        }}>
          💡 Lancez le backend : <code>cd backend && npm run dev</code>
        </p>
      </div>
    )
  }
})

