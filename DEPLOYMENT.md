# 🚀 Guide de Déploiement sur Hostinger

Ce guide détaille les étapes pour déployer l'application **StopDiabète** sur Hostinger.

## 📋 Prérequis

- Compte Hostinger avec plan compatible Node.js
- Accès SSH à votre hébergement
- Base de données PostgreSQL configurée
- Nom de domaine configuré

## 🏗️ Architecture de Déploiement

```
Hostinger Server
├── /home/user/stopdiabete/
│   ├── backend/          # API Express
│   ├── frontend/         # Build React
│   └── .env             # Variables d'environnement
```

## 📦 Étape 1 : Préparation du Backend

### 1.1 Configuration de l'environnement

Créez un fichier `.env` à la racine du backend :

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=stopdiabete
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server
PORT=5000
NODE_ENV=production

# CORS
FRONTEND_URL=https://votre-domaine.com
```

### 1.2 Installation des dépendances

```bash
cd backend
npm install --production
```

### 1.3 Build du TypeScript

```bash
npm run build
```

Cela créera un dossier `dist/` avec le code compilé.

### 1.4 Script de démarrage

Créez `start-production.sh` dans le dossier backend :

```bash
#!/bin/bash
export NODE_ENV=production
node dist/server.js
```

Rendez-le exécutable :
```bash
chmod +x start-production.sh
```

## 🎨 Étape 2 : Build du Frontend

### 2.1 Configuration de l'API URL

Modifiez `frontend/.env.production` :

```env
VITE_API_URL=https://votre-domaine.com/api
```

### 2.2 Build de production

```bash
cd frontend
npm install
npm run build
```

Cela créera un dossier `dist/` avec les fichiers statiques optimisés.

## 🗄️ Étape 3 : Configuration de la Base de Données

### 3.1 Connexion PostgreSQL

Sur Hostinger, créez une base de données PostgreSQL via le panneau de contrôle.

### 3.2 Initialisation du schéma

Connectez-vous à votre base de données et exécutez le script SQL :

```sql
-- Tables déjà définies dans backend/src/config/database.ts
-- Copiez le schéma depuis le fichier de migration si nécessaire

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS glucose_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    value DECIMAL(5,2) NOT NULL,
    measurement_type VARCHAR(50) NOT NULL,
    measured_at TIMESTAMP NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS risk_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    age INTEGER NOT NULL,
    bmi DECIMAL(5,2) NOT NULL,
    waist_circumference INTEGER,
    family_history BOOLEAN DEFAULT FALSE,
    physical_activity VARCHAR(50),
    diet_quality VARCHAR(50),
    smoking_status BOOLEAN DEFAULT FALSE,
    blood_pressure_high BOOLEAN DEFAULT FALSE,
    gestational_diabetes BOOLEAN DEFAULT FALSE,
    risk_score INTEGER NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Autres tables si nécessaire...
```

## 🌐 Étape 4 : Configuration du Serveur Web

### 4.1 Configuration Node.js

Via le panneau Hostinger :
1. Accédez à "Node.js Selector"
2. Sélectionnez Node.js version 18.x ou supérieure
3. Définissez le répertoire de l'application : `/home/user/stopdiabete/backend`
4. Script d'entrée : `dist/server.js`
5. Variables d'environnement : Ajoutez toutes les variables du fichier `.env`

### 4.2 Configuration Nginx (Reverse Proxy)

Créez `/home/user/public_html/.htaccess` :

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # API requests
    RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]
    
    # Frontend static files
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /index.html [L]
</IfModule>
```

### 4.3 Configuration du domaine

1. Pointez votre domaine vers l'IP Hostinger
2. Activez le SSL/HTTPS via le panneau Hostinger (Let's Encrypt gratuit)

## 📁 Étape 5 : Upload des Fichiers

### 5.1 Via FTP/SFTP

Utilisez FileZilla ou un client SFTP :

```
Local                                  →  Remote (Hostinger)
─────────────────────────────────────────────────────────────
backend/dist/                          →  /home/user/stopdiabete/backend/dist/
backend/node_modules/                  →  /home/user/stopdiabete/backend/node_modules/
backend/package.json                   →  /home/user/stopdiabete/backend/package.json
backend/.env                           →  /home/user/stopdiabete/backend/.env

frontend/dist/                         →  /home/user/public_html/
```

### 5.2 Via SSH (recommandé)

```bash
# Connexion SSH
ssh user@your-hostinger-server.com

# Clone du repository (si vous utilisez Git)
cd /home/user
git clone https://github.com/your-repo/stopdiabete.git

# Installation backend
cd stopdiabete/backend
npm install --production
npm run build

# Build frontend
cd ../frontend
npm install
npm run build

# Copie du frontend build vers public_html
cp -r dist/* /home/user/public_html/
```

## ⚙️ Étape 6 : Démarrage de l'Application

### 6.1 Avec PM2 (Process Manager)

```bash
# Installation PM2
npm install -g pm2

# Démarrage du backend
cd /home/user/stopdiabete/backend
pm2 start dist/server.js --name stopdiabete-api

# Sauvegarde de la configuration PM2
pm2 save
pm2 startup
```

### 6.2 Vérification

```bash
# Statut des processus
pm2 status

# Logs en temps réel
pm2 logs stopdiabete-api

# Redémarrage
pm2 restart stopdiabete-api
```

## 🔧 Étape 7 : Configuration Post-Déploiement

### 7.1 Test de l'API

```bash
curl https://votre-domaine.com/api/health
# Devrait retourner: {"status":"ok","message":"Server is running"}
```

### 7.2 Test du Frontend

Visitez `https://votre-domaine.com` dans votre navigateur.

### 7.3 Configuration CORS

Assurez-vous que le backend autorise les requêtes depuis votre domaine :

```typescript
// backend/src/server.ts
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://votre-domaine.com',
  credentials: true
}));
```

## 📱 Optimisations Mobile

L'application est déjà optimisée pour mobile avec :

✅ **Responsive Design** : Breakpoints Tailwind (sm, md, lg)
✅ **Touch-friendly** : Zones de clic adaptées (min 44x44px)
✅ **Performance** : Code splitting, lazy loading
✅ **PWA Ready** : Peut être installée comme app mobile
✅ **Viewport configuré** : `<meta name="viewport">`

Pour activer le mode PWA, ajoutez un `manifest.json` et un Service Worker.

## 🔒 Sécurité

### Checklist de sécurité en production :

- [ ] Variables d'environnement sécurisées (pas dans Git)
- [ ] HTTPS activé (SSL/TLS)
- [ ] JWT secret fort et unique
- [ ] Rate limiting activé sur l'API
- [ ] Validation des entrées utilisateur
- [ ] Headers de sécurité (Helmet.js)
- [ ] Base de données avec credentials sécurisés
- [ ] Backups automatiques de la DB

### Configuration Helmet.js

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## 📊 Monitoring et Maintenance

### Logs

```bash
# Backend logs avec PM2
pm2 logs stopdiabete-api --lines 100

# Erreurs uniquement
pm2 logs stopdiabete-api --err

# Fichiers de logs
tail -f /home/user/stopdiabete/logs/backend.log
```

### Monitoring

```bash
# Utilisation des ressources
pm2 monit

# Statistiques
pm2 describe stopdiabete-api
```

### Backups

Configurez des backups automatiques de la base de données :

```bash
# Script de backup PostgreSQL
#!/bin/bash
DATE=$(date +"%Y%m%d_%H%M%S")
pg_dump -U your_db_user stopdiabete > /home/user/backups/stopdiabete_$DATE.sql
# Garder seulement les 7 derniers jours
find /home/user/backups -name "stopdiabete_*.sql" -mtime +7 -delete
```

## 🔄 Mises à Jour

Pour déployer une nouvelle version :

```bash
# 1. Pull du code
cd /home/user/stopdiabete
git pull origin main

# 2. Backend
cd backend
npm install
npm run build
pm2 restart stopdiabete-api

# 3. Frontend
cd ../frontend
npm install
npm run build
cp -r dist/* /home/user/public_html/

# 4. Clear cache Nginx/Apache
# (via panneau Hostinger ou commande)
```

## 🆘 Dépannage

### Problème : API ne répond pas

```bash
# Vérifier si le serveur Node tourne
ps aux | grep node
pm2 status

# Vérifier les logs
pm2 logs stopdiabete-api --err

# Redémarrer
pm2 restart stopdiabete-api
```

### Problème : Erreur de connexion DB

```bash
# Tester la connexion PostgreSQL
psql -h localhost -U your_db_user -d stopdiabete

# Vérifier les credentials dans .env
cat /home/user/stopdiabete/backend/.env
```

### Problème : Frontend affiche page blanche

1. Vérifier que les fichiers sont dans `public_html/`
2. Vérifier `.htaccess`
3. Vérifier la console du navigateur pour les erreurs
4. Vérifier que `VITE_API_URL` pointe vers la bonne URL

## 📞 Support

Pour toute assistance :
- Documentation Hostinger : https://support.hostinger.com
- Support StopDiabète : support@stopdiabete.com

## ✅ Checklist de Déploiement

- [ ] Backend compilé et déployé
- [ ] Frontend build et copié dans public_html
- [ ] Base de données créée et initialisée
- [ ] Variables d'environnement configurées
- [ ] HTTPS/SSL activé
- [ ] PM2 configuré et processus démarré
- [ ] Tests API fonctionnels
- [ ] Tests Frontend fonctionnels
- [ ] Backup automatique configuré
- [ ] Monitoring en place
- [ ] Documentation mise à jour

---

**Date de dernière mise à jour** : 2 février 2026
**Version** : 1.0.0
