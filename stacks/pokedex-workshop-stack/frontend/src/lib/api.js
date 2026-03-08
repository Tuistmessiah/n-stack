const BASE = import.meta.env.VITE_API_URL ?? '';

function getToken() {
  return localStorage.getItem('pokedex_token');
}

export function setToken(token) {
  if (token) localStorage.setItem('pokedex_token', token);
  else localStorage.removeItem('pokedex_token');
}

export async function api(path, options = {}) {
  const url = `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = { ...options.headers };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const err = new Error(res.statusText || 'Request failed');
    err.status = res.status;
    try {
      err.body = await res.json();
    } catch {
      err.body = null;
    }
    throw err;
  }
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) return res.json();
  return res.text();
}

export const authApi = {
  signup: (email, password) =>
    api('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),
  login: (email, password) =>
    api('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),
  me: () => api('/api/auth/me'),
};

export const pokedexApi = {
  list: () => api('/api/pokedex'),
  add: (speciesId, nickname) =>
    api('/api/pokedex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ speciesId, nickname: nickname || undefined }),
    }),
};
