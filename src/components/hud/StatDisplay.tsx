import { cn } from '@/lib/utils';

interface StatDisplayProps {
  value: string;
  label: string;
  unit?: string;
  className?: string;
  color?: 'cyan' | 'amber' | 'green';
}

export function StatDisplay({ value, label, unit, className, color = 'cyan' }: StatDisplayProps) {
  const colorClasses = {
    cyan: 'text-hud-cyan',
    amber: 'text-hud-amber',
    green: 'text-hud-green',
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-baseline gap-1">
        <span className={cn('font-mono text-2xl md:text-3xl font-bold tabular-nums', colorClasses[color])}>
          {value}
        </span>
        {unit && (
          <span className="font-mono text-xs text-muted-foreground uppercase">{unit}</span>
        )}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
