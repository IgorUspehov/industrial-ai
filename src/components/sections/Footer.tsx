import { Cpu } from 'lucide-react';
import { useT } from '@/i18n';

export function Footer() {
  const t = useT();

  return (
    <footer className="relative border-t border-border bg-background/60 backdrop-blur-sm">
      <div className="absolute inset-0 bg-grid-fine opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center border border-hud-cyan/30 bg-hud-cyan/5">
              <Cpu className="w-5 h-5 text-hud-cyan" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-foreground">
                {t.footer.brand}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {t.footer.tagline1}
              </div>
            </div>
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center">
            {t.footer.tagline2}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-hud-green rounded-full animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {t.footer.status}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            {t.footer.copyright.replace('{year}', String(new Date().getFullYear()))}
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              {t.footer.platform}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              {t.footer.missionControl}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
