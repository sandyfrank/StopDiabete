# 🚀 Configuration Production - StopDiabète Backend

## ✅ Étape 1 : Base de données MySQL (FAIT ✓)
- ✅ Base créée : `u640728304_stopdiabete_db`
- ✅ 3 tables créées : users, glucose_readings, risk_assessments
- ✅ Schéma importé avec succès

---

## 📝 Étape 2 : Configurer backend/.env.production

### A. Ouvrez le fichier `backend/.env.production`

Il contient des placeholders à remplir avec vos vraies valeurs.

### B. Remplissez les credentials MySQL Hostinger

Dans hPanel → Databases → MySQL, récupérez :

```env
DB_HOST=localhost                        # ← Généralement "localhost" sur Hostinger
DB_NAME=u640728304_stopdiabete_db       # ← Déjà rempli
DB_USER=REMPLACER_PAR_VOTRE_USERNAME    # ← Ex: u640728304_admin
DB_PASSWORD=REMPLACER_PAR_VOTRE_PASS    # ← Votre mot de passe MySQL
```

### C. Secrets JWT générés pour vous

**Remplacez ces lignes** :

```env
JWT_SECRET=QabLry/8AvVnq0gONe2M/qs6V8LHkK9JMjIWwhvL3zyjINnt3Npv77irMvbfe4xuL044a41/CAJVwNwAh9+CkA==

JWT_REFRESH_SECRET=habEtqIf3Zzknp5/sIO4JiJkHK45sx4oYOFymSuqGk+YWuHrh907e4HRtro+QjXyCTM8aHzpVD5cH+DiN7uDNA==
```

### D. URL de votre domaine

```env
CORS_ORIGIN=https://votre-domaine.com
FRONTEND_URL=https://votre-domaine.com
```

Remplacez `votre-domaine.com` par votre vrai domaine Hostinger.

---

## 🧪 Étape 3 : Tester en local (optionnel)

Si vous voulez tester la connexion MySQL Hostinger depuis votre machine locale :

```bash
cd backend

# Copier la config production en .env local temporairement
cp .env.production .env

# Démarrer le backend
npm run dev
```

**Attention** : Hostinger peut bloquer les connexions MySQL externes. Si ça ne fonctionne pas :
- C'est normal (firewall MySQL)
- Passez directement au déploiement en production

---

## 🚀 Étape 4 : Déploiement sur Hostinger

### Option A : Déploiement Frontend via GitHub (Déjà configuré ✓)

1. **Committez les changements MySQL** :
   ```bash
   git add backend/package.json backend/package-lock.json
   git add backend/src/config/database.ts
   git add database/schema_mysql.sql
   git add backend/.env.production.example
   git commit -m "feat: add MySQL support for Hostinger"
   git push origin main
   ```

2. **Hostinger rebuild automatiquement** le frontend
   - Vérifiez dans hPanel → Website → GitHub section

### Option B : Backend API séparé

Hostinger Business/Premium ne supporte pas Node.js directement pour le backend.

**Solutions** :

#### Solution 1 : Backend sur service externe (Recommandé)
- **Render.com** (gratuit) : https://render.com
- **Railway.app** (gratuit) : https://railway.app
- **Fly.io** (gratuit) : https://fly.io

**Avantages** :
- Node.js natif supporté
- Déploiement automatique depuis GitHub
- Logs en temps réel
- SSL gratuit

**Étapes** (exemple avec Render.com) :
1. Créez un compte sur Render.com
2. "New → Web Service"
3. Connectez votre repo GitHub `StopDiabete`
4. Root Directory : `backend`
5. Build Command : `npm install && npm run build`
6. Start Command : `node dist/server.js`
7. Ajoutez les variables d'environnement (depuis `.env.production`)
8. Deploy !

Puis dans votre frontend, changez l'API URL :
```typescript
// frontend/src/config/api.ts
export const API_BASE_URL = 'https://stopdiabete-api.onrender.com/api'
```

#### Solution 2 : VPS Hostinger (si vous avez un plan VPS)
Si vous avez un VPS :
```bash
ssh root@votre-vps-ip

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Cloner le repo
git clone https://github.com/sandyfrank/StopDiabete.git
cd StopDiabete/backend

# Installer les dépendances
npm install --production

# Copier la config
nano .env  # Collez le contenu de .env.production

# Build
npm run build

# Installer PM2
npm install -g pm2

# Démarrer l'API
pm2 start dist/server.js --name stopdiabete-api
pm2 startup
pm2 save
```

---

## 📊 Étape 5 : Vérification

### Test de connexion base de données

Dans phpMyAdmin, exécutez :
```sql
SELECT COUNT(*) FROM users;
```
Devrait retourner : `1` (l'utilisateur test)

### Test API (une fois déployé)

```bash
# Health check
curl https://votre-api-url/api/health

# Devrait retourner :
# {"status":"ok","timestamp":"..."}

# Full health check (avec database)
curl https://votre-api-url/api/health/full

# Devrait retourner :
# {"status":"ok","database":{"connected":true}}
```

---

## ✅ Checklist finale

Avant le déploiement :

- [ ] Base MySQL créée sur Hostinger (u640728304_stopdiabete_db)
- [ ] Schéma SQL importé (3 tables)
- [ ] Credentials MySQL récupérés
- [ ] `backend/.env.production` rempli avec les vraies valeurs
- [ ] Secrets JWT générés et ajoutés
- [ ] Domaine/URL configuré dans CORS_ORIGIN
- [ ] Code MySQL committé dans GitHub
- [ ] Service backend choisi (Render/Railway/VPS)

---

## 🆘 Problèmes courants

### "Access denied for user"
→ Vérifiez username et password MySQL dans hPanel

### "Unknown database"
→ Vérifiez le nom exact : `u640728304_stopdiabete_db` (avec le préfixe u640728304_)

### "Cannot connect to MySQL server"
→ Normal si vous testez en local, MySQL Hostinger n'accepte que les connexions internes

### Frontend ne peut pas appeler l'API
→ Vérifiez CORS_ORIGIN correspond bien à votre domaine frontend

---

## 📚 Fichiers importants

- `backend/.env.production` - Configuration production (NE PAS COMMITER)
- `backend/.env.production.example` - Template (OK pour Git)
- `backend/src/config/database.ts` - Adapter PostgreSQL/MySQL
- `database/schema_mysql.sql` - Schéma MySQL (déjà importé)
- `HOSTINGER_MYSQL_SETUP.md` - Ce guide

---

**Prochaine action recommandée** :
1. Remplir `backend/.env.production` avec vos vrais credentials
2. Choisir où déployer le backend (Render.com recommandé pour commencer)
3. Déployer et tester !

Besoin d'aide ? Continuons étape par étape ! 🚀
