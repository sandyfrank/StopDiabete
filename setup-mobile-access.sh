#!/bin/bash
# Script de configuration pour accès mobile
# Date : 2 février 2026

echo "🔧 Configuration de l'accès mobile à StopDiabète..."
echo ""

# Récupérer l'IP WiFi
IP=$(ip addr show wlp1s0 | grep 'inet ' | awk '{print $2}' | cut -d/ -f1)

if [ -z "$IP" ]; then
    echo "❌ Impossible de détecter l'IP WiFi"
    exit 1
fi

echo "📱 Votre IP WiFi détectée : $IP"
echo ""

# 1. Configurer le frontend
echo "🎨 Configuration du frontend..."
cat > frontend/.env.development.local << EOF
# Configuration pour accès mobile
# Généré automatiquement le $(date)
VITE_API_URL=http://$IP:5000/api
EOF

echo "✅ Frontend configuré : frontend/.env.development.local"

# 2. Vérifier vite.config.ts
echo ""
echo "🔍 Vérification de vite.config.ts..."
if grep -q "host: '0.0.0.0'" frontend/vite.config.ts; then
    echo "✅ vite.config.ts déjà configuré"
else
    echo "⚠️  Modification de vite.config.ts nécessaire"
    echo "   Ajoutez dans server: { host: '0.0.0.0', port: 3000 }"
fi

# 3. Configurer le pare-feu
echo ""
echo "🔒 Configuration du pare-feu..."
if command -v ufw &> /dev/null; then
    echo "Autorisation des ports 3000 et 5000..."
    sudo ufw allow 3000/tcp comment "StopDiabete Frontend" 2>/dev/null
    sudo ufw allow 5000/tcp comment "StopDiabete Backend API" 2>/dev/null
    echo "✅ Pare-feu configuré"
else
    echo "ℹ️  UFW non installé, pare-feu non configuré"
fi

# 4. Créer un fichier d'information
cat > MOBILE_ACCESS.txt << EOF
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║          📱 ACCÈS MOBILE - STOPDIABÈTE                         ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

Généré le : $(date '+%d/%m/%Y à %H:%M:%S')

📍 ADRESSES D'ACCÈS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend (Interface web)    : http://$IP:3000
Backend API                 : http://$IP:5000/api
Health Check                : http://$IP:5000/api/health

📱 INSTRUCTIONS POUR TÉLÉPHONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Connectez votre téléphone au MÊME réseau WiFi que cet ordinateur
   
2. Ouvrez le navigateur mobile (Chrome, Safari, Firefox)
   
3. Tapez l'adresse : http://$IP:3000
   
4. L'application devrait se charger ! 🎉

⚠️  IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Votre téléphone DOIT être sur le même réseau WiFi
- Si ça ne fonctionne pas, vérifiez que les serveurs tournent :
  ./status.sh

- Redémarrez les serveurs si nécessaire :
  ./stop-dev.sh
  ./start-dev.sh

🔧 CONFIGURATION SYSTÈME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interface réseau            : wlp1s0
Adresse IP locale           : $IP
Ports ouverts               : 3000 (Frontend), 5000 (Backend)
Configuration frontend      : frontend/.env.development.local
Configuration backend       : backend/.env

📊 TESTS DISPONIBLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test health check           : curl http://$IP:5000/api/health
Test frontend               : curl -I http://$IP:3000

🌐 PAGES À TESTER SUR MOBILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Accueil                   : http://$IP:3000/
✅ Connexion                 : http://$IP:3000/login
✅ Inscription               : http://$IP:3000/register
✅ Dashboard                 : http://$IP:3000/dashboard
✅ Ma Glycémie               : http://$IP:3000/glucose
✅ Test de Risque            : http://$IP:3000/risk-assessment
✅ Éducation                 : http://$IP:3000/education
✅ Contact                   : http://$IP:3000/contact

🎨 VÉRIFICATIONS RESPONSIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Menu hamburger s'affiche correctement
- Boutons suffisamment grands pour être cliqués
- Texte lisible sans zoom
- Formulaires utilisables
- Graphiques responsive
- Footer adaptatif

💡 ASTUCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ajoutez cette page à l'écran d'accueil de votre téléphone :
1. Ouvrez http://$IP:3000 dans le navigateur mobile
2. Menu → "Ajouter à l'écran d'accueil"
3. L'application se comportera comme une app native ! 📱

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
StopDiabète v1.0.0 - Suivi et prévention du diabète
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EOF

echo "✅ Fichier MOBILE_ACCESS.txt créé"

# 5. Afficher le résumé
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║          ✅ CONFIGURATION TERMINÉE !                           ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📱 Pour accéder depuis votre téléphone :"
echo ""
echo "   1. Connectez votre téléphone au WiFi"
echo "   2. Ouvrez le navigateur mobile"
echo "   3. Tapez : http://$IP:3000"
echo ""
echo "📍 URLs d'accès :"
echo "   Frontend : http://$IP:3000"
echo "   Backend  : http://$IP:5000/api"
echo ""
echo "⚠️  N'oubliez pas de redémarrer les serveurs :"
echo "   ./stop-dev.sh"
echo "   ./start-dev.sh"
echo ""
echo "📄 Plus d'infos : cat MOBILE_ACCESS.txt"
echo ""
