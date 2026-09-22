import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HUDFrameProps {
  children: ReactNode;
  className?: string;
  label?: string;
  labelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showCorners?: boolean;
  variant?: 'default' | 'bright';
}

export function HUDFrame({
  children,
  className,
  label,
  labelPosition = 'top-left',
  showCorners = true,
  variant = 'default',
}: HUDFrameProps) {
  const labelClasses: Record<string, string> = {
    'top-left': 'top-0 left-0 -translate-y-1/2',
    'top-right': 'top-0 right-0 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-y-1/2',
  };

  return (
    <div
      className={cn(
        'relative',
        variant === 'default' ? 'hud-panel' : 'hud-panel-bright',
        showCorners && 'corner-brackets',
        className,
      )}
    >
      {label && (
        <div
          className={cn(
            'absolute z-10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-hud-cyan bg-background/90 border border-hud-cyan/30',
            labelClasses[labelPosition],
          )}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
