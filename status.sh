#!/bin/bash

# Script pour vérifier le statut des serveurs StopDiabète

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   🩺 Statut des serveurs StopDiabète${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Vérifier le frontend
echo -e "${YELLOW}Frontend (Vite - Port 3000):${NC}"
if pgrep -f "vite" > /dev/null; then
    VITE_PID=$(pgrep -f "vite" | head -1)
    echo -e "  ${GREEN}✅ Actif (PID: $VITE_PID)${NC}"
    
    # Tester la connexion HTTP
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Accessible sur http://localhost:3000${NC}"
    else
        echo -e "  ${YELLOW}⚠️  Processus actif mais serveur non accessible${NC}"
    fi
else
    echo -e "  ${RED}❌ Inactif${NC}"
fi

echo ""

# Vérifier le backend
echo -e "${YELLOW}Backend (Node.js - Port 5000):${NC}"
if pgrep -f "ts-node.*server.ts" > /dev/null || pgrep -f "nodemon" > /dev/null; then
    NODE_PID=$(pgrep -f "ts-node.*server.ts\|nodemon" | head -1)
    echo -e "  ${GREEN}✅ Actif (PID: $NODE_PID)${NC}"
    
    # Tester la connexion HTTP
    if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Accessible sur http://localhost:5000/api${NC}"
        
        # Afficher la réponse du health check
        HEALTH=$(curl -s http://localhost:5000/api/health)
        echo -e "  ${GREEN}✅ Health check: $HEALTH${NC}"
    else
        echo -e "  ${YELLOW}⚠️  Processus actif mais serveur non accessible${NC}"
    fi
else
    echo -e "  ${RED}❌ Inactif${NC}"
fi

echo ""

# Vérifier PostgreSQL
echo -e "${YELLOW}Base de données (PostgreSQL):${NC}"
if systemctl is-active --quiet postgresql 2>/dev/null || pgrep -x postgres > /dev/null; then
    echo -e "  ${GREEN}✅ PostgreSQL actif${NC}"
    
    # Tester la connexion à la base de données
    if PGPASSWORD=stopdiabete2026 psql -h localhost -p 5433 -U postgres -d stopdiabete -c "SELECT 1;" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Base 'stopdiabete' accessible${NC}"
    else
        echo -e "  ${YELLOW}⚠️  PostgreSQL actif mais base non accessible${NC}"
    fi
else
    echo -e "  ${RED}❌ PostgreSQL inactif${NC}"
fi

echo ""

# Vérifier les ports
echo -e "${YELLOW}Ports utilisés:${NC}"
if lsof -i :3000 > /dev/null 2>&1; then
    PORT_3000=$(lsof -ti :3000)
    echo -e "  ${GREEN}✅ Port 3000 utilisé (PID: $PORT_3000)${NC}"
else
    echo -e "  ${RED}❌ Port 3000 libre${NC}"
fi

if lsof -i :5000 > /dev/null 2>&1; then
    PORT_5000=$(lsof -ti :5000)
    echo -e "  ${GREEN}✅ Port 5000 utilisé (PID: $PORT_5000)${NC}"
else
    echo -e "  ${RED}❌ Port 5000 libre${NC}"
fi

echo ""

# Vérifier les logs
echo -e "${YELLOW}Logs disponibles:${NC}"
if [ -f "logs/frontend.log" ]; then
    FRONTEND_SIZE=$(du -h logs/frontend.log | cut -f1)
    FRONTEND_LINES=$(wc -l < logs/frontend.log)
    echo -e "  ${GREEN}✅ logs/frontend.log ($FRONTEND_SIZE, $FRONTEND_LINES lignes)${NC}"
else
    echo -e "  ${RED}❌ logs/frontend.log non trouvé${NC}"
fi

if [ -f "logs/backend.log" ]; then
    BACKEND_SIZE=$(du -h logs/backend.log | cut -f1)
    BACKEND_LINES=$(wc -l < logs/backend.log)
    echo -e "  ${GREEN}✅ logs/backend.log ($BACKEND_SIZE, $BACKEND_LINES lignes)${NC}"
else
    echo -e "  ${RED}❌ logs/backend.log non trouvé${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Suggestions
FRONTEND_RUNNING=$(pgrep -f "vite" > /dev/null && echo "1" || echo "0")
BACKEND_RUNNING=$(pgrep -f "ts-node.*server.ts\|nodemon" > /dev/null && echo "1" || echo "0")

if [ "$FRONTEND_RUNNING" = "0" ] || [ "$BACKEND_RUNNING" = "0" ]; then
    echo -e "\n${YELLOW}💡 Pour démarrer les serveurs : ${NC}./start-dev.sh"
fi

if [ "$FRONTEND_RUNNING" = "1" ] && [ "$BACKEND_RUNNING" = "1" ]; then
    echo -e "\n${GREEN}✨ Tous les serveurs sont opérationnels !${NC}"
    echo -e "${BLUE}🌐 Application disponible sur: http://localhost:3000${NC}"
fi

echo ""
