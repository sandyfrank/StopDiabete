# 🩺 StopDiabète - Scripts de Développement

## 🚀 Démarrage rapide

### Lancer l'application en développement

```bash
./start-dev.sh
```

Ce script va :
- ✅ Vérifier et installer les dépendances si nécessaire
- ✅ Démarrer le serveur backend (Node.js/Express) sur le port 5000
- ✅ Démarrer le serveur frontend (Vite/React) sur le port 3000
- ✅ Afficher les logs en temps réel
- ✅ Créer les fichiers de logs dans le dossier `logs/`

### Arrêter l'application

```bash
# Méthode 1 : Dans le terminal où start-dev.sh est lancé
Ctrl + C

# Méthode 2 : Depuis un autre terminal
./stop-dev.sh
```

## 📍 URLs de l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000/api
- **Health Check** : http://localhost:5000/api/health

## 📝 Logs

Les logs sont automatiquement créés dans le dossier `logs/` :
- `logs/backend.log` - Logs du serveur backend
- `logs/frontend.log` - Logs du serveur frontend

Pour voir les logs en temps réel :

```bash
# Backend
tail -f logs/backend.log

# Frontend
tail -f logs/frontend.log

# Les deux en même temps
tail -f logs/backend.log logs/frontend.log
```

## 🛠️ Développement manuel

Si vous préférez lancer les serveurs manuellement :

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

## 🔧 Dépannage

### Les ports sont déjà utilisés

```bash
# Vérifier ce qui utilise les ports
lsof -i :3000
lsof -i :5000

# Libérer les ports
./stop-dev.sh
```

### Problèmes de dépendances

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Nettoyer le cache Vite

```bash
cd frontend
rm -rf node_modules/.vite .vite
npm run dev
```

## 📦 Structure du projet

```
StopDiabete/
├── backend/           # Serveur Node.js/Express
│   ├── src/          # Code source TypeScript
│   └── package.json
├── frontend/          # Application React/Vite
│   ├── src/          # Code source TypeScript/React
│   └── package.json
├── database/          # Schémas PostgreSQL
├── logs/             # Logs des serveurs (créé automatiquement)
├── start-dev.sh      # 🚀 Script de démarrage
└── stop-dev.sh       # 🛑 Script d'arrêt
```

## 💡 Astuces

1. **Rechargement automatique** : Les deux serveurs supportent le hot-reload
   - Frontend : Rechargement instantané des changements React
   - Backend : Redémarrage automatique avec nodemon

2. **Debug** : Pour voir plus de détails, consultez les logs
   ```bash
   cat logs/backend.log
   cat logs/frontend.log
   ```

3. **Variables d'environnement** :
   - Backend : `backend/.env`
   - Frontend : `frontend/.env`

## 🔒 Base de données

Assurez-vous que PostgreSQL est en cours d'exécution :

```bash
# Vérifier le statut
sudo systemctl status postgresql

# Démarrer si nécessaire
sudo systemctl start postgresql
```

Configuration par défaut :
- **Port** : 5433
- **Database** : stopdiabete
- **User** : postgres
- **Password** : stopdiabete2026

## 📚 Documentation complète

Pour plus de détails, consultez :
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Architecture](./docs/architecture.md)

---

🩺 **StopDiabète** - Prévention et gestion du diabète
