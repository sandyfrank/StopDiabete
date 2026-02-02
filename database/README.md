# 🗄️ StopDiabete - Database

Scripts et migrations pour la base de données PostgreSQL.

## 📂 Structure

```
database/
├── migrations/         # Scripts de migration
├── seeds/             # Données initiales
├── schema/            # Schémas SQL
└── scripts/           # Scripts utilitaires
```

## 📊 Schéma de Base de Données

### Tables Principales

#### **users**
- Informations utilisateur
- Authentification
- Profil médical de base

#### **glucose_readings**
- Mesures de glycémie
- Timestamps
- Notes optionnelles
- Contexte (avant/après repas, etc.)

#### **risk_assessments**
- Questionnaires d'évaluation
- Scores de risque
- Recommandations générées

#### **reminders**
- Rappels personnalisés
- Fréquence et horaires
- Statut actif/inactif

#### **articles**
- Contenu éducatif
- Catégories
- Métadonnées

#### **user_preferences**
- Paramètres d'affichage
- Unités de mesure
- Notifications

## 🚀 Utilisation

_(À compléter après mise en place)_

## 🔒 Sécurité

- Données médicales chiffrées
- Accès contrôlé par utilisateur
- Logs d'audit
- Backups automatiques
