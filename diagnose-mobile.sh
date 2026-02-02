#!/bin/bash
# Script de diagnostic pour l'accès mobile
# Date : 2 février 2026

echo "🔍 DIAGNOSTIC D'ACCÈS MOBILE - StopDiabète"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Vérifier l'IP
echo "📍 1. Adresses IP détectées :"
IP_WIFI=$(ip addr show wlp1s0 2>/dev/null | grep 'inet ' | awk '{print $2}' | cut -d/ -f1)
IP_ETH=$(ip addr show enx5c60baa2fe96 2>/dev/null | grep 'inet ' | awk '{print $2}' | cut -d/ -f1)

if [ ! -z "$IP_WIFI" ]; then
    echo "   ✅ WiFi (wlp1s0)    : $IP_WIFI"
else
    echo "   ❌ WiFi non détecté"
fi

if [ ! -z "$IP_ETH" ]; then
    echo "   ✅ Ethernet         : $IP_ETH"
else
    echo "   ℹ️  Ethernet non connecté"
fi

echo ""

# 2. Vérifier les processus
echo "🔄 2. État des serveurs :"
FRONTEND_PID=$(pgrep -f "vite" | head -1)
BACKEND_PID=$(pgrep -f "ts-node src/server.ts" | head -1)

if [ ! -z "$FRONTEND_PID" ]; then
    echo "   ✅ Frontend (Vite)  : PID $FRONTEND_PID"
else
    echo "   ❌ Frontend arrêté"
fi

if [ ! -z "$BACKEND_PID" ]; then
    echo "   ✅ Backend (Node)   : PID $BACKEND_PID"
else
    echo "   ❌ Backend arrêté"
fi

echo ""

# 3. Vérifier les ports
echo "🔌 3. Ports en écoute :"
PORT_3000=$(ss -tlnp 2>/dev/null | grep ":3000" | head -1)
PORT_5000=$(ss -tlnp 2>/dev/null | grep ":5000" | head -1)

if [ ! -z "$PORT_3000" ]; then
    echo "   ✅ Port 3000 : $PORT_3000"
else
    echo "   ❌ Port 3000 non ouvert"
fi

if [ ! -z "$PORT_5000" ]; then
    echo "   ✅ Port 5000 : $PORT_5000"
else
    echo "   ❌ Port 5000 non ouvert"
fi

echo ""

# 4. Tester localhost
echo "🧪 4. Test connexion localhost :"
if curl -s -I http://localhost:3000 >/dev/null 2>&1; then
    echo "   ✅ http://localhost:3000 accessible"
else
    echo "   ❌ http://localhost:3000 inaccessible"
fi

if curl -s http://localhost:5000/api/health >/dev/null 2>&1; then
    echo "   ✅ http://localhost:5000/api/health accessible"
else
    echo "   ❌ http://localhost:5000/api/health inaccessible"
fi

echo ""

# 5. Tester l'accès IP
if [ ! -z "$IP_WIFI" ]; then
    echo "🌐 5. Test connexion via IP WiFi ($IP_WIFI) :"
    if curl -s -I --max-time 3 http://$IP_WIFI:3000 >/dev/null 2>&1; then
        echo "   ✅ http://$IP_WIFI:3000 accessible"
    else
        echo "   ❌ http://$IP_WIFI:3000 inaccessible"
    fi
    
    if curl -s --max-time 3 http://$IP_WIFI:5000/api/health >/dev/null 2>&1; then
        echo "   ✅ http://$IP_WIFI:5000/api/health accessible"
    else
        echo "   ❌ http://$IP_WIFI:5000/api/health inaccessible"
    fi
fi

echo ""

# 6. Vérifier le pare-feu
echo "🔒 6. État du pare-feu :"
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(sudo ufw status 2>/dev/null | grep -E "Status:|3000|5000")
    if [ ! -z "$UFW_STATUS" ]; then
        echo "$UFW_STATUS"
    else
        echo "   ℹ️  UFW installé mais statut non disponible"
    fi
else
    echo "   ℹ️  UFW non installé"
fi

echo ""

# 7. Vérifier la configuration Vite
echo "📝 7. Configuration Vite :"
if grep -q "host: '0.0.0.0'" frontend/vite.config.ts; then
    echo "   ✅ vite.config.ts : host configuré sur 0.0.0.0"
else
    echo "   ❌ vite.config.ts : host NON configuré"
fi

echo ""

# 8. Vérifier la configuration backend
echo "📝 8. Configuration Backend :"
if grep -q "HOST = '0.0.0.0'" backend/src/server.ts; then
    echo "   ✅ server.ts : HOST configuré sur 0.0.0.0"
else
    echo "   ❌ server.ts : HOST NON configuré"
fi

echo ""

# 9. Recommandations
echo "💡 9. Actions recommandées :"
echo ""

if [ -z "$FRONTEND_PID" ] || [ -z "$BACKEND_PID" ]; then
    echo "   🔧 Démarrer les serveurs :"
    echo "      ./start-dev.sh"
    echo ""
fi

if [ ! -z "$IP_WIFI" ]; then
    echo "   📱 URL pour mobile (WiFi) :"
    echo "      http://$IP_WIFI:3000"
    echo ""
    
    echo "   🧪 Test depuis votre PC :"
    echo "      curl -I http://$IP_WIFI:3000"
    echo ""
fi

echo "   📱 Sur votre téléphone :"
echo "      1. Vérifiez que vous êtes sur le MÊME réseau WiFi"
echo "      2. Ouvrez le navigateur mobile"
echo "      3. Tapez l'URL complète avec http://"
echo "      4. Attendez 5-10 secondes"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Diagnostic terminé"
echo ""
