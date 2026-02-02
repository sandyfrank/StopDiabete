#!/bin/bash

# Script pour arrêter tous les serveurs StopDiabète

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🛑 Arrêt des serveurs StopDiabète...${NC}\n"

# Arrêter les processus Vite (frontend)
if pgrep -f "vite" > /dev/null; then
    echo -e "${YELLOW}Arrêt du serveur frontend (Vite)...${NC}"
    pkill -f "vite"
    echo -e "${GREEN}✅ Frontend arrêté${NC}"
else
    echo -e "${RED}⚠️  Aucun serveur frontend en cours d'exécution${NC}"
fi

# Arrêter les processus nodemon/ts-node (backend)
if pgrep -f "nodemon" > /dev/null || pgrep -f "ts-node.*server.ts" > /dev/null; then
    echo -e "${YELLOW}Arrêt du serveur backend (Node.js)...${NC}"
    pkill -f "nodemon"
    pkill -f "ts-node.*server.ts"
    echo -e "${GREEN}✅ Backend arrêté${NC}"
else
    echo -e "${RED}⚠️  Aucun serveur backend en cours d'exécution${NC}"
fi

# Nettoyer les ports si nécessaire
echo -e "\n${YELLOW}Vérification des ports...${NC}"
if lsof -ti:3000 > /dev/null 2>&1; then
    echo -e "${YELLOW}Libération du port 3000...${NC}"
    kill -9 $(lsof -ti:3000) 2>/dev/null
fi

if lsof -ti:5000 > /dev/null 2>&1; then
    echo -e "${YELLOW}Libération du port 5000...${NC}"
    kill -9 $(lsof -ti:5000) 2>/dev/null
fi

echo -e "\n${GREEN}✨ Tous les serveurs ont été arrêtés${NC}"
