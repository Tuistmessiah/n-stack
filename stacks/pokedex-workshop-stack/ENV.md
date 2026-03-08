# Environment variables

Copy `.env.example` to `.env` and adjust. (No `#` comments in `.env` if your loader is strict.)

| Variable | Description |
|----------|-------------|
| `DB_TYPE` | `mongo` or `postgres` |
| `PORT` | API port (default 3002) |
| `JWT_SECRET` | Secret for JWT; set a long random value in production |
| `DB_HOST` | Database host (e.g. `database` in compose, `localhost` when running API alone) |
| `VITE_API_URL` | Full API URL for the frontend (build-time). On a VPS use e.g. `http://YOUR_SERVER_IP:3002` |
| `CORS_ORIGIN` | Allowed frontend origin(s), comma-separated. On a VPS use e.g. `http://YOUR_SERVER_IP:3000`. Empty = allow all (dev) |
| `MONGO_*` / `PG_*` | Database connection settings |
