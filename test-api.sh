#!/bin/bash

# Test du healthcheck de l'API

API_URL="${API_URL:-http://localhost:5000/api}"

echo "🔍 Test du healthcheck API..."
echo "URL: $API_URL/health/full"
echo ""

# Test simple health
echo "1️⃣  Test endpoint simple (/health):"
curl -s "$API_URL/health" | python3 -m json.tool 2>/dev/null || echo "❌ Échec"
echo ""

# Test full health avec DB
echo "2️⃣  Test endpoint complet avec DB (/health/full):"
curl -s "$API_URL/health/full" | python3 -m json.tool 2>/dev/null || echo "❌ Échec"
echo ""

# Test inscription
echo "3️⃣  Test inscription:"
RANDOM_EMAIL="test_$(date +%s)@example.com"
curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$RANDOM_EMAIL\",\"password\":\"Test1234\",\"firstName\":\"Test\",\"lastName\":\"User\",\"hasFamilyHistory\":false}" \
  | python3 -m json.tool 2>/dev/null || echo "❌ Échec"
echo ""

# Test connexion
echo "4️⃣  Test connexion:"
curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$RANDOM_EMAIL\",\"password\":\"Test1234\"}" \
  | python3 -m json.tool 2>/dev/null || echo "❌ Échec"
echo ""

echo "✅ Tests terminés"
