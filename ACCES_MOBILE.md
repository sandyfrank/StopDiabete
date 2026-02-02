# 📱 ACCÈS MOBILE - StopDiabète

## ✅ SERVEURS DÉMARRÉS

Les serveurs tournent actuellement et sont accessibles !

## 🌐 URLs d'Accès Mobile

### Option 1 : WiFi Principal (Recommandé)
```
http://10.162.144.137:3000
```

### Option 2 : Ethernet
```
http://152.77.193.66:3000
```

## 🔍 RÉSOLUTION DU PROBLÈME HTTPS

### ⚠️ Erreur Commune : "Connexion sécurisée échouée"

Votre navigateur mobile essaie d'utiliser HTTPS au lieu de HTTP.

### ✅ SOLUTION (étape par étape) :

#### 1. **Ouvrez votre navigateur mobile**
   - Chrome, Firefox, Safari, etc.

#### 2. **Tapez EXACTEMENT dans la barre d'adresse :**
   ```
   http://10.162.144.137:3000
   ```
   
   ⚠️ **IMPORTANT :**
   - Commencez par `http://` (PAS `https://`)
   - Ne tapez PAS dans la barre de recherche Google
   - Tapez directement dans la barre d'adresse du navigateur
   - Appuyez sur "Entrée" ou "Aller"

#### 3. **Si le navigateur ajoute automatiquement le 'S' (https) :**

   **Sur Chrome/Edge :**
   1. Tapez `chrome://flags` dans la barre d'adresse
   2. Cherchez "HTTPS-First Mode"
   3. Désactivez cette option
   4. Redémarrez le navigateur
   5. Retapez `http://10.162.144.137:3000`

   **Sur Firefox :**
   1. Tapez `about:config` dans la barre d'adresse
   2. Cherchez `dom.security.https_first`
   3. Mettez à `false`
   4. Retapez `http://10.162.144.137:3000`

   **Sur Safari (iOS) :**
   1. Allez dans Réglages → Safari
   2. Descendez jusqu'à "Avancé"
   3. Désactivez "Forcer HTTPS" si l'option existe
   4. Retapez `http://10.162.144.137:3000`

#### 4. **Alternative : Ajouter une exception de sécurité**
   
   Si le message d'erreur apparaît :
   - Cliquez sur "Avancé" ou "Détails"
   - Cliquez sur "Continuer vers le site" ou "Accepter le risque"

## 🔧 Vérifications Préalables

### Avant de tester sur mobile, assurez-vous que :

✅ **Même réseau WiFi**
- Votre téléphone ET votre PC doivent être sur le **même WiFi**
- Nom du réseau WiFi : Vérifiez que c'est identique

✅ **Serveurs démarrés**
```bash
# Sur votre PC, vérifier :
ss -tlnp | grep -E "(3000|5000)"
# Vous devez voir les ports 3000 et 5000 en écoute
```

✅ **Test depuis le PC**
```bash
# Ces commandes doivent fonctionner :
curl http://10.162.144.137:5000/api/health
curl -I http://10.162.144.137:3000/
```

## 🚀 Redémarrer les Serveurs (si nécessaire)

Si les serveurs ne tournent plus :

```bash
cd /home/kwamouns/Datas/hunting/StopDiabete
./start-dev.sh
```

## 📊 Diagnostic Complet

```bash
# Script de diagnostic
./diagnose-mobile.sh
```

## 🎯 QR Code pour Accès Rapide

Scannez ce QR code avec votre téléphone pour ouvrir directement l'application :

```bash
# Générer le QR code
./generate-qr.sh
```

## 🔒 Pourquoi HTTP et pas HTTPS ?

En **développement local**, nous utilisons HTTP car :
- Pas de certificat SSL nécessaire
- Plus simple pour les tests
- L'application est accessible uniquement sur votre réseau local (sécurisé)

En **production** (Hostinger), l'application utilisera HTTPS avec un certificat SSL valide.

## 📱 Test Final

### Checklist :

1. [ ] PC et mobile sur le même WiFi
2. [ ] Serveurs démarrés (`ss -tlnp | grep 3000`)
3. [ ] URL tapée avec `http://` (pas `https://`)
4. [ ] HTTPS-First Mode désactivé dans le navigateur
5. [ ] Cache navigateur vidé (si nécessaire)

### Si ça fonctionne :

Vous devriez voir la page d'accueil de StopDiabète avec :
- Logo et titre "Prévention & Gestion du Diabète"
- Boutons "Se connecter" et "S'inscrire"
- Navigation fonctionnelle

### Si ça ne fonctionne toujours pas :

```bash
# 1. Vérifier les logs
tail -f logs/frontend.log
tail -f logs/backend.log

# 2. Vérifier le pare-feu
sudo ufw status

# 3. Tester avec un autre téléphone
# ou un autre navigateur mobile
```

## 💡 Conseils Supplémentaires

### Navigation Privée

Essayez en mode incognito/navigation privée :
- Ouvre un nouvel onglet privé
- Tape l'URL `http://10.162.144.137:3000`
- Cela évite les problèmes de cache

### Vider le Cache Mobile

**Chrome Mobile :**
1. Menu (3 points) → Historique
2. Effacer les données de navigation
3. Cache et cookies
4. Effacer

**Safari iOS :**
1. Réglages → Safari
2. Effacer historique et données de site

### Alternative : Utiliser l'IP Ethernet

Si le WiFi ne fonctionne pas, essayez l'autre IP :
```
http://152.77.193.66:3000
```

## 📞 Support

Si le problème persiste après toutes ces étapes :

1. **Vérifier la connexion réseau :**
   ```bash
   ping 10.162.144.137
   # Depuis votre mobile (dans une app Terminal si disponible)
   ```

2. **Regarder les erreurs dans les logs :**
   ```bash
   cat logs/backend.log
   cat logs/frontend.log
   ```

3. **Redémarrer complètement :**
   ```bash
   ./stop-dev.sh
   sleep 5
   ./start-dev.sh
   ```

---

**Dernière vérification** : 2 février 2026  
**Statut** : ✅ Serveurs actifs et accessibles  
**PIDs** : Backend (247122), Frontend (247234)
