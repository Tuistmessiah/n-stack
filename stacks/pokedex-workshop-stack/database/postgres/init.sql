-- Run at first container start
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pokemon (
  id SERIAL PRIMARY KEY,
  species_id INTEGER NOT NULL,
  team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
  nickname VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pokemon_team_id ON pokemon(team_id);
CREATE INDEX IF NOT EXISTS idx_pokemon_species_id ON pokemon(species_id);

CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  "passwordHash" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "CaughtPokemon" (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "speciesId" INTEGER NOT NULL,
  nickname VARCHAR(255),
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_caught_user ON "CaughtPokemon"("userId");
