# 🚀 Guide CI/CD - StopDiabète

## 📋 Vue d'ensemble

Ce projet utilise **GitHub Actions** pour l'intégration continue (CI) et le déploiement continu (CD).

## 🔄 Workflows Configurés

### 1. **CI Pipeline** (`.github/workflows/ci.yml`)

Déclenché sur : `push` et `pull_request` vers `main` et `develop`

**Étapes :**
- ✅ Tests backend avec PostgreSQL
- ✅ Tests frontend
- ✅ Linting du code
- ✅ Build des projets
- ✅ Audit de sécurité des dépendances
- ✅ Upload des artifacts

**Durée estimée :** 3-5 minutes

### 2. **Deploy to Hostinger** (`.github/workflows/deploy.yml`)

Déclenché sur : `push` vers `main` ou manuellement

**Étapes :**
- 📦 Build du frontend et du backend
- 🚀 Déploiement frontend via FTP
- 🚀 Déploiement backend via SSH
- 🗄️ Exécution des migrations de base de données
- ✅ Redémarrage du serveur avec PM2

**Durée estimée :** 5-10 minutes

### 3. **Pull Request Checks** (`.github/workflows/pr-checks.yml`)

Déclenché sur : Ouverture/mise à jour d'une Pull Request

**Vérifications :**
- ✅ Validation du titre de PR (conventional commits)
- ✅ Détection de TODO/FIXME
- ✅ Détection de console.log
- ✅ Vérification des tailles de fichiers
- ✅ Tests complets
- ✅ Rapport de taille du build

## 🔐 Configuration des Secrets

### Secrets Requis

Configurez ces secrets dans : `Repository → Settings → Secrets and variables → Actions`

#### Déploiement

| Secret | Description | Exemple |
|--------|-------------|---------|
| `PRODUCTION_API_URL` | URL de l'API en production | `https://api.stopdiabete.com/api` |
| `FTP_SERVER` | Serveur FTP Hostinger | `ftp.votre-domaine.com` |
| `FTP_USERNAME` | Nom d'utilisateur FTP | `user@domain.com` |
| `FTP_PASSWORD` | Mot de passe FTP | `***` |
| `SSH_HOST` | Hôte SSH Hostinger | `ssh.votre-domaine.com` |
| `SSH_USERNAME` | Nom d'utilisateur SSH | `u123456789` |
| `SSH_PASSWORD` | Mot de passe SSH | `***` |
| `SSH_PORT` | Port SSH (optionnel) | `22` |

#### Base de données Production

| Secret | Description | Valeur par défaut |
|--------|-------------|-------------------|
| `PROD_DATABASE_HOST` | Hôte PostgreSQL | `localhost` |
| `PROD_DATABASE_PORT` | Port PostgreSQL | `5432` |
| `PROD_DATABASE_NAME` | Nom de la BDD | `stopdiabete_prod` |
| `PROD_DATABASE_USER` | Utilisateur BDD | `***` |
| `PROD_DATABASE_PASSWORD` | Mot de passe BDD | `***` |

#### Sécurité

| Secret | Description | Génération |
|--------|-------------|-----------|
| `PROD_JWT_SECRET` | Secret JWT | `openssl rand -base64 64` |

### Script de Configuration

```bash
# Afficher le guide des secrets
./.github/setup-secrets.sh
```

## 📦 Badges de Statut

Ajoutez ces badges à votre README.md :

```markdown
![CI](https://github.com/YOUR_USERNAME/StopDiabete/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/YOUR_USERNAME/StopDiabete/actions/workflows/deploy.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
```

## 🎯 Utilisation

### Déploiement Automatique

Chaque `push` sur `main` déclenche automatiquement le déploiement :

```bash
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main
```

→ Le workflow de déploiement se lance automatiquement

### Déploiement Manuel

Via l'interface GitHub :

1. Allez dans l'onglet **Actions**
2. Sélectionnez **Deploy to Hostinger**
3. Cliquez sur **Run workflow**
4. Sélectionnez la branche `main`
5. Lancez le workflow

Via GitHub CLI :

```bash
gh workflow run deploy.yml --ref main
```

### Tester les Changements

Avant de merger vers `main`, créez une Pull Request :

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
git add .
git commit -m "feat: ma nouvelle fonctionnalité"
git push origin feature/ma-nouvelle-fonctionnalite
```

→ Créez une PR sur GitHub
→ Les workflows CI et PR Checks s'exécutent automatiquement

## 🐛 Dépannage

### Erreur : "Secrets not configured"

**Solution :**
1. Vérifiez que tous les secrets sont configurés dans GitHub
2. Les noms doivent correspondre exactement (sensibles à la casse)
3. Relancez le workflow après configuration

### Erreur : "FTP connection failed"

**Solutions :**
- Vérifiez les credentials FTP dans Hostinger hPanel
- Assurez-vous que l'accès FTP est activé
- Vérifiez le chemin `server-dir` dans `deploy.yml`

### Erreur : "SSH connection refused"

**Solutions :**
- Activez l'accès SSH dans Hostinger hPanel
- Vérifiez le port SSH (généralement 22 ou 21098)
- Utilisez SSH_KEY au lieu de SSH_PASSWORD pour plus de sécurité

### Erreur : "Database migration failed"

**Solutions :**
- Vérifiez que PostgreSQL est installé sur Hostinger
- Vérifiez les credentials de la base de données
- Créez le script de migration : `npm run migrate`

### Build Frontend Échoue

**Solutions :**
```bash
# Localement, vérifiez que le build fonctionne
cd frontend
npm ci
npm run build

# Vérifiez les variables d'environnement
echo $VITE_API_URL
```

### Tests Échouent

**Solutions :**
```bash
# Ajoutez les scripts de test dans package.json
"scripts": {
  "test": "vitest",
  "test:coverage": "vitest --coverage"
}

# Ou désactivez temporairement
# En ajoutant continue-on-error: true dans le workflow
```

## 🔧 Personnalisation

### Modifier le Workflow CI

Éditez `.github/workflows/ci.yml` :

```yaml
# Ajouter un nouveau job
new-job:
  name: Mon Nouveau Job
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Ma commande
      run: echo "Hello World"
```

### Ajouter des Notifications

Ajoutez un step de notification Slack/Discord :

```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Déploiement sur Autre Hébergeur

Remplacez les actions FTP/SSH par celles de votre hébergeur :

- **Vercel** : `vercel-action`
- **Netlify** : `netlify-cli-action`
- **AWS** : `aws-actions`
- **DigitalOcean** : `appleboy/ssh-action`

## 📊 Monitoring

### Voir les Logs

1. GitHub → Actions
2. Cliquez sur le workflow
3. Sélectionnez le job
4. Consultez les logs en temps réel

### Historique des Déploiements

GitHub → Actions → Filter by "Deploy to Hostinger"

### Artifacts

Les builds frontend sont sauvegardés pendant 7 jours :

1. GitHub → Actions → Workflow run
2. Section "Artifacts"
3. Téléchargez `frontend-dist`

## 🎓 Bonnes Pratiques

### Commits Conventionnels

Utilisez le format conventional commits pour les PR :

```bash
feat: ajout d'une nouvelle fonctionnalité
fix: correction d'un bug
docs: mise à jour de la documentation
style: formatage du code
refactor: refactorisation du code
test: ajout de tests
chore: tâches de maintenance
```

### Branches

- `main` : Production (déploiement automatique)
- `develop` : Développement (tests uniquement)
- `feature/*` : Nouvelles fonctionnalités
- `fix/*` : Corrections de bugs
- `hotfix/*` : Corrections urgentes en production

### Tests Avant Push

```bash
# Vérifier le build
npm run build

# Linter
npm run lint

# Tests
npm test

# Tout en une commande
npm run build && npm run lint && npm test
```

## 🔒 Sécurité

### Secrets

- ❌ Ne committez JAMAIS de secrets dans le code
- ✅ Utilisez toujours GitHub Secrets
- ✅ Utilisez `.env.example` pour documenter les variables nécessaires
- ✅ Ajoutez `.env` dans `.gitignore`

### Dépendances

Les audits de sécurité s'exécutent automatiquement. Pour corriger :

```bash
# Backend
cd backend
npm audit fix

# Frontend
cd frontend
npm audit fix
```

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Hostinger Deployment Guide](https://www.hostinger.com/tutorials/how-to-deploy-node-js)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [PM2 Documentation](https://pm2.keymetrics.io/)

## 🆘 Support

En cas de problème :

1. Consultez les logs dans GitHub Actions
2. Vérifiez la configuration des secrets
3. Testez le déploiement manuellement (voir DEPLOYMENT.md)
4. Ouvrez une issue sur GitHub

---

**Dernière mise à jour :** 2 février 2026
