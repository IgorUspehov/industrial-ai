import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DataFlowNodeProps {
  label: string;
  sublabel?: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DataFlowNode({
  label,
  sublabel,
  icon,
  active = false,
  className,
  size = 'md',
}: DataFlowNodeProps) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center gap-2 border font-mono uppercase tracking-wider transition-all duration-300',
        sizeClasses[size],
        active
          ? 'border-hud-cyan/60 bg-hud-cyan/10 text-hud-cyan glow-cyan'
          : 'border-border bg-card/50 text-muted-foreground hover:border-hud-cyan/40 hover:text-foreground',
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="font-semibold">{label}</span>
      {sublabel && (
        <span className="text-[10px] opacity-60 normal-case tracking-normal">{sublabel}</span>
      )}
      {active && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-hud-cyan rounded-full animate-pulse-glow" />
      )}
    </div>
  );
}
