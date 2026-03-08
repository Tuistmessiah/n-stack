import express from 'express';
import mongoose from 'mongoose';
import * as auth from '../../lib/auth.js';

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Team = mongoose.model('Team', TeamSchema);

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);

const CaughtPokemonSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  speciesId: { type: Number, required: true },
  nickname: String,
}, { timestamps: true });

export const CaughtPokemon = mongoose.model('CaughtPokemon', CaughtPokemonSchema);

function getConnectionUri(host) {
  const db = process.env.MONGO_INITDB_DATABASE || 'pokedex';
  return `mongodb://${host}:27017/${db}`;
}

export function initMongo(host) {
  const uri = getConnectionUri(host);
  return mongoose.connect(uri).catch((err) => {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  });
}

export function getTeamsRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const teams = await Team.find().lean();
      res.json(teams);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { name } = req.body || {};
      if (!name) return res.status(400).json({ error: 'name required' });
      const team = await Team.create({ name });
      res.status(201).json(team);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
}

export function requireAuth(req, res, next) {
  const token = auth.getBearerToken(req);
  if (!token) return res.status(401).json({ error: 'Missing or invalid token' });
  auth.verifyToken(token)
    .then((payload) => {
      req.user = { id: payload.userId, email: payload.email };
      next();
    })
    .catch(() => res.status(401).json({ error: 'Invalid or expired token' }));
}

export function getAuthRouter() {
  const router = express.Router();

  router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ error: 'email and password required' });
      const existing = await User.findOne({ email: email.trim().toLowerCase() });
      if (existing) return res.status(409).json({ error: 'Email already registered' });
      const passwordHash = await auth.hashPassword(password);
      const user = await User.create({ email: email.trim().toLowerCase(), passwordHash });
      const token = await auth.createToken({ userId: user._id.toString(), email: user.email });
      res.status(201).json({ token, user: { id: user._id.toString(), email: user.email } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ error: 'email and password required' });
      const user = await User.findOne({ email: email.trim().toLowerCase() });
      if (!user) return res.status(401).json({ error: 'Invalid email or password' });
      const ok = await auth.comparePassword(password, user.passwordHash);
      if (!ok) return res.status(401).json({ error: 'Invalid email or password' });
      const token = await auth.createToken({ userId: user._id.toString(), email: user.email });
      res.json({ token, user: { id: user._id.toString(), email: user.email } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get('/me', requireAuth, (req, res) => {
    res.json(req.user);
  });

  return router;
}

export function getPokedexRouter() {
  const router = express.Router();
  router.use(requireAuth);

  router.get('/', async (req, res) => {
    try {
      const list = await CaughtPokemon.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
      const normalized = list.map(({ _id, ...r }) => ({ id: _id.toString(), ...r }));
      res.json(normalized);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { speciesId, nickname } = req.body || {};
      if (speciesId == null) return res.status(400).json({ error: 'speciesId required' });
      const doc = await CaughtPokemon.create({
        userId: req.user.id,
        speciesId: Number(speciesId),
        nickname: nickname ? String(nickname).trim() : undefined,
      });
      const out = { id: doc._id.toString(), speciesId: doc.speciesId, nickname: doc.nickname, createdAt: doc.createdAt };
      res.status(201).json(out);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
}
