import { Factory, Warehouse, Sprout, Truck, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/hud/SectionHeader';
import { useT } from '@/i18n';

export function Examples() {
  const t = useT();

  const examples = [
    {
      label: 'FACTORY',
      title: t.examples.items.factory.title,
      icon: Factory,
      description: t.examples.items.factory.description,
      code: 'EX-01',
      stats: [
        { value: 'LINES', label: t.examples.items.factory.stat1 },
        { value: 'PRED', label: t.examples.items.factory.stat2 },
      ],
    },
    {
      label: 'WAREHOUSE',
      title: t.examples.items.warehouse.title,
      icon: Warehouse,
      description: t.examples.items.warehouse.description,
      code: 'EX-02',
      stats: [
        { value: 'AUTO', label: t.examples.items.warehouse.stat1 },
        { value: 'FLOW', label: t.examples.items.warehouse.stat2 },
      ],
    },
    {
      label: 'AGRICULTURE',
      title: t.examples.items.agriculture.title,
      icon: Sprout,
      description: t.examples.items.agriculture.description,
      code: 'EX-03',
      stats: [
        { value: 'SOIL', label: t.examples.items.agriculture.stat1 },
        { value: 'YIELD', label: t.examples.items.agriculture.stat2 },
      ],
    },
    {
      label: 'LOGISTICS',
      title: t.examples.items.logistics.title,
      icon: Truck,
      description: t.examples.items.logistics.description,
      code: 'EX-04',
      stats: [
        { value: 'ROUTE', label: t.examples.items.logistics.stat1 },
        { value: 'FLEET', label: t.examples.items.logistics.stat2 },
      ],
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          index={t.examples.index}
          title={t.examples.title}
          subtitle={t.examples.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {examples.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group relative p-6 md:p-8 border border-border bg-card/40 hover:border-hud-cyan/30 hover:bg-card/60 transition-all duration-300 corner-brackets overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-32 h-32" />
                </div>

                <div className="relative flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 flex items-center justify-center border border-border bg-background group-hover:border-hud-cyan/40 group-hover:bg-hud-cyan/5 transition-colors">
                      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-hud-cyan transition-colors" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">
                        {item.code}
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-hud-cyan transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-hud-cyan/40">
                    {item.label}
                  </div>
                </div>

                <p className="relative text-sm text-muted-foreground leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="relative grid grid-cols-2 gap-3 mb-6">
                  {item.stats.map((stat) => (
                    <div key={stat.label} className="p-3 border border-border/50 bg-background/30">
                      <div className="font-mono text-sm font-bold text-hud-cyan mb-0.5">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t.examples.cardFooter}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-hud-cyan group-hover:translate-x-1 transition-all" />
                </div>

                <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
