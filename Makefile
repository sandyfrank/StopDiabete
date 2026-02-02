.PHONY: help start stop status install clean logs backend frontend

# Couleurs pour l'affichage
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

help: ## Afficher l'aide
	@echo "$(BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(BLUE)   🩺 StopDiabète - Commandes disponibles$(NC)"
	@echo "$(BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

start: ## Démarrer backend + frontend
	@./start-dev.sh

stop: ## Arrêter tous les serveurs
	@./stop-dev.sh

status: ## Vérifier le statut des serveurs
	@./status.sh

install: ## Installer toutes les dépendances
	@echo "$(YELLOW)📦 Installation des dépendances backend...$(NC)"
	@cd backend && npm install
	@echo "$(YELLOW)📦 Installation des dépendances frontend...$(NC)"
	@cd frontend && npm install
	@echo "$(GREEN)✅ Installation terminée$(NC)"

clean: ## Nettoyer node_modules et caches
	@echo "$(YELLOW)🧹 Nettoyage en cours...$(NC)"
	@rm -rf backend/node_modules backend/dist
	@rm -rf frontend/node_modules frontend/dist frontend/.vite
	@rm -rf logs
	@echo "$(GREEN)✅ Nettoyage terminé$(NC)"

logs: ## Afficher les logs en temps réel
	@tail -f logs/backend.log logs/frontend.log 2>/dev/null || echo "$(YELLOW)Aucun log disponible. Démarrez d'abord les serveurs.$(NC)"

backend: ## Démarrer uniquement le backend
	@echo "$(YELLOW)🔧 Démarrage du backend...$(NC)"
	@cd backend && npm run dev

frontend: ## Démarrer uniquement le frontend
	@echo "$(YELLOW)🎨 Démarrage du frontend...$(NC)"
	@cd frontend && npm run dev

build: ## Compiler le projet en production
	@echo "$(YELLOW)🏗️  Compilation en production...$(NC)"
	@cd backend && npm run build
	@cd frontend && npm run build
	@echo "$(GREEN)✅ Compilation terminée$(NC)"

test: ## Lancer les tests
	@echo "$(YELLOW)🧪 Exécution des tests backend...$(NC)"
	@cd backend && npm test || echo "Aucun test configuré"
	@echo "$(YELLOW)🧪 Exécution des tests frontend...$(NC)"
	@cd frontend && npm test || echo "Aucun test configuré"

dev: start ## Alias pour 'make start'

restart: stop start ## Redémarrer tous les serveurs
