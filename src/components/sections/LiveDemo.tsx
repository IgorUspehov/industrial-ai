import { Activity } from 'lucide-react';
import { useT } from '@/i18n';

const DEMO_URL = 'https://bali-startapp-controller.onrender.com/';

export function LiveDemo() {
  const t = useT();

  return (
    <section id="live-demo" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        <div className="relative p-8 md:p-14 border-2 border-border bg-[#FACC15] corner-brackets overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-fine opacity-10" />
          <div className="absolute inset-0 scanline pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#15803D]">
                {t.liveDemo.label}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              {t.liveDemo.title}
            </h2>

            <p className="mt-4 font-mono text-sm md:text-base uppercase tracking-widest text-[#15803D]">
              {t.liveDemo.subtitle}
            </p>

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-foreground/70 leading-relaxed">
              {t.liveDemo.description}
            </p>

            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 mt-10 px-10 py-5 bg-[#22C55E] text-background font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="absolute inset-0 border-2 border-border -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
              <Activity className="w-5 h-5" />
              {t.liveDemo.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
