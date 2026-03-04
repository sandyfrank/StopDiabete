# 🚀 Guide de Déploiement Public — StopDiabète

## Option recommandée : Railway (Backend + DB) + Vercel (Frontend)

> **Gratuit** · **10 minutes** · **Domaine automatique**

---

## 📐 Architecture cible

```
Utilisateurs
    │
    ▼
[Vercel] stopdiabete.vercel.app          ← Frontend React
    │  (requêtes API)
    ▼
[Railway] stopdiabete-backend.railway.app ← Backend Express
    │
    ▼
[Railway PostgreSQL]                      ← Base de données
```

---

## PARTIE 1 — Backend + Base de données sur Railway

### 1.1 Créer le projet Railway

1. Aller sur **[railway.app](https://railway.app)** → Sign in with GitHub
2. **New Project** → **Deploy from GitHub repo** → sélectionner `StopDiabete`
3. Railway détecte automatiquement le `Dockerfile` dans `/backend`

### 1.2 Ajouter PostgreSQL

Dans le projet Railway :
1. **+ Add Service** → **Database** → **PostgreSQL**
2. Railway crée automatiquement les variables `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`

### 1.3 Variables d'environnement du Backend (Railway)

Dans **Variables** du service backend, ajouter :

```
NODE_ENV=production
PORT=5000
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_NAME=${{Postgres.PGDATABASE}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
JWT_SECRET=<générer avec: openssl rand -base64 64>
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://stopdiabete.vercel.app
```

### 1.4 Initialiser la base de données

Après le premier déploiement, dans Railway **Shell** du service backend :
```bash
psql $DATABASE_URL < database/schema/001_initial_schema.sql
```

### 1.5 Récupérer l'URL du backend

Dans **Settings** → **Networking** → **Public Domain**
Exemple : `https://stopdiabete-backend-production.up.railway.app`

---

## PARTIE 2 — Frontend sur Vercel

### 2.1 Déployer sur Vercel

1. Aller sur **[vercel.com](https://vercel.com)** → Sign in with GitHub
2. **Add New Project** → importer `StopDiabete`
3. **Root Directory** : `frontend`
4. **Build Command** : `npm run build`
5. **Output Directory** : `dist`

### 2.2 Variables d'environnement Vercel

Dans **Settings** → **Environment Variables** :

```
VITE_API_URL=https://stopdiabete-backend-production.up.railway.app/api
```

### 2.3 Mettre à jour FRONTEND_URL dans Railway

Retourner dans Railway, mettre à jour :
```
FRONTEND_URL=https://stopdiabete.vercel.app
```

---

## PARTIE 3 — Déploiement Docker complet (optionnel, VPS)

Si vous avez un VPS (DigitalOcean, Hetzner, OVH...) :

```bash
# Sur le VPS
git clone https://github.com/sandyfrank/StopDiabete.git
cd StopDiabete

# Créer le .env de production
cp backend/.env.example backend/.env
nano backend/.env  # Remplir les valeurs

# Lancer tout avec Docker Compose
DB_PASSWORD=MotDePasseSecurise \
JWT_SECRET=$(openssl rand -base64 64) \
FRONTEND_URL=https://votre-domaine.com \
docker compose -f deployment/docker-compose.yml up -d
```

---

## ✅ Checklist avant mise en ligne

- [ ] `JWT_SECRET` généré aléatoirement (pas la valeur par défaut)
- [ ] `DB_PASSWORD` fort (pas "changeme")
- [ ] `FRONTEND_URL` = URL réelle de Vercel
- [ ] `VITE_API_URL` = URL réelle de Railway
- [ ] Les fichiers `.env` ne sont **pas** dans git (`git status` pour vérifier)
- [ ] Base de données initialisée avec le schema SQL

---

## 🔗 URLs finales (à compléter)

| Service | URL |
|---------|-----|
| Frontend | `https://stopdiabete.vercel.app` |
| Backend API | `https://???.railway.app/api` |
| Health check | `https://???.railway.app/api/health` |
