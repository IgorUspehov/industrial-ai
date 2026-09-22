import { Building2, Database, Cpu, Bot, CircuitBoard, Bot as Robot, Factory } from 'lucide-react';
import { SectionHeader } from '@/components/hud/SectionHeader';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n';

export function WhatWeDo() {
  const t = useT();

  const steps = [
    { ...t.whatWeDo.steps.offlineEnterprise, icon: Building2, key: 'offlineEnterprise' },
    { ...t.whatWeDo.steps.productionData, icon: Database, key: 'productionData' },
    { ...t.whatWeDo.steps.llm, icon: Cpu, key: 'llm' },
    { ...t.whatWeDo.steps.aiAgents, icon: Bot, key: 'aiAgents' },
    { ...t.whatWeDo.steps.physicalAi, icon: CircuitBoard, key: 'physicalAi' },
    { ...t.whatWeDo.steps.robots, icon: Robot, key: 'robots' },
    { ...t.whatWeDo.steps.futureProduction, icon: Factory, key: 'futureProduction' },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          index={t.whatWeDo.index}
          title={t.whatWeDo.title}
          subtitle={t.whatWeDo.subtitle}
        />

        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            const isFinal = step.key === 'futureProduction';
            return (
              <div key={step.key}>
                <div
                  className={cn(
                    'group relative flex items-center gap-4 md:gap-6 p-4 md:p-6 border transition-all duration-300',
                    isFinal
                      ? 'border-hud-cyan/40 bg-hud-cyan/5 glow-cyan'
                      : 'border-border bg-card/40 hover:border-hud-cyan/30 hover:bg-card/60',
                  )}
                >
                  <div className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div
                    className={cn(
                      'w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border shrink-0 transition-colors',
                      isFinal
                        ? 'border-hud-cyan/50 bg-hud-cyan/10 text-hud-cyan'
                        : 'border-border bg-background text-muted-foreground group-hover:border-hud-cyan/40 group-hover:text-hud-cyan',
                    )}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        'font-mono text-sm md:text-base font-bold uppercase tracking-wider',
                        isFinal ? 'text-hud-cyan' : 'text-foreground',
                      )}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-0.5">
                      {step.sublabel}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        isFinal ? 'bg-hud-cyan animate-pulse-glow' : 'bg-muted-foreground/30',
                      )}
                    />
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-hud-cyan/20 to-transparent" />
                </div>

                {!isLast && (
                  <div className="flex justify-center py-2">
                    <div className="relative w-px h-10 bg-hud-cyan/15">
                      <div className="absolute top-0 left-0 w-px h-full overflow-hidden">
                        <div className="w-full h-1/3 bg-hud-cyan/50 animate-data-flow-v" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
