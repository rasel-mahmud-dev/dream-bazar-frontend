#!/usr/bin/env bash
set -e

# ==============================================================================
# Clean & Reset Script for Dream Bazar MongoDB
# Wipes database volume and triggers a clean re-initialization with Flipkart catalog
# ==============================================================================

echo "🔄 [1/4] Stopping MongoDB container..."
docker compose stop mongodb 2>/dev/null || true
docker compose rm -f mongodb 2>/dev/null || true

echo "🗑️  [2/4] Wiping MongoDB ./db directory and volume..."
if [ -d "./db" ]; then
    echo "   Removing local ./db directory..."
    rm -rf ./db 2>/dev/null || sudo rm -rf ./db || true
fi

VOLUMES=$(docker volume ls -q | grep "mongodb_data" || true)
if [ -n "$VOLUMES" ]; then
    for v in $VOLUMES; do
        echo "   Removing legacy volume $v"
        docker volume rm -f "$v" 2>/dev/null || true
    done
fi

mkdir -p ./db

echo "🚀 [3/4] Starting fresh MongoDB container with init scripts..."
docker compose up -d mongodb

echo "⏳ [4/4] Waiting for MongoDB healthcheck to pass..."
COUNT=0
MAX=30
until [ "$(docker inspect -f '{{.State.Health.Status}}' dream-bazar-mongodb 2>/dev/null)" = "healthy" ] || [ $COUNT -ge $MAX ]; do
    sleep 1
    COUNT=$((COUNT + 1))
    printf "."
done
echo ""

if [ "$(docker inspect -f '{{.State.Health.Status}}' dream-bazar-mongodb 2>/dev/null)" = "healthy" ]; then
    echo "✅ MongoDB is healthy and initialized with Flipkart products!"
else
    echo "⚠️  MongoDB started, checking logs:"
    docker compose logs mongodb --tail=20
fi
