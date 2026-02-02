# 🎨 StopDiabete - Frontend

Application React pour l'interface utilisateur de StopDiabete.

## 📂 Structure

```
frontend/
├── public/              # Fichiers statiques
├── src/
│   ├── assets/         # Images, icônes, etc.
│   ├── components/     # Composants réutilisables
│   │   ├── common/    # Composants génériques (Button, Input, etc.)
│   │   ├── layout/    # Layout (Header, Footer, Sidebar)
│   │   └── features/  # Composants spécifiques aux fonctionnalités
│   ├── pages/          # Pages de l'application
│   │   ├── Home/
│   │   ├── Dashboard/
│   │   ├── GlucoseTracker/
│   │   ├── RiskAssessment/
│   │   ├── Education/
│   │   └── Profile/
│   ├── services/       # Services API
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Context API (état global)
│   ├── utils/          # Fonctions utilitaires
│   ├── styles/         # Styles globaux
│   ├── types/          # Types TypeScript
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## 🚀 Démarrage rapide

_(À compléter)_

## 🎨 Fonctionnalités principales

### 1. **Accueil & Landing Page**
- Présentation de l'application
- Formulaire d'inscription/connexion
- Call-to-action pour le test de risque

### 2. **Dashboard Utilisateur**
- Vue d'ensemble de la glycémie
- Graphiques et tendances
- Rappels et notifications

### 3. **Suivi de Glycémie**
- Saisie facile des mesures
- Historique complet
- Visualisations interactives

### 4. **Évaluation des Risques**
- Questionnaire interactif
- Calcul du score de risque
- Recommandations personnalisées

### 5. **Éducation & Ressources**
- Articles sur le diabète
- Conseils nutritionnels
- Exercices recommandés

### 6. **Profil Utilisateur**
- Informations personnelles
- Paramètres de l'application
- Historique médical
