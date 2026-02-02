#!/bin/bash

# Script de démarrage des serveurs de développement StopDiabète
# Backend (Node.js/Express) et Frontend (Vite/React)

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${2}${1}${NC}"
}

# Fonction pour nettoyer les processus à l'arrêt
cleanup() {
    print_message "\n🛑 Arrêt des serveurs..." "$YELLOW"
    pkill -P $$
    exit 0
}

# Capturer Ctrl+C pour un arrêt propre
trap cleanup SIGINT SIGTERM

# Vérifier que nous sommes dans le bon répertoire
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_message "❌ Erreur : Ce script doit être exécuté depuis le répertoire racine du projet StopDiabète" "$RED"
    exit 1
fi

print_message "🚀 Démarrage de l'application StopDiabète en mode développement...\n" "$GREEN"

# Vérifier si les dépendances sont installées
if [ ! -d "backend/node_modules" ]; then
    print_message "📦 Installation des dépendances backend..." "$YELLOW"
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    print_message "📦 Installation des dépendances frontend..." "$YELLOW"
    cd frontend && npm install && cd ..
fi

# Créer un répertoire pour les logs
mkdir -p logs

# Démarrer le backend
print_message "🔧 Démarrage du serveur backend (port 5000)..." "$BLUE"
cd backend
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendre 2 secondes que le backend démarre
sleep 2

# Vérifier si le backend est démarré
if ps -p $BACKEND_PID > /dev/null; then
    print_message "✅ Backend démarré avec succès (PID: $BACKEND_PID)" "$GREEN"
else
    print_message "❌ Erreur lors du démarrage du backend" "$RED"
    print_message "Consultez logs/backend.log pour plus de détails" "$YELLOW"
    exit 1
fi

# Démarrer le frontend
print_message "🎨 Démarrage du serveur frontend (port 3000)..." "$BLUE"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Attendre 3 secondes que le frontend démarre
sleep 3

# Vérifier si le frontend est démarré
if ps -p $FRONTEND_PID > /dev/null; then
    print_message "✅ Frontend démarré avec succès (PID: $FRONTEND_PID)" "$GREEN"
else
    print_message "❌ Erreur lors du démarrage du frontend" "$RED"
    print_message "Consultez logs/frontend.log pour plus de détails" "$YELLOW"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

print_message "\n✨ Application StopDiabète démarrée avec succès !" "$GREEN"
print_message "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" "$GREEN"
print_message "📍 Frontend : http://localhost:3000" "$BLUE"
print_message "📍 Backend  : http://localhost:5000/api" "$BLUE"
print_message "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" "$GREEN"
print_message "\n📝 Logs disponibles dans le répertoire 'logs/'" "$YELLOW"
print_message "   - logs/backend.log" "$YELLOW"
print_message "   - logs/frontend.log" "$YELLOW"
print_message "\n💡 Appuyez sur Ctrl+C pour arrêter les serveurs\n" "$YELLOW"

# Afficher les logs en temps réel
tail -f logs/backend.log logs/frontend.log
