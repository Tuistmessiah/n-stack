import { cn } from '../../lib/utils';

export function Button({ className, variant = 'default', ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variant === 'default' && 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 h-10 px-4 py-2',
        variant === 'outline' && 'border border-[hsl(var(--input))] bg-transparent hover:bg-[hsl(var(--muted))] h-10 px-4 py-2',
        variant === 'ghost' && 'hover:bg-[hsl(var(--muted))] h-10 px-4 py-2',
        className
      )}
      {...props}
    />
  );
}
