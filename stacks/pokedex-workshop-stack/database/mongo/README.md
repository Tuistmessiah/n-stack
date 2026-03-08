# Database module — MongoDB

Standalone MongoDB 7 with custom init and migration.

```bash
docker compose -f docker-compose.mongo.yml up --build
```

- Port: `27017`
- Init: `init-mongo.js` (teams, pokemon collections)
- Optional migration: `migration-mongo.js` (battle_results)
