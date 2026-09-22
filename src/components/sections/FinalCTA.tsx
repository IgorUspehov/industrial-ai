import { ArrowRight, Gauge } from 'lucide-react';
import { useT } from '@/i18n';

export function FinalCTA() {
  const t = useT();

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-hud-cyan/5 blur-[140px] pointer-events-none" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-hud-cyan/30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-hud-cyan/30" />

      <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-px bg-hud-cyan/40" />
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-hud-cyan/60">
            {t.finalCTA.label}
          </span>
          <div className="w-12 h-px bg-hud-cyan/40" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-12">
          <span className="text-gradient-muted block">{t.finalCTA.line1}</span>
          <span className="text-gradient-muted block">{t.finalCTA.line2}</span>
          <span className="text-gradient-cyan block glow-text-soft mt-2">{t.finalCTA.line3}</span>
        </h2>

        <a
          href="#audit"
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-hud-cyan text-background font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] hover:glow-cyan"
        >
          <span className="absolute inset-0 border border-hud-cyan/40 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
          <Gauge className="w-5 h-5" />
          {t.finalCTA.button}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
          {t.finalCTA.subtext}
        </p>
      </div>
    </section>
  );
}
