# 🔐 Configuration FTP Hostinger pour StopDiabète

## 📋 Guide Étape par Étape

### 🎯 Objectif
Configurer l'accès FTP Hostinger pour permettre le déploiement automatique du frontend via GitHub Actions.

---

## 1️⃣ Accéder à hPanel Hostinger

1. **Connectez-vous à Hostinger**
   - URL : https://hpanel.hostinger.com
   - Utilisez vos identifiants Hostinger

2. **Sélectionnez votre hébergement**
   - Cliquez sur votre plan d'hébergement web
   - Ou allez dans "Hosting" dans le menu

---

## 2️⃣ Obtenir les Informations FTP

### Option A : Compte FTP Principal (Recommandé)

1. **Dans hPanel, allez dans** :
   ```
   Files → FTP Accounts
   ```

2. **Localisez le compte FTP principal**
   - Généralement nommé : `u123456789` ou similaire
   - Status : Active

3. **Notez les informations suivantes** :
   
   | Information | Où la trouver | Exemple |
   |-------------|---------------|---------|
   | **FTP Server** | Hostname | `ftp.votredomaine.com` |
   | **FTP Username** | Username | `u123456789` |
   | **FTP Port** | Port | `21` (standard) |

4. **Pour le mot de passe** :
   - Si vous ne l'avez pas : Cliquez sur "Change Password"
   - Générez un nouveau mot de passe fort
   - ⚠️ **Notez-le immédiatement** (vous ne pourrez plus le voir)

### Option B : Créer un Compte FTP Dédié (Plus Sécurisé)

1. **Créer un nouveau compte FTP** :
   - Cliquez sur "Create FTP Account"
   
2. **Remplissez les informations** :
   ```
   Username: stopdiabete-deploy
   Password: [générer un mot de passe fort]
   Directory: /public_html
   ```

3. **Notez les credentials** créés

---

## 3️⃣ Tester la Connexion FTP

### Test avec FileZilla (Recommandé)

1. **Téléchargez FileZilla** (si pas déjà installé)
   - https://filezilla-project.org/

2. **Connectez-vous** :
   ```
   Host: ftp.votredomaine.com
   Username: u123456789
   Password: [votre mot de passe]
   Port: 21
   ```

3. **Vérifiez** :
   - ✅ Connexion réussie
   - ✅ Vous voyez le dossier `/public_html`
   - ✅ Vous pouvez y créer/supprimer des fichiers

### Test en ligne de commande (Linux/Mac)

```bash
ftp ftp.votredomaine.com
# Entrez username et password
# Une fois connecté :
ls
cd public_html
ls
quit
```

---

## 4️⃣ Obtenir les Informations SSH (pour le Backend)

1. **Dans hPanel, allez dans** :
   ```
   Advanced → SSH Access
   ```

2. **Activez l'accès SSH** (si désactivé)
   - Toggle : "Enable SSH Access"

3. **Notez les informations** :
   
   | Information | Valeur | Exemple |
   |-------------|--------|---------|
   | **SSH Host** | Server IP ou hostname | `123.45.67.89` ou `ssh.votredomaine.com` |
   | **SSH Username** | Same as FTP | `u123456789` |
   | **SSH Password** | Same as FTP | [votre mot de passe] |
   | **SSH Port** | Port | `22` (ou autre si indiqué) |

### Test de connexion SSH

```bash
ssh u123456789@ssh.votredomaine.com
# Entrez le mot de passe
# Une fois connecté :
pwd
ls
exit
```

---

## 5️⃣ Configurer les Secrets GitHub

### Étape par étape sur GitHub

1. **Allez sur votre repository GitHub** :
   ```
   https://github.com/sandyfrank/StopDiabete
   ```

2. **Accédez aux Settings** :
   ```
   Repository → Settings → Secrets and variables → Actions
   ```

3. **Cliquez sur "New repository secret"**

4. **Ajoutez les secrets suivants** :

#### Secret 1 : FTP_SERVER
```
Name: FTP_SERVER
Value: ftp.votredomaine.com
```
*Remplacez par votre hostname FTP exact*

#### Secret 2 : FTP_USERNAME
```
Name: FTP_USERNAME
Value: u123456789
```
*Remplacez par votre username FTP*

#### Secret 3 : FTP_PASSWORD
```
Name: FTP_PASSWORD
Value: [votre mot de passe FTP]
```
*Copiez-collez le mot de passe exact*

#### Secret 4 : SSH_HOST
```
Name: SSH_HOST
Value: ssh.votredomaine.com
```
*Ou l'adresse IP du serveur*

#### Secret 5 : SSH_USERNAME
```
Name: SSH_USERNAME
Value: u123456789
```
*Même username que FTP généralement*

#### Secret 6 : SSH_PASSWORD
```
Name: SSH_PASSWORD
Value: [votre mot de passe SSH]
```
*Même mot de passe que FTP généralement*

#### Secret 7 : PRODUCTION_API_URL
```
Name: PRODUCTION_API_URL
Value: https://votredomaine.com/api
```
*URL où votre backend sera accessible*

#### Secret 8 : PROD_JWT_SECRET
```bash
# Générez d'abord le secret :
openssl rand -base64 64

# Puis ajoutez-le :
Name: PROD_JWT_SECRET
Value: [la chaîne générée]
```

---

## 6️⃣ Vérifier la Configuration

### Checklist de Vérification

```
✅ Connexion FTP testée et fonctionnelle
✅ Accès au dossier /public_html vérifié
✅ Connexion SSH testée (si backend)
✅ 8 secrets ajoutés sur GitHub
✅ Secrets correspondent exactement aux valeurs testées
```

### Voir les Secrets Configurés

```
GitHub → Settings → Secrets and variables → Actions
```

Vous devriez voir :
- ✅ FTP_SERVER
- ✅ FTP_USERNAME  
- ✅ FTP_PASSWORD
- ✅ SSH_HOST
- ✅ SSH_USERNAME
- ✅ SSH_PASSWORD
- ✅ PRODUCTION_API_URL
- ✅ PROD_JWT_SECRET

---

## 7️⃣ Tester le Déploiement

### Déploiement Manuel Test

1. **Allez dans l'onglet Actions** :
   ```
   https://github.com/sandyfrank/StopDiabete/actions
   ```

2. **Sélectionnez le workflow** :
   - "Deploy to Hostinger"

3. **Cliquez sur "Run workflow"**
   - Branch : `main`
   - Cliquez "Run workflow"

4. **Surveillez l'exécution** :
   - Cliquez sur le workflow en cours
   - Regardez les logs en temps réel
   - Vérifiez qu'il n'y a pas d'erreurs

### Erreurs Courantes et Solutions

#### ❌ "Failed to connect to FTP server"
**Solutions** :
- Vérifiez que le FTP_SERVER est correct (sans `ftp://`)
- Vérifiez le username et password
- Assurez-vous que l'accès FTP est activé dans hPanel

#### ❌ "Permission denied"
**Solutions** :
- Vérifiez que l'utilisateur FTP a les droits sur `/public_html`
- Créez le dossier si nécessaire
- Changez les permissions : `chmod 755 public_html`

#### ❌ "Directory not found: /public_html/"
**Solutions** :
- Connectez-vous via FTP et vérifiez le chemin exact
- Le chemin peut être `/domains/votredomaine.com/public_html`
- Modifiez `server-dir` dans `.github/workflows/deploy.yml`

---

## 8️⃣ Activer le Déploiement Automatique

Une fois que le déploiement manuel fonctionne :

1. **Éditez le fichier** `.github/workflows/deploy.yml`

2. **Décommentez les lignes** :
   ```yaml
   on:
     push:
       branches:
         - main
     workflow_dispatch:
   ```

3. **Commitez et poussez** :
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "feat: enable automatic deployment"
   git push origin main
   ```

4. **Désormais** : Chaque `git push origin main` déclenchera automatiquement le déploiement !

---

## 📊 Structure des Dossiers sur Hostinger

### Structure Recommandée

```
/home/u123456789/
├── domains/
│   └── votredomaine.com/
│       └── public_html/          ← Frontend (React build)
│           ├── index.html
│           ├── assets/
│           └── ...
├── stopdiabete-backend/          ← Backend (Node.js)
│   ├── dist/
│   ├── src/
│   ├── package.json
│   └── ...
└── .ssh/
    └── authorized_keys
```

### Chemins dans les Workflows

**Frontend (FTP)** :
```yaml
server-dir: /domains/votredomaine.com/public_html/
```

**Backend (SSH)** :
```bash
cd ~/stopdiabete-backend
```

---

## 🔧 Dépannage Avancé

### Voir les Logs FTP

```bash
# Sur le serveur Hostinger via SSH
tail -f /var/log/proftpd/proftpd.log
```

### Tester manuellement le déploiement FTP

```bash
cd frontend
npm run build

# Upload via FTP
lftp ftp://u123456789:PASSWORD@ftp.votredomaine.com -e "mirror -R dist/ /public_html/; quit"
```

### Permissions Fichiers

```bash
# Connectez-vous via SSH
chmod -R 755 /domains/votredomaine.com/public_html/
chown -R u123456789:u123456789 /domains/votredomaine.com/public_html/
```

---

## 📞 Support

### Hostinger Support
- Live Chat : Disponible 24/7 dans hPanel
- Email : support@hostinger.com
- Base de connaissances : https://support.hostinger.com

### GitHub Actions Issues
- Logs détaillés : Actions → Workflow → Job logs
- Documentation : https://docs.github.com/actions

---

## 📝 Notes Importantes

⚠️ **Sécurité** :
- Ne partagez JAMAIS vos credentials FTP/SSH publiquement
- Utilisez des mots de passe forts (16+ caractères)
- Changez régulièrement les mots de passe
- Utilisez SSH Keys au lieu de passwords quand possible

✅ **Bonnes Pratiques** :
- Testez toujours manuellement avant d'automatiser
- Gardez une sauvegarde de vos credentials dans un gestionnaire de mots de passe
- Documentez les chemins spécifiques à votre hébergement
- Utilisez des comptes FTP dédiés pour le déploiement

---

**Dernière mise à jour** : 2 février 2026
