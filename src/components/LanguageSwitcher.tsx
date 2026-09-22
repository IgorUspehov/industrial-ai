import { Globe } from 'lucide-react';
import { useLanguage, type LanguageCode } from '@/i18n';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { lang, setLang, languages } = useLanguage();

  return (
    <div className="flex items-center gap-1 border border-border bg-background/50 backdrop-blur-sm">
      <Globe className="w-3.5 h-3.5 text-muted-foreground ml-2.5 shrink-0" />
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code as LanguageCode)}
          className={cn(
            'px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors',
            lang === l.code
              ? 'text-hud-cyan bg-hud-cyan/10'
              : 'text-muted-foreground hover:text-foreground',
          )}
          aria-label={l.label}
          aria-pressed={lang === l.code}
        >
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
