import express from 'express';
import { PrismaClient } from '@prisma/client';
import * as auth from '../../lib/auth.js';

const prisma = new PrismaClient();

export function initPostgres() {
  return prisma.$connect().catch((err) => {
    console.error('Postgres connection error:', err.message);
    process.exit(1);
  });
}

export function requireAuth(req, res, next) {
  const token = auth.getBearerToken(req);
  if (!token) return res.status(401).json({ error: 'Missing or invalid token' });
  auth.verifyToken(token)
    .then((payload) => {
      req.user = { id: Number(payload.userId), email: payload.email };
      next();
    })
    .catch(() => res.status(401).json({ error: 'Invalid or expired token' }));
}

export function getTeamsRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const teams = await prisma.team.findMany({ orderBy: { id: 'asc' } });
      res.json(teams);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { name } = req.body || {};
      if (!name) return res.status(400).json({ error: 'name required' });
      const team = await prisma.team.create({ data: { name } });
      res.status(201).json(team);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
}

export function getAuthRouter() {
  const router = express.Router();

  router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ error: 'email and password required' });
      const emailNorm = email.trim().toLowerCase();
      const existing = await prisma.user.findUnique({ where: { email: emailNorm } });
      if (existing) return res.status(409).json({ error: 'Email already registered' });
      const passwordHash = await auth.hashPassword(password);
      const user = await prisma.user.create({ data: { email: emailNorm, passwordHash } });
      const token = await auth.createToken({ userId: String(user.id), email: user.email });
      res.status(201).json({ token, user: { id: String(user.id), email: user.email } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ error: 'email and password required' });
      const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
      if (!user) return res.status(401).json({ error: 'Invalid email or password' });
      const ok = await auth.comparePassword(password, user.passwordHash);
      if (!ok) return res.status(401).json({ error: 'Invalid email or password' });
      const token = await auth.createToken({ userId: String(user.id), email: user.email });
      res.json({ token, user: { id: String(user.id), email: user.email } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get('/me', requireAuth, (req, res) => {
    res.json({ id: String(req.user.id), email: req.user.email });
  });

  return router;
}

export function getPokedexRouter() {
  const router = express.Router();
  router.use(requireAuth);

  router.get('/', async (req, res) => {
    try {
      const list = await prisma.caughtPokemon.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
      });
      res.json(list);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { speciesId, nickname } = req.body || {};
      if (speciesId == null) return res.status(400).json({ error: 'speciesId required' });
      const doc = await prisma.caughtPokemon.create({
        data: {
          userId: req.user.id,
          speciesId: Number(speciesId),
          nickname: nickname ? String(nickname).trim() : undefined,
        },
      });
      res.status(201).json(doc);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
}
