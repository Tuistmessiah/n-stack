/**
 * Seed the DB with the first 3 Pokémon from PokéAPI (https://pokeapi.co/).
 * Creates a seed user if needed, then adds Bulbasaur, Ivysaur, Venusaur to their pokedex.
 *
 * Run from API directory with DB available:
 *   node scripts/seed-pokedex.js
 * Or in Docker:
 *   docker compose exec api node scripts/seed-pokedex.js
 */

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const SEED_EMAIL = 'seed@pokedex.local';
const SEED_PASSWORD = 'seedpassword';
const FIRST_N = 3;

async function fetchPokemon(ids) {
  const results = [];
  for (const id of ids) {
    const res = await fetch(`${POKEAPI_BASE}/pokemon/${id}`);
    if (!res.ok) throw new Error(`PokéAPI failed for ${id}: ${res.status}`);
    const data = await res.json();
    results.push({ speciesId: data.id, name: data.name });
  }
  return results;
}

async function seedMongo() {
  const { initMongo, User, CaughtPokemon } = await import('../models/mongo/index.js');
  const auth = await import('../lib/auth.js');
  const host = process.env.DB_HOST || 'localhost';
  await initMongo(host);

  let user = await User.findOne({ email: SEED_EMAIL });
  if (!user) {
    const passwordHash = await auth.hashPassword(SEED_PASSWORD);
    user = await User.create({ email: SEED_EMAIL, passwordHash });
    console.log('Created seed user:', user.email);
  } else {
    console.log('Using existing seed user:', user.email);
  }

  const userId = user._id;
  const ids = [1, 2, 3].slice(0, FIRST_N);
  const pokemons = await fetchPokemon(ids);

  for (const p of pokemons) {
    const existing = await CaughtPokemon.findOne({ userId, speciesId: p.speciesId });
    if (existing) {
      console.log(`  #${p.speciesId} ${p.name} already in pokedex, skip`);
      continue;
    }
    await CaughtPokemon.create({
      userId,
      speciesId: p.speciesId,
      nickname: p.name,
    });
    console.log(`  Added #${p.speciesId} ${p.name}`);
  }

  console.log('Mongo seed done.');
  process.exit(0);
}

async function seedPostgres() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.PG_USER || 'pokedex';
  const password = process.env.PG_PASSWORD || 'pokedex_secret';
  const db = process.env.PG_DATABASE || 'pokedex';
  process.env.DATABASE_URL = `postgresql://${user}:${password}@${host}:5432/${db}`;

  const { PrismaClient } = await import('@prisma/client');
  const auth = await import('../lib/auth.js');
  const prisma = new PrismaClient();
  await prisma.$connect();

  let dbUser = await prisma.user.findUnique({ where: { email: SEED_EMAIL } });
  if (!dbUser) {
    const passwordHash = await auth.hashPassword(SEED_PASSWORD);
    dbUser = await prisma.user.create({
      data: { email: SEED_EMAIL, passwordHash },
    });
    console.log('Created seed user:', dbUser.email);
  } else {
    console.log('Using existing seed user:', dbUser.email);
  }

  const ids = [1, 2, 3].slice(0, FIRST_N);
  const pokemons = await fetchPokemon(ids);

  for (const p of pokemons) {
    const existing = await prisma.caughtPokemon.findFirst({
      where: { userId: dbUser.id, speciesId: p.speciesId },
    });
    if (existing) {
      console.log(`  #${p.speciesId} ${p.name} already in pokedex, skip`);
      continue;
    }
    await prisma.caughtPokemon.create({
      data: {
        userId: dbUser.id,
        speciesId: p.speciesId,
        nickname: p.name,
      },
    });
    console.log(`  Added #${p.speciesId} ${p.name}`);
  }

  await prisma.$disconnect();
  console.log('Postgres seed done.');
  process.exit(0);
}

const DB_TYPE = process.env.DB_TYPE || 'mongo';
console.log(`Seeding pokedex from PokéAPI (first ${FIRST_N} Pokémon), DB=${DB_TYPE}...`);

if (DB_TYPE === 'postgres') {
  seedPostgres().catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  seedMongo().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
