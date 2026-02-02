# 🏛️ Architecture du Projet StopDiabete

## Vue d'ensemble

StopDiabete est construit selon une architecture moderne en 3 couches :

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                   │
│  Interface utilisateur responsive et accessible      │
└───────────────────┬─────────────────────────────────┘
                    │ HTTP/REST API
┌───────────────────▼─────────────────────────────────┐
│               Backend (Node.js/Express)              │
│  Logique métier, authentification, validation       │
└───────────────────┬─────────────────────────────────┘
                    │ SQL
┌───────────────────▼─────────────────────────────────┐
│            Base de données (PostgreSQL)              │
│  Stockage sécurisé des données utilisateurs         │
└─────────────────────────────────────────────────────┘
```

## 🎨 Frontend (React + TypeScript)

### Composants Principaux

#### Pages
- **Home** : Landing page avec présentation et CTA
- **Dashboard** : Vue d'ensemble personnalisée
- **GlucoseTracker** : Saisie et suivi de glycémie
- **RiskAssessment** : Questionnaire d'évaluation
- **Education** : Ressources éducatives
- **Profile** : Gestion du profil utilisateur

#### Architecture des Composants

```
components/
├── common/              # Composants réutilisables
│   ├── Button
│   ├── Input
│   ├── Card
│   └── Modal
├── layout/              # Structure de page
│   ├── Header
│   ├── Footer
│   └── Sidebar
└── features/            # Composants métier
    ├── GlucoseChart
    ├── RiskScoreDisplay
    └── ArticleCard
```

### Gestion d'État
- **Zustand** pour l'état global
- **React Hook Form** pour les formulaires
- **React Query** (futur) pour le cache API

### Routing
- React Router v6
- Routes protégées avec authentification
- Lazy loading des pages

## ⚙️ Backend (Node.js + Express)

### Architecture en Couches

```
┌─────────────────────────────────────────┐
│          Routes (API Endpoints)         │
├─────────────────────────────────────────┤
│         Middlewares (Auth, Valid.)      │
├─────────────────────────────────────────┤
│         Controllers (Handlers)          │
├─────────────────────────────────────────┤
│         Services (Business Logic)       │
├─────────────────────────────────────────┤
│         Models (Data Access)            │
└─────────────────────────────────────────┘
```

### Middlewares
- **Authentication** : Vérification JWT
- **Validation** : Express-validator
- **Error Handling** : Gestion centralisée des erreurs
- **Rate Limiting** : Protection contre les abus
- **Logging** : Winston pour les logs

### Services
- **AuthService** : Authentification et tokens
- **UserService** : Gestion des utilisateurs
- **GlucoseService** : Logique de suivi glycémie
- **RiskService** : Calcul des scores de risque
- **NotificationService** : Gestion des rappels

## 🗄️ Base de Données (PostgreSQL)

### Modèle de Données

#### Relations Principales
```
users (1) ──< (N) glucose_readings
users (1) ──< (N) risk_assessments
users (1) ──< (N) reminders
users (1) ──── (1) user_preferences
```

### Principes de Conception
- **Normalisation** : 3NF pour éviter la redondance
- **UUID** : Identifiants uniques universels
- **Timestamps** : Audit trail complet
- **Soft Delete** : Conservation de l'historique
- **Indexes** : Optimisation des requêtes fréquentes

## 🔒 Sécurité

### Authentification
- JWT (JSON Web Tokens)
- Refresh tokens pour session longue
- Hashage bcrypt pour les mots de passe (cost factor: 12)

### Autorisation
- Middleware de vérification des permissions
- Séparation stricte des données utilisateur
- Validation côté serveur obligatoire

### Protection des Données
- HTTPS obligatoire en production
- Chiffrement des données sensibles
- CORS configuré strictement
- Headers de sécurité (Helmet.js)
- Rate limiting par IP et par utilisateur

## 📊 Flux de Données

### Exemple : Ajout d'une Mesure de Glycémie

```
1. User saisit glycémie → Frontend valide format
2. Frontend → POST /api/glucose/readings
3. Backend → Vérifie JWT token
4. Backend → Valide données (express-validator)
5. Backend → Insère en DB via service
6. Backend → Retourne confirmation + ID
7. Frontend → Met à jour UI + cache
8. Frontend → Déclenche rafraîchissement graphique
```

## 🚀 Déploiement

### Environnements

#### Development
- Frontend : Vite dev server (port 3000)
- Backend : Nodemon (port 5000)
- Database : PostgreSQL local

#### Production (Prévu)
- Frontend : Vercel ou Netlify
- Backend : VPS Linux ou Heroku
- Database : PostgreSQL managé (Supabase, Neon.tech)

### CI/CD
- GitHub Actions pour les tests
- Déploiement automatique sur merge
- Tests E2E avant déploiement

## 📈 Évolutions Futures

### Phase 1 (MVP) - Q1 2026
✅ Authentification basique
✅ Suivi de glycémie
✅ Évaluation de risque
✅ Contenu éducatif statique

### Phase 2 - Q2 2026
- Notifications push
- Export de données (PDF, CSV)
- Intégration appareils connectés
- Mode hors-ligne (PWA)

### Phase 3 - Q3-Q4 2026
- Espace professionnel de santé
- Analyse IA des tendances
- Communauté et forums
- API publique

## 🎯 Principes de Développement

### Code Quality
- TypeScript strict mode
- ESLint + Prettier
- Tests unitaires (>80% coverage)
- Code review obligatoire

### Performance
- Lazy loading des composants
- Optimisation des images
- Cache API intelligent
- Pagination des listes

### Accessibilité
- WCAG 2.1 niveau AA
- Navigation clavier complète
- Screen reader compatible
- Contraste des couleurs

### UX
- Mobile-first design
- Interface simple et claire
- Feedback utilisateur immédiat
- Messages d'erreur explicites

---

**Dernière mise à jour :** 2 février 2026
