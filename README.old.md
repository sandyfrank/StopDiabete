# 🏥 StopDiabete - Application Web de Prévention et Suivi du Diabète

## 📋 Description

StopDiabete est une application web gratuite et accessible, conçue pour aider les personnes diabétiques et les personnes à risque à mieux gérer leur santé.

### 🎯 Objectifs principaux

- ✅ Aider les personnes diabétiques à suivre leur glycémie simplement
- ✅ Identifier les personnes à risque le plus tôt possible (prévention)
- ✅ Éduquer et accompagner vers de meilleures habitudes de vie
- ✅ Être gratuite, simple, utilisable par tous

### 👥 Profils d'utilisateurs

1. **Personnes diabétiques** (type 1, type 2)
2. **Personnes à risque** (surpoids, antécédents familiaux, sédentarité)
3. **Personnes curieuses** de leur santé
4. **Personnel de santé** (optionnel, phase future)

## 🏗️ Architecture du Projet

```
StopDiabete/
├── frontend/          # Application React (Interface utilisateur)
├── backend/           # API Node.js/Express
├── database/          # Scripts et migrations de base de données
├── docs/              # Documentation du projet
├── tests/             # Tests end-to-end
└── deployment/        # Configuration de déploiement
```

## 🚀 Technologies Prévues

### Frontend
- React.js avec TypeScript
- Tailwind CSS pour le design responsive
- Chart.js pour les graphiques de glycémie
- React Router pour la navigation

### Backend
- Node.js + Express
- PostgreSQL pour la base de données
- JWT pour l'authentification
- Express-validator pour la validation

### DevOps
- Docker pour la conteneurisation
- GitHub Actions pour CI/CD

## 📦 Installation & Lancement

### 🚀 Démarrage Rapide (Frontend)

```bash
cd frontend
npx vite
```

➡️ Ouvrir **http://localhost:5173/**

### 🗄️ Base de Données

La base de données PostgreSQL est **déjà configurée** :
- **Port** : 5433
- **Base** : stopdiabete
- **User** : postgres
- **Password** : stopdiabete2026

Voir `DATABASE_SETUP.md` pour plus de détails.

### ⚙️ Backend (À Développer)

```bash
cd backend
npm install
npm run dev
```

## 📚 Documentation

- **QUICK_START.md** - Démarrage en 3 secondes
- **APPLICATION_LANCEE.md** - ⭐ Guide complet (LIRE EN PREMIER)
- **FRONTEND_COMPLETED.md** - Documentation frontend détaillée
- **DATABASE_SETUP.md** - Configuration base de données
- **PROJECT_ROADMAP.md** - Planning de développement
- **docs/ARCHITECTURE.md** - Architecture technique
- **docs/FEATURES.md** - Liste des fonctionnalités
- **docs/USER_PERSONAS.md** - Profils utilisateurs

## ✅ État Actuel (2 février 2026)

### Frontend : **OPÉRATIONNEL** ✅
- ✅ Page d'accueil moderne et stylée
- ✅ Système d'authentification (UI)
- ✅ Navigation responsive
- ✅ Composants réutilisables
- ✅ Design system complet

### Backend : **À IMPLÉMENTER** ⏳
- ⏳ API authentification
- ⏳ Routes CRUD glycémie
- ⏳ Algorithme d'arbre de décision
- ⏳ Gestion des utilisateurs

### Base de Données : **CONFIGURÉE** ✅
- ✅ PostgreSQL 17
- ✅ 6 tables créées
- ✅ Schéma complet

## 🎨 Design Highlights

L'application est **très stylée** et **facile d'utilisation** :
- 🎨 Palette de couleurs moderne (bleu, vert, orange, rouge)
- ✨ Animations fluides et naturelles
- 📱 Mobile-first et responsive
- ♿ Accessible à tous les âges
- 🔒 Messages rassurants et éthiques

## 🤝 Contribution

_(À définir)_

## 📄 Licence

_(À définir)_

---

**Date de création :** 2 février 2026
