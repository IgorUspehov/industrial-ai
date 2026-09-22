import { cn } from '@/lib/utils';

interface FlowConnectorProps {
  direction?: 'down' | 'right';
  length?: string;
  animated?: boolean;
  className?: string;
}

export function FlowConnector({
  direction = 'down',
  length = 'h-12',
  animated = true,
  className,
}: FlowConnectorProps) {
  if (direction === 'right') {
    return (
      <div className={cn('relative flex items-center', className)} style={{ width: '60px' }}>
        <div className="flex-1 h-px bg-hud-cyan/20" />
        {animated && (
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-hud-cyan/60 animate-data-flow" />
          </div>
        )}
        <div className="w-0 h-0 border-l-[6px] border-l-hud-cyan/40 border-y-[4px] border-y-transparent" />
      </div>
    );
  }

  return (
    <div className={cn('relative flex flex-col items-center', length, className)}>
      <div className="flex-1 w-px bg-hud-cyan/20" />
      {animated && (
        <div className="absolute top-0 left-0 w-px h-full overflow-hidden">
          <div className="w-full h-1/3 bg-hud-cyan/60 animate-data-flow-v" />
        </div>
      )}
      <div className="w-0 h-0 border-t-[6px] border-t-hud-cyan/40 border-x-[4px] border-x-transparent" />
    </div>
  );
}
