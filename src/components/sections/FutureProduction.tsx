import { useEffect, useState } from 'react';
import {
  BrainCircuit,
  Bot,
  CircuitBoard,
  Cpu,
  Factory,
  Boxes,
  ArrowUpDown,
} from 'lucide-react';
import { SectionHeader } from '@/components/hud/SectionHeader';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n';

export function FutureProduction() {
  const t = useT();
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    { ...t.futureProduction.layers.ai, icon: BrainCircuit, code: 'L-01', key: 'ai' },
    { ...t.futureProduction.layers.aiAgents, icon: Bot, code: 'L-02', key: 'aiAgents' },
    { ...t.futureProduction.layers.physicalAi, icon: CircuitBoard, code: 'L-03', key: 'physicalAi' },
    { ...t.futureProduction.layers.robots, icon: Cpu, code: 'L-04', key: 'robots' },
    { ...t.futureProduction.layers.machines, icon: Factory, code: 'L-05', key: 'machines' },
    { ...t.futureProduction.layers.production, icon: Boxes, code: 'L-06', key: 'production' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % layers.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [layers.length]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-hud-cyan/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          index={t.futureProduction.index}
          title={t.futureProduction.title}
          subtitle={t.futureProduction.subtitle}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-hud-cyan/20 to-transparent -translate-x-1/2" />

            <div className="flex flex-col gap-0">
              {layers.map((layer, i) => {
                const Icon = layer.icon;
                const isActive = i === activeLayer;
                return (
                  <div key={layer.key}>
                    <div
                      className={cn(
                        'group relative flex items-center gap-4 p-4 md:p-5 border transition-all duration-500',
                        isActive
                          ? 'border-hud-cyan/40 bg-hud-cyan/5 glow-cyan'
                          : 'border-border bg-card/40 hover:border-hud-cyan/20',
                      )}
                    >
                      <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest shrink-0 w-10">
                        {layer.code}
                      </span>
                      <div
                        className={cn(
                          'w-12 h-12 flex items-center justify-center border shrink-0 transition-colors',
                          isActive
                            ? 'border-hud-cyan/50 bg-hud-cyan/10 text-hud-cyan'
                            : 'border-border bg-background text-muted-foreground',
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            'font-mono text-sm md:text-base font-bold uppercase tracking-wider transition-colors',
                            isActive ? 'text-hud-cyan' : 'text-foreground',
                          )}
                        >
                          {layer.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {layer.sublabel}
                        </div>
                      </div>
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full shrink-0 transition-all',
                          isActive ? 'bg-hud-cyan animate-pulse-glow' : 'bg-muted-foreground/20',
                        )}
                      />
                    </div>

                    {i < layers.length - 1 && (
                      <div className="flex justify-center py-1.5 relative">
                        <div className="flex items-center gap-1">
                          <ArrowUpDown className="w-3 h-3 text-hud-cyan/30" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/40 corner-brackets">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-hud-cyan rounded-full animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-hud-cyan">
                    {t.futureProduction.bidirectionalLabel}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
                  {t.futureProduction.bidirectionalTitle}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.futureProduction.bidirectionalText}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 border border-border bg-card/40">
                  <div className="font-mono text-2xl font-bold text-hud-cyan mb-1">↕</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t.futureProduction.statFlow}
                  </div>
                </div>
                <div className="p-5 border border-border bg-card/40">
                  <div className="font-mono text-2xl font-bold text-hud-green mb-1">24/7</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t.futureProduction.statCycle}
                  </div>
                </div>
                <div className="p-5 border border-border bg-card/40">
                  <div className="font-mono text-2xl font-bold text-hud-amber mb-1">6</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t.futureProduction.statLevels}
                  </div>
                </div>
                <div className="p-5 border border-border bg-card/40">
                  <div className="font-mono text-2xl font-bold text-foreground mb-1">∞</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t.futureProduction.statScale}
                  </div>
                </div>
              </div>

              <div className="p-5 border border-hud-cyan/20 bg-hud-cyan/5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-hud-cyan font-mono uppercase tracking-wider text-xs">
                    {t.futureProduction.conceptLabel}
                  </span>{' '}
                  {t.futureProduction.conceptText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
