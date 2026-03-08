#!/bin/sh
set -e
# Give the database container a moment to accept connections
echo "Waiting for database..."
sleep 5
# Seed pokedex from PokéAPI (idempotent; skips existing)
node scripts/seed-pokedex.js || true
exec node server.js
