# Frontend module

Vite React app, built and served with nginx.

```bash
docker compose -f docker-compose.fe.yml up --build
```

- App: http://localhost:3000  
- Set `VITE_API_URL` at build time if API is not at `http://localhost:3002`.
