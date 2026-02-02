#!/bin/bash

# 🩺 StopDiabète - Résumé des Scripts Disponibles
# ==============================================

cat << "EOF"

╔══════════════════════════════════════════════════════════════════╗
║                  🩺 StopDiabète - Scripts Dev                   ║
╚══════════════════════════════════════════════════════════════════╝

📁 Scripts Bash disponibles :
  
  🚀 ./start-dev.sh    - Démarrer backend + frontend
  🛑 ./stop-dev.sh     - Arrêter tous les serveurs
  📊 ./status.sh       - Vérifier le statut des serveurs
  ❓ ./help.sh         - Afficher cette aide

──────────────────────────────────────────────────────────────────

🔨 Commandes Make disponibles :

  make help      - Afficher l'aide complète
  make start     - Démarrer l'application
  make stop      - Arrêter l'application
  make status    - Vérifier le statut
  make install   - Installer les dépendances
  make clean     - Nettoyer les caches
  make logs      - Voir les logs en temps réel
  make restart   - Redémarrer l'application
  make build     - Build production
  make backend   - Démarrer uniquement le backend
  make frontend  - Démarrer uniquement le frontend

──────────────────────────────────────────────────────────────────

🌐 URLs de l'application :

  Frontend :     http://localhost:3000
  Backend API :  http://localhost:5000/api
  Health Check : http://localhost:5000/api/health

──────────────────────────────────────────────────────────────────

📝 Fichiers de logs :

  Backend :  logs/backend.log
  Frontend : logs/frontend.log

  Voir les logs : make logs
                  tail -f logs/*.log

──────────────────────────────────────────────────────────────────

⚡ Démarrage rapide :

  1. Installation (première fois) :
     $ make install

  2. Démarrer l'application :
     $ ./start-dev.sh
     ou
     $ make start

  3. Vérifier le statut :
     $ ./status.sh

  4. Ouvrir dans le navigateur :
     http://localhost:3000

  5. Arrêter :
     $ ./stop-dev.sh
     ou Ctrl+C dans le terminal

──────────────────────────────────────────────────────────────────

📚 Documentation :

  README.md              - Documentation complète du projet
  DEV_SCRIPTS_README.md  - Guide détaillé des scripts
  PROJECT_ROADMAP.md     - Feuille de route
  QUICK_START.md         - Guide de démarrage rapide

──────────────────────────────────────────────────────────────────

🔧 Dépannage :

  Problème de démarrage ?
  $ ./stop-dev.sh && make clean && make install && ./start-dev.sh

  Ports déjà utilisés ?
  $ lsof -ti:3000 | xargs kill -9
  $ lsof -ti:5000 | xargs kill -9

  Voir les erreurs ?
  $ cat logs/backend.log
  $ cat logs/frontend.log

──────────────────────────────────────────────────────────────────

💡 Astuces :

  - Le hot-reload est activé automatiquement
  - Les changements de code sont appliqués en temps réel
  - Les logs sont automatiquement créés dans logs/
  - Utilisez Ctrl+C pour arrêter proprement

╚══════════════════════════════════════════════════════════════════╝

EOF
