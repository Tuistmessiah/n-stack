# Pokémon Battle Arena — Workshop Stack

Modular full-stack Pokémon team manager & battle arena for DevOps training. Each module is self-contained with its own `Dockerfile` and `docker-compose.<module>.yml`.

## Quick start

```bash
# Clone and run full stack (MongoDB)
cp .env.example .env
docker compose up --build -d

# Full stack with PostgreSQL
docker compose -f docker-compose.pg.yml up --build -d
```

- **Frontend:** http://localhost:3000  
- **API:** http://localhost:3002  
- **Mongo:** 27017 / **Postgres:** 5432  

## Module independence

Each module runs on its own:

```bash
# FE only (needs API at localhost:3002 for data)
cd frontend && docker compose -f docker-compose.fe.yml up --build

# API + DB only (Mongo)
cd api && docker compose -f docker-compose.api.yml up --build

# API + Postgres
docker compose -f api/docker-compose.api.pg.yml up --build

# Mongo only
cd database/mongo && docker compose -f docker-compose.mongo.yml up --build

# Postgres only
cd database/postgres && docker compose -f docker-compose.pg.yml up --build
```

## Layout

- `docker-compose.yml` — full stack (default MongoDB)
- `docker-compose.pg.yml` — full stack with PostgreSQL
- `database/mongo` — MongoDB 7 + init/migration
- `database/postgres` — PostgreSQL 16 + init/migration
- `frontend` — Vite React → nginx:alpine
- `api` — Node 20 Express, Mongoose (mongo) / Prisma (postgres)

Swap modules by replacing a folder and running `docker compose up` again; only changed images rebuild.
