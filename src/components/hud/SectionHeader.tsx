import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({ index, title, subtitle, className, children }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-16', className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-hud-cyan/60" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-hud-cyan/80">
          {index}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-hud-cyan/20 to-transparent" />
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
