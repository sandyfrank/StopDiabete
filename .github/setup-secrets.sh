#!/bin/bash

# Configuration des Secrets GitHub pour CI/CD - StopDiabète
# Ce script vous guide pour configurer les secrets nécessaires

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 Configuration des Secrets GitHub - StopDiabète"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📍 Allez sur GitHub et configurez les secrets suivants :"
echo ""
echo "   Repository → Settings → Secrets and variables → Actions → New repository secret"
echo ""

cat << 'EOF'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 SECRETS À CONFIGURER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 PRODUCTION (Deployment)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. PRODUCTION_API_URL
   Description : URL de l'API en production
   Exemple : https://api.stopdiabete.com/api
   Valeur : https://votre-domaine.com/api

2. FTP_SERVER
   Description : Serveur FTP Hostinger
   Exemple : ftp.votre-domaine.com
   Valeur : [À obtenir depuis Hostinger]

3. FTP_USERNAME
   Description : Nom d'utilisateur FTP
   Valeur : [À obtenir depuis Hostinger]

4. FTP_PASSWORD
   Description : Mot de passe FTP
   Valeur : [À obtenir depuis Hostinger]

5. SSH_HOST
   Description : Hôte SSH Hostinger
   Exemple : ssh.votre-domaine.com
   Valeur : [À obtenir depuis Hostinger]

6. SSH_USERNAME
   Description : Nom d'utilisateur SSH
   Valeur : [À obtenir depuis Hostinger]

7. SSH_PASSWORD
   Description : Mot de passe SSH (ou utilisez SSH_KEY)
   Valeur : [À obtenir depuis Hostinger]

8. SSH_PORT (Optionnel)
   Description : Port SSH (défaut: 22)
   Valeur : 22

9. SSH_KEY (Alternative à SSH_PASSWORD)
   Description : Clé SSH privée pour authentification
   Valeur : [Contenu de votre clé privée ~/.ssh/id_rsa]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗄️ DATABASE (Production)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

10. PROD_DATABASE_HOST
    Description : Hôte de la base de données
    Valeur : [À obtenir depuis Hostinger]

11. PROD_DATABASE_PORT
    Description : Port PostgreSQL
    Valeur : 5432

12. PROD_DATABASE_NAME
    Description : Nom de la base de données
    Valeur : stopdiabete_prod

13. PROD_DATABASE_USER
    Description : Utilisateur de la base de données
    Valeur : [À obtenir depuis Hostinger]

14. PROD_DATABASE_PASSWORD
    Description : Mot de passe de la base de données
    Valeur : [À obtenir depuis Hostinger]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

15. PROD_JWT_SECRET
    Description : Secret JWT pour la production
    Valeur : [Générer une longue chaîne aléatoire]
    Conseil : Utilisez: openssl rand -base64 64

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 GUIDE D'OBTENTION DES VALEURS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Accès FTP (Hostinger) :
   1. Connectez-vous à hPanel Hostinger
   2. Allez dans "Files" → "FTP Accounts"
   3. Notez : serveur, username, et générez/récupérez le mot de passe

🔐 Accès SSH (Hostinger) :
   1. hPanel → "Advanced" → "SSH Access"
   2. Activez l'accès SSH si nécessaire
   3. Notez : host, username, port
   4. Option A : Utilisez le mot de passe
   5. Option B : Générez une clé SSH et ajoutez-la aux clés autorisées

🗄️ Base de données (Hostinger) :
   1. hPanel → "Databases" → "MySQL Databases"
      (ou PostgreSQL si disponible)
   2. Notez : hostname, database name, username, password

🔑 Générer JWT_SECRET :
   $ openssl rand -base64 64
   
   Ou en Node.js :
   $ node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 APRÈS CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Vérifiez que tous les secrets sont configurés :
   GitHub → Settings → Secrets and variables → Actions

✅ Testez le déploiement :
   1. Allez dans l'onglet "Actions"
   2. Sélectionnez "Deploy to Hostinger"
   3. Cliquez "Run workflow"
   4. Sélectionnez la branche "main"
   5. Lancez le workflow

✅ Le premier déploiement peut échouer - c'est normal !
   Ajustez les chemins et configurations selon votre setup Hostinger.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 NOTES IMPORTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Ne committez JAMAIS les valeurs des secrets dans Git
• Les secrets sont chiffrés par GitHub
• Seuls les workflows GitHub Actions y ont accès
• Vous pouvez mettre à jour les secrets à tout moment
• Pour plus de sécurité, utilisez SSH_KEY au lieu de SSH_PASSWORD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EOF

echo ""
echo "💡 Pour tester localement avant le déploiement automatique :"
echo "   Voir le fichier DEPLOYMENT.md pour les instructions détaillées"
echo ""
echo "📖 Documentation complète : .github/DEPLOYMENT_GUIDE.md"
echo ""
