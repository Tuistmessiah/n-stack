import express from 'express';
import cors from 'cors';

const DB_TYPE = process.env.DB_TYPE || 'mongo';
const DB_HOST = process.env.DB_HOST || 'localhost';
const PORT = Number(process.env.PORT) || 3002;

let teamsRouter;
let authRouter;
let pokedexRouter;
let dbReady;

if (DB_TYPE === 'postgres') {
  const user = process.env.PG_USER || 'pokedex';
  const password = process.env.PG_PASSWORD || 'pokedex_secret';
  const db = process.env.PG_DATABASE || 'pokedex';

  process.env.DATABASE_URL = `postgresql://${user}:${password}@${DB_HOST}:5432/${db}`;
  const { initPostgres, getTeamsRouter, getAuthRouter, getPokedexRouter } = await import('./models/postgres/index.js');
  dbReady = initPostgres();
  teamsRouter = getTeamsRouter();
  authRouter = getAuthRouter();
  pokedexRouter = getPokedexRouter();
} else {
  const { initMongo, getTeamsRouter, getAuthRouter, getPokedexRouter } = await import('./models/mongo/index.js');
  dbReady = initMongo(DB_HOST);
  teamsRouter = getTeamsRouter();
  authRouter = getAuthRouter();
  pokedexRouter = getPokedexRouter();
}

const app = express();
// Allow frontend origin when deployed (e.g. VPS). Set CORS_ORIGIN to your frontend URL, or comma-separated list.
const corsOrigin = (process.env.CORS_ORIGIN || '').trim();
const corsOptions = corsOrigin
  ? { origin: corsOrigin.split(',').map((o) => o.trim()).filter(Boolean), credentials: true }
  : {}; // empty = allow all (local dev)
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ name: 'Pokedex API', health: '/api/health', teams: '/api/teams' });
});

app.use('/api/teams', teamsRouter);
app.use('/api/auth', authRouter);
app.use('/api/pokedex', pokedexRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, db: DB_TYPE });
});

await dbReady;
app.listen(PORT, () => {
  console.log(`Pokedex API listening on ${PORT} (DB: ${DB_TYPE})`);
});
