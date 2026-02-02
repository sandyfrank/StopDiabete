#!/bin/bash

# Script d'installation des Git Hooks pour StopDiabète

echo "🔧 Installation des Git Hooks..."
echo ""

# Copier le pre-commit hook
if [ -f ".github/hooks/pre-commit" ]; then
    cp .github/hooks/pre-commit .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo "✅ Pre-commit hook installé"
else
    echo "❌ Fichier .github/hooks/pre-commit introuvable"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Git Hooks installés avec succès !"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Le hook pre-commit vérifiera :"
echo "  • Absence de console.log"
echo "  • Absence de données sensibles"
echo "  • Taille des fichiers"
echo "  • Compilation TypeScript"
echo ""
echo "Pour désactiver temporairement :"
echo "  git commit --no-verify"
echo ""
