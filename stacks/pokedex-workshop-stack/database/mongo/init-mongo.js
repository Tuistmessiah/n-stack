// Run at first container start (docker-entrypoint-initdb.d)
db = db.getSiblingDB(db.getName());
db.createCollection('teams');
db.createCollection('pokemon');
db.createCollection('users');
db.createCollection('caughtpokemons');
db.teams.createIndex({ name: 1 }, { unique: true });
db.pokemon.createIndex({ speciesId: 1 });
db.users.createIndex({ email: 1 }, { unique: true });
db.caughtpokemons.createIndex({ userId: 1 });
