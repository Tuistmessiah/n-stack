-- Optional migration. Run: docker exec -i <pg-container> psql -U pokedex -d pokedex < migration-pg.sql
-- Adds battle_results for arena module
CREATE TABLE IF NOT EXISTS battle_results (
  id SERIAL PRIMARY KEY,
  winner_team_id INTEGER REFERENCES teams(id),
  loser_team_id INTEGER REFERENCES teams(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_battle_results_created_at ON battle_results(created_at DESC);
