import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] flex flex-col">
        <div className="p-4 border-b border-[hsl(var(--border))]">
          <h2 className="font-semibold text-lg">Battle Arena</h2>
          <p className="text-xs text-[hsl(var(--muted-foreground))] truncate" title={user?.email}>
            {user?.email}
          </p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                  : 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
              )
            }
          >
            Pokédex
          </NavLink>
        </nav>
        <div className="p-2 border-t border-[hsl(var(--border))]">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-[hsl(var(--background))]">
        <Outlet />
      </main>
    </div>
  );
}
