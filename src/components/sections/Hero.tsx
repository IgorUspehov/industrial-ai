import { useEffect, useState } from 'react';
import { ArrowRight, Gauge, Activity, Cpu, Database, Bot, Factory } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Hero() {
  const t = useT();
  const [activeStep, setActiveStep] = useState(0);

  const flowSteps = [
    { label: t.hero.flowData, icon: Database },
    { label: t.hero.flowAi, icon: Cpu },
    { label: t.hero.flowAgents, icon: Bot },
    { label: t.hero.flowRobots, icon: Factory },
    { label: t.hero.flowProduction, icon: Activity },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [flowSteps.length]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-hud-cyan/5 blur-[120px] pointer-events-none" />

      {/* Top status bar */}
      <div className="relative z-10 border-b border-border/50 bg-background/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-hud-green rounded-full animate-pulse" />
              {t.nav.systemOnline}
            </span>
            <span className="hidden sm:inline">{t.nav.missionControl}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">{t.nav.sector}</span>
            <span className="hidden md:inline">{t.nav.protocol}</span>
            <span>{t.nav.version}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-8">
        <div className="max-w-6xl w-full mx-auto py-16">
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <div className="w-12 h-px bg-hud-cyan/60" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-hud-cyan/80">
              {t.hero.label}
            </span>
            <div className="w-12 h-px bg-hud-cyan/60" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-[1.05] tracking-tight animate-fade-in-up">
            <span className="text-gradient-muted block">{t.hero.thesis1Line1}</span>
            <span className="text-gradient-muted block">{t.hero.thesis1Line2}</span>
            <span className="text-gradient-cyan block glow-text-soft">{t.hero.thesis1Line3}</span>
          </h1>

          <p className="mt-6 text-center text-lg md:text-xl text-muted-foreground font-light animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t.hero.subtext}
          </p>

          <div className="my-12 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-hud-cyan/30" />
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              {t.hero.divider}
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-hud-cyan/30" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-[1.05] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-gradient-cyan glow-text-soft">{t.hero.thesis2Line1}</span>
            <span className="text-gradient-muted block mt-2">{t.hero.thesis2Line2}</span>
          </h2>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="#audit"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-hud-cyan text-background font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:glow-cyan hover:scale-[1.02]"
            >
              <span className="absolute inset-0 border border-hud-cyan/40 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
              <Gauge className="w-4 h-4" />
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#potential"
              className="group inline-flex items-center gap-2 px-8 py-4 border border-border bg-card/50 font-mono text-sm font-bold uppercase tracking-widest text-foreground transition-all duration-300 hover:border-hud-cyan/40 hover:bg-card"
            >
              <Activity className="w-4 h-4 text-hud-cyan" />
              {t.hero.ctaSecondary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Background flow diagram */}
      <div className="absolute bottom-0 left-0 right-0 z-0 border-t border-border/50 bg-background/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-2">
            {flowSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeStep;
              return (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={cn(
                      'flex flex-col items-center gap-1 transition-all duration-500',
                      isActive ? 'scale-110' : 'scale-100 opacity-50',
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border transition-all duration-500',
                        isActive
                          ? 'border-hud-cyan/60 bg-hud-cyan/10 text-hud-cyan glow-cyan'
                          : 'border-border bg-card/30 text-muted-foreground',
                      )}
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span
                      className={cn(
                        'font-mono text-[9px] md:text-[10px] uppercase tracking-widest transition-colors duration-500',
                        isActive ? 'text-hud-cyan' : 'text-muted-foreground',
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="flex-1 mx-2 md:mx-3 h-px relative overflow-hidden">
                      <div className="absolute inset-0 bg-hud-cyan/10" />
                      <div
                        className={cn(
                          'absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent to-hud-cyan/60 transition-all duration-700',
                          i < activeStep ? 'translate-x-[300%] opacity-100' : 'opacity-0',
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
