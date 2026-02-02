# 🚀 Guide de Démarrage Rapide - StopDiabète

## ⚡ Démarrage en 30 secondes

```bash
# 1. Démarrer l'application
./start-dev.sh

# 2. Ouvrir dans le navigateur
# Frontend : http://localhost:3000
# Backend : http://localhost:5000/api
```

C'est tout ! 🎉

---

## 📱 Tester les Nouvelles Pages

### Pages Informations (maintenant disponibles)

1. **À propos** : http://localhost:3000/about
   - Mission et valeurs
   - Fonctionnalités
   - Références médicales

2. **Confidentialité** : http://localhost:3000/privacy
   - Politique RGPD
   - Données collectées
   - Vos droits

3. **Conditions d'utilisation** : http://localhost:3000/terms
   - CGU complètes
   - Disclaimer médical
   - Responsabilités

4. **Contact** : http://localhost:3000/contact
   - Formulaire fonctionnel
   - Coordonnées
   - Temps de réponse

### Tester la Responsivité Mobile

#### Option 1 : DevTools Chrome
1. Ouvrir http://localhost:3000
2. Appuyer sur `F12` (DevTools)
3. Cliquer sur l'icône 📱 (Toggle device toolbar)
4. Choisir iPhone, Samsung, iPad, etc.

#### Option 2 : Redimensionner le navigateur
1. Ouvrir http://localhost:3000
2. Réduire la largeur de la fenêtre
3. Observer les breakpoints :
   - < 640px : Mobile
   - 640-768px : Tablet portrait
   - 768-1024px : Tablet landscape
   - > 1024px : Desktop

---

## 🔐 Tester l'Application Complète

### 1. Inscription
```
URL : http://localhost:3000/register
Remplir : Nom, Email, Mot de passe, Confirmer
```

### 2. Connexion
```
URL : http://localhost:3000/login
Utiliser les identifiants créés
```

### 3. Dashboard
```
URL : http://localhost:3000/dashboard
Voir : Statistiques, graphiques, actions rapides
```

### 4. Suivi Glycémie
```
URL : http://localhost:3000/glucose
Actions :
- Ajouter une mesure
- Voir l'historique
- Observer le code couleur
```

### 5. Test de Risque
```
URL : http://localhost:3000/risk-assessment
Étapes :
1. Informations générales
2. Mesures corporelles (IMC calculé)
3. Antécédents médicaux
4. Habitudes de vie
Résultat : Rapport PDF imprimable
```

### 6. Éducation
```
URL : http://localhost:3000/education
7 sections à explorer :
- Généralités
- Type 1 & 2
- Complications
- Nutrition
- Etc.
```

---

## 🛠️ Commandes Utiles

### Commandes Principales
```bash
# Démarrer
./start-dev.sh
# ou
make start

# Arrêter
./stop-dev.sh
# ou
make stop

# Statut
./status.sh
# ou
make status

# Voir les logs
make logs
# ou
tail -f logs/backend.log
tail -f logs/frontend.log

# Aide
./help.sh
# ou
make help
```

### Résolution de Problèmes

#### Port déjà utilisé
```bash
# Backend (5000)
lsof -ti:5000 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9

# Puis redémarrer
./start-dev.sh
```

#### Réinstaller les dépendances
```bash
make clean
make install
```

#### Erreur PostgreSQL
```bash
# Vérifier que PostgreSQL tourne
sudo systemctl status postgresql

# Démarrer si arrêté
sudo systemctl start postgresql

# Vérifier la base de données
psql -U postgres -d stopdiabete -c "\dt"
```

#### Erreur module manquant
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

---

## 📋 Checklist Mobile Testing

### ✅ Pages à Tester

#### Page d'Accueil
- [ ] Hero section lisible
- [ ] CTA bien visible
- [ ] Sections s'empilent verticalement
- [ ] Images s'adaptent

#### Navigation
- [ ] Menu hamburger fonctionne
- [ ] Liens cliquables (taille ≥ 44px)
- [ ] Footer s'empile en 1 colonne
- [ ] Scroll fluide

#### Formulaires
- [ ] Champs de texte bien dimensionnés
- [ ] Boutons faciles à cliquer
- [ ] Clavier mobile s'ouvre correctement
- [ ] Validation fonctionne

#### Dashboard
- [ ] Cartes s'empilent en 1 colonne
- [ ] Graphiques responsive
- [ ] Statistiques lisibles
- [ ] Boutons accessibles

#### Pages Informations
- [ ] Texte lisible (taille adaptée)
- [ ] Sections bien espacées
- [ ] Grids s'adaptent (1 col → 2 cols → 4 cols)
- [ ] Icônes bien proportionnées

#### Formulaire Contact
- [ ] Tous les champs accessibles
- [ ] Dropdown fonctionne
- [ ] Textarea suffisamment grande
- [ ] Message de succès visible

---

## 🎯 URLs Complètes

### Pages Publiques
- http://localhost:3000/ (Accueil)
- http://localhost:3000/login (Connexion)
- http://localhost:3000/register (Inscription)
- http://localhost:3000/education (Éducation)
- http://localhost:3000/about (À propos) ✨ NEW
- http://localhost:3000/privacy (Confidentialité) ✨ NEW
- http://localhost:3000/terms (Conditions) ✨ NEW
- http://localhost:3000/contact (Contact) ✨ NEW

### Pages Protégées (nécessite connexion)
- http://localhost:3000/dashboard
- http://localhost:3000/glucose
- http://localhost:3000/risk-assessment
- http://localhost:3000/profile

### API Endpoints
- http://localhost:5000/api/health (Health check)
- http://localhost:5000/api/auth/register (POST)
- http://localhost:5000/api/auth/login (POST)
- http://localhost:5000/api/glucose (GET/POST)
- http://localhost:5000/api/risk (GET/POST)

---

## 📊 Vérifications Rapides

### Backend OK
```bash
curl http://localhost:5000/api/health
# Réponse : {"status":"healthy","timestamp":"..."}
```

### Frontend OK
```bash
curl -I http://localhost:3000
# Réponse : HTTP/1.1 200 OK
```

### Base de Données OK
```bash
psql -U postgres -d stopdiabete -c "SELECT COUNT(*) FROM users;"
# Devrait retourner un nombre
```

---

## 🚀 Déploiement Hostinger

### Quand vous êtes prêt

1. **Lire le guide complet**
   ```bash
   cat DEPLOYMENT.md
   ```

2. **Build de production**
   ```bash
   cd frontend
   npm run build
   # Résultat dans frontend/dist/

   cd ../backend
   npm run build
   # Résultat dans backend/dist/
   ```

3. **Tester le build localement**
   ```bash
   cd frontend/dist
   npx serve -s . -p 3000

   cd ../../backend
   NODE_ENV=production node dist/server.js
   ```

4. **Suivre DEPLOYMENT.md**
   - Configuration .env
   - Upload SFTP/SSH
   - Configuration PostgreSQL
   - Configuration PM2
   - Configuration Nginx/Apache
   - Tests finaux

---

## 💡 Astuces Développement

### Hot Reload
- Modifications frontend → Auto-refresh navigateur
- Modifications backend → Redémarrage automatique nodemon

### Debug Console
- `F12` dans le navigateur
- Onglet Console : erreurs JavaScript
- Onglet Network : requêtes API
- Onglet Application : localStorage, JWT token

### Logs en Temps Réel
```bash
# Terminal 1 : Backend logs
tail -f logs/backend.log

# Terminal 2 : Frontend logs
tail -f logs/frontend.log
```

### Tester l'API avec curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test123!"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'

# Profile (avec token)
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📞 Besoin d'Aide ?

### Documentation
- **README.md** : Vue d'ensemble
- **DEPLOYMENT.md** : Guide déploiement
- **SUMMARY.md** : Récapitulatif complet
- **DEV_SCRIPTS_README.md** : Scripts automation

### Commande Aide
```bash
./help.sh
# Affiche toutes les commandes disponibles
```

### Vérification Complète
```bash
./status.sh
# Affiche l'état de tous les services
```

---

## ✨ Nouvelles Fonctionnalités (v1.0.0)

### Pages Informations ✨
- ✅ À propos : Mission, valeurs, fonctionnalités
- ✅ Confidentialité : RGPD complet, droits utilisateurs
- ✅ Conditions : CGU + disclaimer médical
- ✅ Contact : Formulaire fonctionnel

### Responsive Mobile 📱
- ✅ 100% responsive sur tous les écrans
- ✅ Breakpoints Tailwind (sm, md, lg, xl)
- ✅ Touch-friendly (zones tactiles ≥ 44px)
- ✅ Textes adaptés (text-sm sm:text-base)
- ✅ Grids adaptatifs (1 col → 2 cols → 4 cols)
- ✅ Menu hamburger mobile

### Documentation 📚
- ✅ DEPLOYMENT.md : Guide Hostinger complet
- ✅ SUMMARY.md : Récapitulatif projet
- ✅ QUICKSTART.md : Ce guide !
- ✅ README.md : Documentation complète

### Automation 🤖
- ✅ Scripts bash (start, stop, status, help)
- ✅ Makefile avec 12 targets
- ✅ Logs automatiques
- ✅ Health checks

---

**Version** : 1.0.0  
**Date** : 2 février 2026  
**Statut** : ✅ Production Ready  

🎉 **Bon développement et bon déploiement !**
