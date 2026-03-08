# Database module — PostgreSQL

Standalone PostgreSQL 16 with init and migration.

```bash
docker compose -f docker-compose.pg.yml up --build
```

- Port: `5432`
- Init: `init.sql` (teams, pokemon tables)
- Optional migration: `migration-pg.sql` (battle_results)

Env: `PG_USER`, `PG_PASSWORD`, `PG_DATABASE` (see root `.env.example`).
