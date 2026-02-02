# 🩺 StopDiabète - Application de Prévention et Gestion du Diabète

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

Application web complète pour la prévention, le dépistage et la gestion du diabète. **Accessible sur ordinateur, tablette et smartphone**.

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

## ✨ Fonctionnalités Principales

### 🔐 Authentification Sécurisée

- Inscription et connexion avec JWT
- Hashing bcrypt des mots de passe
- Session de 7 jours
- Gestion de profil
- Visibilité du mot de passe (toggle eye icon)

### 📊 Suivi de Glycémie Intelligent

- 5 types de mesures (à jeun, avant/après repas, avant sommeil, aléatoire)
- Graphiques interactifs Chart.js
- Statistiques automatiques (moyenne 7 jours, tendances)
- Code couleur selon seuils OMS
- Historique complet avec persistence en base de données

### 🎯 Test de Risque Diabétique

- Questionnaire en 4 étapes basé sur OMS/ADA├── backend/           # API Node.js/Express

- Calcul automatique de l'IMC├── database/          # Scripts et migrations de base de données

- Scoring sur 15+ points├── docs/              # Documentation du projet

- Rapport PDF imprimable professionnel├── tests/             # Tests end-to-end

- Recommandations personnalisées└── deployment/        # Configuration de déploiement

```

### 📚 Éducation Thérapeutique

- 7 sections complètes (généralités, type 1, type 2, complications, hygiène, gestationnel, rôle infirmier)## 🚀 Technologies Prévues

- Interface accordéon intuitive

- Contenu validé par sources médicales### Frontend

- Illustrations avec emojis- React.js avec TypeScript

- Tailwind CSS pour le design responsive

### 📱 Pages Informatives- Chart.js pour les graphiques de glycémie

- À propos (mission, valeurs)- React Router pour la navigation

- Politique de confidentialité (RGPD)

- Conditions d'utilisation### Backend

- Formulaire de contact- Node.js + Express

- PostgreSQL pour la base de données

## 🛠️ Stack Technique- JWT pour l'authentification

- Express-validator pour la validation

**Frontend** : React 18 + TypeScript + Vite + Tailwind CSS + Chart.js + Lucide Icons  

**Backend** : Node.js + Express + TypeScript + PostgreSQL + JWT + bcrypt  ### DevOps

**DevOps** : Bash scripts + PM2 + Makefile + Git  - Docker pour la conteneurisation

- GitHub Actions pour CI/CD

## 🚀 Installation Rapide

## 📦 Installation & Lancement

```bash

# 1. Cloner le repository### 🚀 Démarrage Rapide (Frontend)

git clone https://github.com/votre-username/stopdiabete.git

cd stopdiabete```bash

cd frontend

# 2. Installer PostgreSQL et créer la DBnpx vite

createdb stopdiabete```



# 3. Configurer les variables d'environnement➡️ Ouvrir **http://localhost:5173/**

# Backend : backend/.env

# Frontend : frontend/.env### 🗄️ Base de Données



# 4. Lancer l'applicationLa base de données PostgreSQL est **déjà configurée** :

./start-dev.sh- **Port** : 5433

# Ou : make start- **Base** : stopdiabete

- **User** : postgres

# 5. Accéder à l'application- **Password** : stopdiabete2026

# Frontend : http://localhost:3000

# Backend : http://localhost:5000/apiVoir `DATABASE_SETUP.md` pour plus de détails.

```

### ⚙️ Backend (À Développer)

## 📱 100% Responsive Mobile

```bash

L'application est **entièrement optimisée pour smartphones** :cd backend

npm install

- ✅ Menu hamburger mobilenpm run dev

- ✅ Zones tactiles ≥ 44x44px```

- ✅ Breakpoints adaptatifs (sm, md, lg, xl)

- ✅ Formulaires optimisés tactile## 📚 Documentation

- ✅ Graphiques responsive

- ✅ Navigation fluide- **QUICK_START.md** - Démarrage en 3 secondes

- **APPLICATION_LANCEE.md** - ⭐ Guide complet (LIRE EN PREMIER)

**Testée sur** : iPhone, Android, iPad, tablettes Android- **FRONTEND_COMPLETED.md** - Documentation frontend détaillée

- **DATABASE_SETUP.md** - Configuration base de données

## 🌐 Déploiement Hostinger- **PROJECT_ROADMAP.md** - Planning de développement

- **docs/ARCHITECTURE.md** - Architecture technique

Guide complet dans [DEPLOYMENT.md](./DEPLOYMENT.md) :- **docs/FEATURES.md** - Liste des fonctionnalités

- **docs/USER_PERSONAS.md** - Profils utilisateurs

1. Build production

2. Configuration PostgreSQL## ✅ État Actuel (2 février 2026)

3. Upload via SFTP/SSH

4. Configuration PM2### Frontend : **OPÉRATIONNEL** ✅

5. Activation HTTPS- ✅ Page d'accueil moderne et stylée

6. Tests et monitoring- ✅ Système d'authentification (UI)

- ✅ Navigation responsive

## 📁 Structure du Projet- ✅ Composants réutilisables

- ✅ Design system complet

```

StopDiabète/### Backend : **À IMPLÉMENTER** ⏳

├── backend/          # API Express + TypeScript- ⏳ API authentification

├── frontend/         # React + Vite + Tailwind- ⏳ Routes CRUD glycémie

├── logs/             # Logs de développement- ⏳ Algorithme d'arbre de décision

├── start-dev.sh      # Démarrage automatique- ⏳ Gestion des utilisateurs

├── stop-dev.sh       # Arrêt des serveurs

├── status.sh         # Vérification statut### Base de Données : **CONFIGURÉE** ✅

├── help.sh           # Aide interactive- ✅ PostgreSQL 17

├── Makefile          # Commandes simplifiées- ✅ 6 tables créées

├── DEPLOYMENT.md     # Guide déploiement- ✅ Schéma complet

└── README.md         # Ce fichier

```## 🎨 Design Highlights



## 💻 Commandes UtilesL'application est **très stylée** et **facile d'utilisation** :

- 🎨 Palette de couleurs moderne (bleu, vert, orange, rouge)

```bash- ✨ Animations fluides et naturelles

# Développement- 📱 Mobile-first et responsive

make start          # Démarrer tout- ♿ Accessible à tous les âges

make stop           # Arrêter tout- 🔒 Messages rassurants et éthiques

make status         # Vérifier le statut

make logs           # Voir les logs en temps réel## 🤝 Contribution

make help           # Afficher l'aide

_(À définir)_

# Build

make build          # Build backend + frontend## 📄 Licence

make install        # Installer les dépendances

make clean          # Nettoyer les caches_(À définir)_



# Production---

npm run build       # Build pour production

pm2 start dist/server.js  # Lancer avec PM2**Date de création :** 2 février 2026

```

## 🔒 Sécurité & RGPD

- ✅ Conformité RGPD
- ✅ Chiffrement des mots de passe (bcrypt)
- ✅ JWT avec expiration
- ✅ Validation des entrées
- ✅ HTTPS en production
- ✅ Headers de sécurité (Helmet.js)
- ✅ Rate limiting API

## ⚠️ Disclaimer Important

**Cette application est un outil d'information et ne remplace PAS :**
- Une consultation médicale
- Un diagnostic professionnel
- Un traitement prescrit
- Un dispositif médical certifié

**En cas d'urgence, contactez le 15 ou le 112.**

## 📧 Contact

- **Support** : support@stopdiabete.com
- **Confidentialité** : privacy@stopdiabete.com
- **Légal** : legal@stopdiabete.com

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE)

## 🙏 Références Médicales

- Organisation Mondiale de la Santé (OMS)
- American Diabetes Association (ADA)
- Société Francophone du Diabète (SFD)

---

**Développé avec ❤️ pour la prévention du diabète**  
*Version 1.0.0 - 2 février 2026*
