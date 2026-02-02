# 🗄️ Configuration de la Base de Données

## ✅ Base de Données Créée

La base de données **stopdiabete** a été créée avec succès !

## 📝 Informations de Connexion

- **Hôte :** localhost
- **Port :** 5433 (PostgreSQL 17)
- **Base de données :** stopdiabete
- **Utilisateur :** postgres
- **Mot de passe :** stopdiabete2026

## 🔗 Commandes Utiles

### Se connecter à la base de données
```bash
PGPASSWORD='stopdiabete2026' psql -h localhost -U postgres -p 5433 -d stopdiabete
```

### Lister les tables
```bash
PGPASSWORD='stopdiabete2026' psql -h localhost -U postgres -p 5433 -d stopdiabete -c "\dt"
```

### Voir la structure d'une table
```bash
PGPASSWORD='stopdiabete2026' psql -h localhost -U postgres -p 5433 -d stopdiabete -c "\d users"
```

### Compter les enregistrements
```bash
PGPASSWORD='stopdiabete2026' psql -h localhost -U postgres -p 5433 -d stopdiabete -c "SELECT COUNT(*) FROM users;"
```

### Exporter des données
```bash
PGPASSWORD='stopdiabete2026' pg_dump -h localhost -U postgres -p 5433 stopdiabete > backup.sql
```

### Importer des données
```bash
PGPASSWORD='stopdiabete2026' psql -h localhost -U postgres -p 5433 -d stopdiabete < backup.sql
```

## 📊 Tables Créées

1. **users** - Utilisateurs et informations médicales
2. **glucose_readings** - Mesures de glycémie
3. **risk_assessments** - Évaluations des risques
4. **reminders** - Rappels personnalisés
5. **articles** - Contenu éducatif
6. **user_preferences** - Préférences utilisateur

## 🔧 Configuration Backend

Le fichier `backend/.env` a été configuré avec les bonnes informations :
- DB_HOST=localhost
- DB_PORT=5433
- DB_NAME=stopdiabete
- DB_USER=postgres
- DB_PASSWORD=stopdiabete2026

## ⚠️ Note de Sécurité

**IMPORTANT :** En production, changez le mot de passe et utilisez des variables d'environnement sécurisées !

## 🚀 Prochaines Étapes

1. ✅ Base de données créée
2. ✅ Schéma appliqué
3. ✅ Variables d'environnement configurées
4. ⬜ Installer les dépendances backend : `cd backend && npm install`
5. ⬜ Lancer le backend : `cd backend && npm run dev`
6. ⬜ Installer les dépendances frontend : `cd frontend && npm install`
7. ⬜ Lancer le frontend : `cd frontend && npm run dev`

---

**Date de création :** 2 février 2026
