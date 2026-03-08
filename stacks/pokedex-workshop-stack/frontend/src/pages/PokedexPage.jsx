import { useState, useEffect } from 'react';
import { pokedexApi } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export function PokedexPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    pokedexApi
      .list()
      .then(setList)
      .catch((err) => setError(err.body?.error || err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">My Pokédex</h1>
      {loading && <p className="text-[hsl(var(--muted-foreground))]">Loading…</p>}
      {error && (
        <p className="text-red-600 text-sm mb-4" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && list.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-[hsl(var(--muted-foreground))]">
              No Pokémon caught yet. Use the API to add some (e.g. <code className="text-sm bg-[hsl(var(--muted))] px-1 rounded">POST /api/pokedex</code> with <code className="text-sm bg-[hsl(var(--muted))] px-1 rounded">speciesId</code>).
            </p>
          </CardContent>
        </Card>
      )}
      {!loading && list.length > 0 && (
        <ul className="space-y-2">
          {list.map((pokemon) => (
            <Card key={pokemon.id}>
              <CardContent className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">#{String(pokemon.speciesId).padStart(3, '0')}</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {pokemon.nickname || `Species ${pokemon.speciesId}`}
                  </p>
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  {new Date(pokemon.createdAt).toLocaleDateString()}
                </span>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
