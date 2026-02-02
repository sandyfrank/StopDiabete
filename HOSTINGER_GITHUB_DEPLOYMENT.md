# 🚀 Déploiement Hostinger via GitHub

## 📋 Vue d'ensemble

Hostinger propose un **déploiement automatique direct depuis GitHub** qui simplifie grandement le processus. Cette méthode est plus simple que FTP/SSH manuel.

---

## 🎯 Architecture de Déploiement

```
┌─────────────────────────────────────────────────────────────────┐
│                         VOTRE WORKFLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. git push → GitHub Repository                               │
│          ↓                                                      │
│  2. Hostinger détecte le push                                  │
│          ↓                                                      │
│  3. Hostinger clone/pull le repo                               │
│          ↓                                                      │
│  4. Build automatique (si configuré)                           │
│          ↓                                                      │
│  5. Déploiement en production                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Configuration dans Hostinger

### 1️⃣ Accéder à hPanel

1. Connectez-vous : https://hpanel.hostinger.com
2. Sélectionnez votre hébergement web
3. Cherchez la section **"Git"** ou **"GitHub"** ou **"Deployments"**

### 2️⃣ Connecter GitHub Repository

Dans hPanel :

1. **Allez dans** : `Advanced → Git` ou `Website → Git Version Control`

2. **Cliquez sur** : "Connect Repository" ou "Add Repository"

3. **Autorisez Hostinger** :
   - Vous serez redirigé vers GitHub
   - Autorisez l'application Hostinger
   - Sélectionnez le repository : `sandyfrank/StopDiabete`

4. **Configurez la branche** :
   - Branch à déployer : `main`
   - Auto-deploy : ✅ Activé

### 3️⃣ Configuration du Build

Hostinger doit savoir comment construire votre application Node.js :

#### Pour une Application Full-Stack (Frontend + Backend)

**Option A : Déployer uniquement le Frontend (Recommandé pour démarrer)**

```bash
# Build Command
cd frontend && npm install && npm run build

# Public Directory
frontend/dist
```

**Option B : Déployer le Frontend et Backend**

Cela nécessite une configuration plus avancée (voir section Advanced).

---

## 📁 Structure de Déploiement Hostinger

### Structure Actuelle du Projet

```
StopDiabete/
├── frontend/              ← Application React (SPA)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               ← API Express (Node.js)
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
└── .github/
    └── workflows/
        └── deploy.yml     ← À MODIFIER pour Hostinger GitHub
```

### Structure Hostinger Attendue

Hostinger s'attend généralement à :

```
public_html/               ← Racine web accessible
├── index.html            ← Point d'entrée
├── assets/               ← CSS, JS, images
└── ...                   ← Autres fichiers statiques
```

---

## 🔧 Configurations Requises

### Option 1 : Frontend Seulement (Simple)

Si vous déployez uniquement le frontend React :

**1. Configuration Hostinger** :
```
Build Command: cd frontend && npm install && npm run build
Public Directory: frontend/dist
```

**2. Variables d'environnement dans Hostinger** :
```
VITE_API_URL=https://api.votredomaine.com
```

**3. Le backend reste sur un autre service** :
- Hébergé ailleurs (Render, Railway, Heroku, etc.)
- Ou sur un sous-domaine Hostinger avec Node.js

---

### Option 2 : Monorepo (Frontend + Backend)

Pour déployer les deux sur Hostinger, il faut organiser différemment :

**Structure recommandée** :

```
StopDiabete/
├── public_html/           ← Symlink vers frontend/dist
│   └── (fichiers build frontend)
│
├── api/                   ← Backend Node.js
│   ├── src/
│   ├── dist/
│   └── package.json
│
└── package.json           ← Root package.json pour orchestration
```

**Build Command** :
```bash
npm install && npm run build:all
```

**Root package.json** à créer :
```json
{
  "scripts": {
    "build:frontend": "cd frontend && npm install && npm run build",
    "build:backend": "cd backend && npm install && npm run build",
    "build:all": "npm run build:frontend && npm run build:backend",
    "postbuild": "npm run copy-frontend",
    "copy-frontend": "cp -r frontend/dist/* public_html/"
  }
}
```

---

## 🚦 Configuration Actuelle vs Hostinger GitHub

### ❌ Configuration Actuelle (À Désactiver)

Le fichier `.github/workflows/deploy.yml` actuel utilise :
- FTP Deploy Action
- SSH Action
- Secrets GitHub (FTP_SERVER, SSH_HOST, etc.)

**Ces secrets ne sont PLUS nécessaires** avec le déploiement GitHub de Hostinger !

### ✅ Nouvelle Configuration (Hostinger GitHub)

**Simplifications** :
- ✅ Pas besoin de secrets FTP/SSH
- ✅ Pas besoin de GitHub Actions personnalisées
- ✅ Hostinger gère le déploiement automatiquement
- ✅ Juste un `git push` suffit

---

## 🔄 Migration vers Hostinger GitHub Deploy

### Étape 1 : Désactiver l'ancien workflow

Le workflow `.github/workflows/deploy.yml` est déjà désactivé (manual trigger only).

**Options** :
- **Option A** : Supprimer le fichier (recommandé)
- **Option B** : Le garder pour référence mais désactivé

### Étape 2 : Configurer Hostinger GitHub

Suivez la section "Configuration dans Hostinger" ci-dessus.

### Étape 3 : Premier déploiement

```bash
# 1. Commitez vos changements
git add .
git commit -m "chore: configure for Hostinger GitHub deployment"

# 2. Poussez vers main
git push origin main

# 3. Hostinger détecte automatiquement et déploie !
```

### Étape 4 : Vérifier le déploiement

Dans hPanel Hostinger :
- Allez dans la section Git/Deployments
- Vérifiez les logs de build
- Testez votre site : https://votredomaine.com

---

## 🎯 Configuration Recommandée pour StopDiabète

### Stratégie A : Frontend sur Hostinger, Backend ailleurs (RECOMMANDÉ)

**Frontend (Hostinger GitHub Deploy)** :
```
Repository: sandyfrank/StopDiabete
Branch: main
Build Command: cd frontend && npm ci && npm run build
Public Directory: frontend/dist
Environment Variables:
  - VITE_API_URL=https://api-stopdiabete.onrender.com
```

**Backend (Service externe)** :
- Déployez sur Render.com, Railway.app, ou Heroku
- Ces services sont optimisés pour Node.js/Express
- Gratuit pour démarrer

**Avantages** :
- ✅ Simple à configurer
- ✅ Frontend rapide (Hostinger CDN)
- ✅ Backend sur infrastructure Node.js dédiée
- ✅ Scaling indépendant

---

### Stratégie B : Tout sur Hostinger (Avancé)

Si votre plan Hostinger supporte Node.js :

**1. Frontend** : Déployé via GitHub (comme Stratégie A)

**2. Backend** : Déployé manuellement via SSH
```bash
# Se connecter via SSH
ssh u123456789@ssh.votredomaine.com

# Cloner le backend
cd ~
git clone https://github.com/sandyfrank/StopDiabete.git
cd StopDiabete/backend

# Installer et builder
npm ci --production
npm run build

# Lancer avec PM2
pm2 start dist/server.js --name stopdiabete-api
pm2 save
pm2 startup
```

**3. Base de données PostgreSQL** : Via hPanel
```
hPanel → Databases → PostgreSQL → Create Database
Notez : host, database, username, password
```

**Avantages** :
- ✅ Tout sur un seul hébergement
- ✅ Une seule facture

**Inconvénients** :
- ⚠️ Configuration plus complexe
- ⚠️ Nécessite un plan Business/Cloud
- ⚠️ Moins flexible pour le scaling

---

## 🔐 Variables d'Environnement

### Où les configurer ?

**Dans Hostinger hPanel** :
```
Advanced → Environment Variables
ou
Website → Configuration → Environment Variables
```

### Variables Nécessaires

#### Pour le Frontend (Hostinger)
```bash
VITE_API_URL=https://api.votredomaine.com
```

#### Pour le Backend (si sur Hostinger)
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=votre_secret_jwt_genere
```

**Générer JWT_SECRET** :
```bash
./generate-secrets.sh
# Utilisez la valeur générée
```

---

## 📝 Checklist de Déploiement

### ☑️ Préparation

- [ ] Code poussé sur GitHub (branch main)
- [ ] Frontend build fonctionne localement (`cd frontend && npm run build`)
- [ ] Backend build fonctionne localement (`cd backend && npm run build`)
- [ ] Variables d'environnement identifiées

### ☑️ Configuration Hostinger

- [ ] Compte Hostinger actif
- [ ] Domaine configuré (ou sous-domaine)
- [ ] Autorisation GitHub accordée
- [ ] Repository `sandyfrank/StopDiabete` connecté
- [ ] Branch `main` sélectionnée
- [ ] Build command configurée
- [ ] Public directory configurée
- [ ] Variables d'environnement ajoutées

### ☑️ Premier Déploiement

- [ ] Git push effectué
- [ ] Build réussi (vérifier logs Hostinger)
- [ ] Site accessible (https://votredomaine.com)
- [ ] Pas d'erreurs 404 sur les routes React
- [ ] API accessible (si backend sur Hostinger)

### ☑️ Configuration Post-Déploiement

- [ ] HTTPS activé (SSL/TLS)
- [ ] Redirection HTTP → HTTPS
- [ ] .htaccess configuré pour React Router (si nécessaire)
- [ ] CORS configuré dans le backend
- [ ] Base de données migrée

---

## 🐛 Dépannage Courant

### Erreur : "Build Failed"

**Causes possibles** :
1. **Mauvais chemin** dans Build Command
   ```bash
   # ❌ Mauvais
   npm run build
   
   # ✅ Correct
   cd frontend && npm install && npm run build
   ```

2. **Dépendances manquantes**
   ```bash
   # Assurez-vous d'utiliser npm ci ou npm install
   cd frontend && npm ci && npm run build
   ```

3. **Node.js version incompatible**
   - Vérifiez la version Node.js de Hostinger
   - Ajoutez `.nvmrc` ou `.node-version` à la racine :
   ```
   18.18.0
   ```

### Erreur : "Page Not Found" (404) sur routes React

**Cause** : Le serveur web ne redirige pas les routes vers `index.html`

**Solution** : Créer `.htaccess` dans `frontend/public/` :
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

### Erreur : "API Connection Failed"

**Causes possibles** :
1. **VITE_API_URL incorrecte**
   - Vérifiez la variable d'environnement dans Hostinger
   - Format : `https://api.votredomaine.com` (sans slash final)

2. **CORS non configuré**
   ```typescript
   // backend/src/server.ts
   app.use(cors({
     origin: ['https://votredomaine.com', 'https://www.votredomaine.com'],
     credentials: true
   }));
   ```

3. **Backend non démarré**
   - Vérifiez que le backend est actif (PM2, autre service)

---

## 🔄 Workflow de Développement

### Développement Local
```bash
# Terminal 1 : Backend
cd backend
npm run dev

# Terminal 2 : Frontend
cd frontend
npm run dev
```

### Déploiement en Production
```bash
# Commitez vos changements
git add .
git commit -m "feat: nouvelle fonctionnalité"

# Poussez vers GitHub
git push origin main

# Hostinger déploie automatiquement ! 🚀
```

### Vérification Post-Déploiement
1. Allez dans hPanel → Git/Deployments
2. Vérifiez les logs de build
3. Testez le site : https://votredomaine.com

---

## 📚 Ressources

### Documentation Hostinger
- **Help Center** : https://support.hostinger.com
- **GitHub Deployment** : Cherchez "GitHub" dans le Help Center
- **Node.js Hosting** : https://support.hostinger.com/en/collections/nodejs

### Outils de Diagnostic
```bash
# Vérifier la build localement
cd frontend && npm run build && cd ..

# Servir le build localement pour tester
cd frontend/dist && python3 -m http.server 8000

# Accédez à http://localhost:8000
```

### Support
- **Live Chat** : Disponible 24/7 dans hPanel
- **Email** : support@hostinger.com
- **Communauté** : Forum Hostinger

---

## 🎯 Prochaines Étapes

1. **Connectez le repository GitHub dans Hostinger**
   - hPanel → Git → Connect Repository

2. **Configurez le build**
   - Build Command : `cd frontend && npm ci && npm run build`
   - Public Directory : `frontend/dist`

3. **Ajoutez les variables d'environnement**
   - `VITE_API_URL` (URL de votre API)

4. **Poussez sur GitHub**
   ```bash
   git push origin main
   ```

5. **Surveillez le déploiement dans hPanel**

6. **Testez votre application** 🎉

---

## ⚠️ Notes Importantes

### GitHub Actions
- Les workflows GitHub Actions (`.github/workflows/deploy.yml`) ne sont **plus nécessaires**
- Hostinger gère le déploiement directement
- Vous pouvez garder le workflow CI (tests) mais pas le déploiement

### Secrets GitHub
- Les secrets `FTP_SERVER`, `SSH_HOST`, etc. ne sont **plus nécessaires**
- Hostinger a déjà accès via l'autorisation GitHub

### Auto-Deploy
- Chaque `git push` vers `main` déclenchera un déploiement automatique
- Désactivable dans hPanel si vous préférez les déploiements manuels

---

## 🆘 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. **Vérifiez les logs de build** dans hPanel
2. **Consultez le Help Center Hostinger**
3. **Contactez le support Hostinger** (disponible 24/7)
4. **Vérifiez la configuration** :
   - Build command correcte ?
   - Public directory correcte ?
   - Variables d'environnement configurées ?

---

**Dernière mise à jour** : 2 février 2026
