# API module

Node 20 Express API. Uses MongoDB (Mongoose) or PostgreSQL (Prisma) via `DB_TYPE`.

```bash
# API + MongoDB (default)
docker compose -f docker-compose.api.yml up --build

# API + PostgreSQL (from repo root)
docker compose -f api/docker-compose.api.pg.yml up --build
```

- API: http://localhost:3002  
- Health: `GET /api/health`  
- Teams: `GET/POST /api/teams`

Env: `DB_TYPE`, `DB_HOST`, `PORT`; for Postgres also `PG_USER`, `PG_PASSWORD`, `PG_DATABASE`.

**Seed pokedex from PokéAPI (first 3 Pokémon):**

```bash
# With full stack running (Mongo)
docker compose exec api npm run seed

# Or from host (DB must be reachable)
cd api && DB_HOST=localhost node scripts/seed-pokedex.js
```

Creates user `seed@pokedex.local` / `seedpassword` and adds Bulbasaur, Ivysaur, Venusaur to their pokedex. Log in with that account to see them.
