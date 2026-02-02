#!/bin/bash
# Génération de QR Code pour accès mobile
# Date : 2 février 2026

IP=$(ip addr show wlp1s0 | grep 'inet ' | awk '{print $2}' | cut -d/ -f1)
URL="http://$IP:3000"

echo "📱 Génération du QR Code pour : $URL"
echo ""

# Vérifier si qrencode est installé
if ! command -v qrencode &> /dev/null; then
    echo "⚠️  qrencode n'est pas installé"
    echo ""
    echo "Installation :"
    echo "   sudo apt install qrencode"
    echo ""
    echo "Ou utilisez un générateur en ligne :"
    echo "   https://www.qr-code-generator.com/"
    echo ""
    echo "URL à encoder : $URL"
    exit 1
fi

# Générer le QR code
qrencode -t ANSIUTF8 "$URL"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 Scannez ce QR code avec votre téléphone"
echo "   Il ouvrira directement : $URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Astuce : La caméra native de votre téléphone"
echo "   peut scanner les QR codes directement !"
echo ""

# Sauvegarder aussi en image PNG
if qrencode -o mobile-qr.png "$URL" 2>/dev/null; then
    echo "✅ QR Code sauvegardé : mobile-qr.png"
    echo "   Vous pouvez l'ouvrir et le montrer à d'autres"
fi

echo ""
