# ⚙️ StopDiabete - Backend API

API REST Node.js/Express pour StopDiabete.

## 📂 Structure

```
backend/
├── src/
│   ├── config/         # Configuration (database, env, etc.)
│   ├── controllers/    # Contrôleurs des routes
│   ├── models/         # Modèles de données
│   ├── routes/         # Définition des routes
│   ├── middlewares/    # Middlewares (auth, validation, etc.)
│   ├── services/       # Logique métier
│   ├── utils/          # Fonctions utilitaires
│   ├── validators/     # Schémas de validation
│   ├── types/          # Types TypeScript
│   ├── app.ts          # Configuration Express
│   └── server.ts       # Point d'entrée
├── tests/              # Tests unitaires et d'intégration
├── package.json
└── tsconfig.json
```

## 🔌 API Endpoints (Prévus)

### **Authentification**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Mot de passe oublié

### **Utilisateurs**
- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Mise à jour profil
- `DELETE /api/users/account` - Suppression compte

### **Glycémie**
- `POST /api/glucose/readings` - Ajouter une mesure
- `GET /api/glucose/readings` - Liste des mesures
- `GET /api/glucose/readings/:id` - Détail d'une mesure
- `PUT /api/glucose/readings/:id` - Modifier une mesure
- `DELETE /api/glucose/readings/:id` - Supprimer une mesure
- `GET /api/glucose/statistics` - Statistiques

### **Évaluation des Risques**
- `POST /api/risk-assessment` - Créer une évaluation
- `GET /api/risk-assessment/latest` - Dernière évaluation
- `GET /api/risk-assessment/history` - Historique

### **Éducation**
- `GET /api/education/articles` - Liste des articles
- `GET /api/education/articles/:id` - Détail d'un article
- `GET /api/education/tips` - Conseils du jour

### **Rappels**
- `POST /api/reminders` - Créer un rappel
- `GET /api/reminders` - Liste des rappels
- `PUT /api/reminders/:id` - Modifier un rappel
- `DELETE /api/reminders/:id` - Supprimer un rappel

## 🗄️ Base de données

PostgreSQL avec les tables principales :
- `users` - Utilisateurs
- `glucose_readings` - Mesures de glycémie
- `risk_assessments` - Évaluations de risque
- `reminders` - Rappels
- `articles` - Articles éducatifs
- `user_preferences` - Préférences utilisateur

## 🔒 Sécurité

- Authentification JWT
- Hashage des mots de passe (bcrypt)
- Rate limiting
- Validation des données
- Protection CORS
- Headers de sécurité (helmet)

## 🚀 Démarrage rapide

_(À compléter)_
