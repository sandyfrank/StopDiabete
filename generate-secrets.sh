#!/bin/bash

# Script de génération des secrets pour StopDiabète

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔑 Génération des Secrets - StopDiabète"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Générer JWT Secret
echo "🔐 Génération du JWT Secret..."
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
echo ""
echo "PROD_JWT_SECRET:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "$JWT_SECRET"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  COPIEZ cette valeur et ajoutez-la comme secret GitHub :"
echo "   Name: PROD_JWT_SECRET"
echo "   Value: [la chaîne ci-dessus]"
echo ""

# Générer un mot de passe fort (optionnel pour FTP)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔒 Mot de passe fort suggéré (optionnel) :"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
STRONG_PASSWORD=$(openssl rand -base64 24 | tr -d '+/=' | head -c 20)
echo "$STRONG_PASSWORD"
echo ""
echo "💡 Utilisez ce mot de passe pour créer un compte FTP dédié"
echo ""

# Récapitulatif
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 PROCHAINES ÉTAPES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Connectez-vous à Hostinger hPanel"
echo "2. Récupérez vos informations FTP/SSH"
echo "3. Ajoutez tous les secrets sur GitHub :"
echo "   https://github.com/sandyfrank/StopDiabete/settings/secrets/actions"
echo ""
echo "Liste des secrets à configurer :"
echo "  ✅ FTP_SERVER"
echo "  ✅ FTP_USERNAME"
echo "  ✅ FTP_PASSWORD"
echo "  ✅ SSH_HOST"
echo "  ✅ SSH_USERNAME"
echo "  ✅ SSH_PASSWORD"
echo "  ✅ PRODUCTION_API_URL"
echo "  ✅ PROD_JWT_SECRET (généré ci-dessus)"
echo ""
echo "📖 Guide complet : HOSTINGER_FTP_SETUP.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
