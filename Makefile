.PHONY: all start dev stop down restart clean clean-db logs logs-db logs-server logs-client ps sync-products sync-products-all sync-query import-sheet

PYTHON_MCP := /Users/rasel/Documents/products_store_mcp/.venv/bin/python3

all: start

start:
	docker compose up -d --build

dev:
	docker compose up --build

stop:
	docker compose down

down:
	docker compose down

restart:
	docker compose down
	docker compose up -d --build

sync-products:
	$(PYTHON_MCP) scripts/sync_mcp_products.py

sync-products-all:
	$(PYTHON_MCP) scripts/sync_mcp_products.py --all

sync-query:
	$(PYTHON_MCP) scripts/sync_mcp_products.py --query "$(q)"

import-sheet:
	$(PYTHON_MCP) scripts/sync_mcp_products.py --import-sheet "$(sheet)"

clean-db:
	@bash ./scripts/clean-db.sh

clean:
	@echo "Stopping all services and resetting database volume..."
	docker compose down -v
	@bash ./scripts/clean-db.sh

logs:
	docker compose logs -f

logs-db:
	docker compose logs -f mongodb

logs-server:
	docker compose logs -f server

logs-client:
	docker compose logs -f client

ps:
	docker compose ps

