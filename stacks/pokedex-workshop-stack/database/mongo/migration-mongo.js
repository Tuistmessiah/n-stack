// Optional migration script. Run: docker exec -it <mongo-container> mongosh pokedex --file /migrations/migration-mongo.js
// Adds battle_results collection for arena module
db = db.getSiblingDB('pokedex');
if (!db.getCollectionNames().includes('battle_results')) {
  db.createCollection('battle_results');
  db.battle_results.createIndex({ createdAt: -1 });
  print('Created battle_results collection');
}
