# 🗄️ Configuration MySQL Hostinger pour StopDiabète

## ✅ Vous avez créé : `stopdiabete_db`

Maintenant suivez ces étapes pour finaliser la configuration.

---

## 📋 Étape 1 : Récupérer les informations MySQL Hostinger

1. **Connectez-vous à hPanel Hostinger**
   - https://hpanel.hostinger.com

2. **Allez dans Databases**
   - Menu → **Databases** → **MySQL Databases**

3. **Trouvez votre base `stopdiabete_db`**
   - Notez les informations suivantes :

```
Hostname:     ___________________ (ex: localhost ou mysql.hostinger.com)
Database:     stopdiabete_db
Username:     ___________________ (ex: u123456789)
Password:     ___________________ (celui que vous avez défini)
Port:         3306 (par défaut)
```

---

## 📊 Étape 2 : Importer le schéma de base de données

### Option A : Via phpMyAdmin (Interface graphique)

1. **Dans hPanel** → **Databases** → **Manage** (à côté de stopdiabete_db)
2. Cliquez sur **"Enter phpMyAdmin"**
3. Sélectionnez la base `stopdiabete_db` à gauche
4. Onglet **"SQL"** en haut
5. **Copiez-collez** le contenu du fichier `database/schema_mysql.sql`
6. Cliquez **"Go"** / **"Exécuter"**
7. ✅ Tables créées !

### Option B : Via MySQL CLI (Si vous avez accès SSH)

```bash
# Se connecter au serveur MySQL
mysql -h hostname -u username -p stopdiabete_db

# Ou importer directement
mysql -h hostname -u username -p stopdiabete_db < database/schema_mysql.sql
```

---

## 🔧 Étape 3 : Configurer le Backend

### Fichier `.env` en production

Créez un fichier `.env` sur le serveur avec vos credentials :

```bash
# Database Configuration (MySQL - Hostinger)
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=stopdiabete_db
DB_USER=votre_username_hostinger
DB_PASSWORD=votre_password_mysql

# JWT Configuration
JWT_SECRET=votre_jwt_secret_genere
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=https://votre-domaine.com

# Production
NODE_ENV=production
PORT=5000
```

**Générer un JWT_SECRET** :
```bash
openssl rand -base64 64
```

---

## 🧪 Étape 4 : Tester la connexion

### En local (pour tester avant déploiement)

1. **Mettez à jour `backend/.env`** avec vos credentials Hostinger
   ```env
   DB_TYPE=mysql
   DB_HOST=mysql.votredomaine.com
   DB_PORT=3306
   DB_NAME=stopdiabete_db
   DB_USER=u123456789
   DB_PASSWORD=votre_password
   ```

2. **Démarrez le backend**
   ```bash
   cd backend
   npm run dev
   ```

3. **Vérifiez la console**
   ```
   ✅ MySQL Database connected successfully
   🚀 Server running on port 5000
   ```

4. **Testez l'API**
   ```bash
   curl http://localhost:5000/api/health/full
   ```

   Devrait retourner :
   ```json
   {
     "status": "ok",
     "database": {
       "connected": true,
       "timestamp": "2026-02-02T..."
     }
   }
   ```

---

## 🚀 Étape 5 : Déploiement sur Hostinger

### Option A : Déploiement GitHub (Recommandé)

Si vous utilisez le déploiement GitHub :

1. **Variables d'environnement dans Hostinger**
   - hPanel → Website → Configuration → Environment Variables
   - Ajoutez :
     ```
     DB_TYPE=mysql
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=stopdiabete_db
     DB_USER=votre_username
     DB_PASSWORD=votre_password
     JWT_SECRET=votre_jwt_secret
     ```

2. **Le frontend se déploie automatiquement**
   - Push vers GitHub → Hostinger build et déploie

### Option B : Backend séparé (Si nécessaire)

Si vous voulez déployer le backend sur Hostinger :

1. **Uploader le backend via SSH/FTP**
2. **Installer Node.js sur Hostinger** (si plan supporte)
3. **Configurer PM2** pour garder l'API active
4. **Configurer le proxy** pour `/api` → backend Node.js

---

## 📝 Différences PostgreSQL vs MySQL

Le backend a été adapté pour supporter les deux. La seule différence :

### Variables d'environnement

```env
# PostgreSQL (ancien)
DB_TYPE=postgresql
DB_PORT=5432

# MySQL (nouveau - Hostinger)
DB_TYPE=mysql
DB_PORT=3306
```

### Tout le reste fonctionne pareil !

L'adapter gère automatiquement :
- ✅ Conversion des placeholders (`$1` → `?`)
- ✅ Format de résultats différent
- ✅ Connexion et pooling

---

## ✅ Checklist Finale

Avant le déploiement, vérifiez :

- [ ] Base de données `stopdiabete_db` créée sur Hostinger
- [ ] Schéma SQL importé (`database/schema_mysql.sql`)
- [ ] Tables créées (users, glucose_readings, risk_assessments)
- [ ] Credentials MySQL notés (host, user, password)
- [ ] JWT_SECRET généré
- [ ] Fichier `.env` configuré en production
- [ ] Test de connexion réussi en local
- [ ] Variables d'environnement configurées dans Hostinger

---

## 🆘 Dépannage

### Erreur : "Access denied for user"
- Vérifiez username et password
- Assurez-vous que l'utilisateur a les droits sur `stopdiabete_db`
- Dans phpMyAdmin → Users → Vérifier les privilèges

### Erreur : "Unknown database 'stopdiabete_db'"
- La base n'a pas été créée
- Créez-la dans hPanel → Databases → MySQL Databases

### Erreur : "Cannot connect to MySQL server"
- Vérifiez le hostname (localhost en production)
- Port 3306 est-il accessible ?
- Firewall bloque-t-il la connexion ?

### Tables non créées
- Importez `database/schema_mysql.sql` via phpMyAdmin
- Vérifiez les erreurs SQL dans phpMyAdmin

---

## 📚 Fichiers Importants

- `backend/src/config/database.ts` - Adapter PostgreSQL/MySQL
- `database/schema_mysql.sql` - Schéma MySQL
- `backend/.env.production.example` - Template environnement production
- `backend/package.json` - Inclut maintenant mysql2

---

**Prochaine étape** : Déployer le frontend via GitHub (déjà configuré !)

Le backend peut :
- Rester en local pour dev
- Être déployé sur un service Node.js (Render, Railway, etc.)
- Ou sur Hostinger VPS si vous avez Node.js activé

**Questions ?** Consultez `HOSTINGER_GITHUB_DEPLOYMENT.md`
