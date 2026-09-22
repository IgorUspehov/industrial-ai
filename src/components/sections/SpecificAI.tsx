import { Cpu, Database, Building2, BrainCircuit, ArrowDown } from 'lucide-react';
import { SectionHeader } from '@/components/hud/SectionHeader';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n';

export function SpecificAI() {
  const t = useT();

  const stages = [
    { ...t.specificAI.stages.universal, icon: Cpu, code: 'STAGE 01', key: 'universal', highlight: false },
    { ...t.specificAI.stages.enterpriseData, icon: Database, code: 'STAGE 02', key: 'enterpriseData', highlight: false },
    { ...t.specificAI.stages.enterpriseContext, icon: Building2, code: 'STAGE 03', key: 'enterpriseContext', highlight: false },
    { ...t.specificAI.stages.specialized, icon: BrainCircuit, code: 'STAGE 04', key: 'specialized', highlight: true },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-hud-cyan/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          index={t.specificAI.index}
          title={t.specificAI.title}
          subtitle={t.specificAI.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-0 relative">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div key={stage.key} className="relative">
                {i < stages.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-px bg-hud-cyan/20" />
                      <ArrowDown className="w-3 h-3 text-hud-cyan/40 -rotate-90 -mt-px" />
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    'relative h-full flex flex-col p-6 border transition-all duration-300',
                    stage.highlight
                      ? 'border-hud-cyan/40 bg-hud-cyan/5 glow-cyan'
                      : 'border-border bg-card/40 hover:border-hud-cyan/30 hover:bg-card/60',
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                      {stage.code}
                    </span>
                    {stage.highlight && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-hud-cyan animate-blink">
                        {t.specificAI.active}
                      </span>
                    )}
                  </div>

                  <div
                    className={cn(
                      'w-14 h-14 flex items-center justify-center border mb-4',
                      stage.highlight
                        ? 'border-hud-cyan/50 bg-hud-cyan/10 text-hud-cyan'
                        : 'border-border bg-background text-muted-foreground',
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3
                    className={cn(
                      'font-display text-lg font-bold mb-1',
                      stage.highlight ? 'text-hud-cyan' : 'text-foreground',
                    )}
                  >
                    {stage.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 font-mono uppercase tracking-wider">
                    {stage.sublabel}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="mt-auto pt-4">
                    <div
                      className={cn(
                        'h-0.5 transition-all duration-500',
                        stage.highlight ? 'bg-hud-cyan' : 'bg-border group-hover:bg-hud-cyan/40',
                      )}
                    />
                  </div>
                </div>

                {i < stages.length - 1 && (
                  <div className="lg:hidden flex justify-center py-2">
                    <ArrowDown className="w-4 h-4 text-hud-cyan/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 max-w-3xl mx-auto p-4 border border-hud-amber/30 bg-hud-amber/5 corner-brackets">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 mt-1.5 bg-hud-amber rounded-full shrink-0 animate-pulse" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-hud-amber font-mono uppercase tracking-wider text-xs">
                {t.specificAI.warningLabel}
              </span>{' '}
              {t.specificAI.warningText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
