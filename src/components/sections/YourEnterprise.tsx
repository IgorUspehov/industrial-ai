import {
  Factory,
  Settings,
  Gauge,
  Workflow,
  Zap,
  Package,
  ClipboardCheck,
  Clock,
  Warehouse,
  Truck,
  Wrench,
} from 'lucide-react';
import { SectionHeader } from '@/components/hud/SectionHeader';
import { useT } from '@/i18n';

export function YourEnterprise() {
  const t = useT();

  const dataTypes = [
    { label: t.yourEnterprise.dataTypes.production, icon: Factory, code: 'PRD-01' },
    { label: t.yourEnterprise.dataTypes.equipment, icon: Settings, code: 'EQP-02' },
    { label: t.yourEnterprise.dataTypes.sensors, icon: Gauge, code: 'SNR-03' },
    { label: t.yourEnterprise.dataTypes.processes, icon: Workflow, code: 'PRC-04' },
    { label: t.yourEnterprise.dataTypes.energy, icon: Zap, code: 'NRG-05' },
    { label: t.yourEnterprise.dataTypes.rawMaterials, icon: Package, code: 'RAW-06' },
    { label: t.yourEnterprise.dataTypes.quality, icon: ClipboardCheck, code: 'QLT-07' },
    { label: t.yourEnterprise.dataTypes.downtime, icon: Clock, code: 'DWN-08' },
    { label: t.yourEnterprise.dataTypes.warehouse, icon: Warehouse, code: 'WRH-09' },
    { label: t.yourEnterprise.dataTypes.logistics, icon: Truck, code: 'LGS-10' },
    { label: t.yourEnterprise.dataTypes.maintenance, icon: Wrench, code: 'MNT-11' },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          index={t.yourEnterprise.index}
          title={t.yourEnterprise.title}
          subtitle={t.yourEnterprise.subtitle}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
          {dataTypes.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.code}
                className="group relative aspect-square flex flex-col items-center justify-center gap-2 p-3 border border-border bg-card/40 hover:border-hud-cyan/40 hover:bg-card/60 transition-all duration-300 corner-brackets overflow-hidden"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="absolute top-1.5 left-1.5 font-mono text-[8px] text-muted-foreground/60 uppercase tracking-wider">
                  {item.code}
                </div>
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-hud-cyan/40 group-hover:bg-hud-cyan group-hover:animate-pulse-glow rounded-full transition-all" />
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-border bg-background/50 group-hover:border-hud-cyan/30 group-hover:bg-hud-cyan/5 transition-colors">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-hud-cyan transition-colors" />
                </div>
                <div className="text-center">
                  <div className="text-xs md:text-sm font-medium text-foreground group-hover:text-hud-cyan transition-colors leading-tight">
                    {item.label}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-hud-cyan/0 to-transparent group-hover:via-hud-cyan/40 transition-all duration-500" />
              </div>
            );
          })}

          <div className="aspect-square flex flex-col items-center justify-center border border-dashed border-border/50 bg-transparent">
            <div className="font-mono text-xs text-muted-foreground/50 uppercase tracking-wider text-center px-2">
              {t.yourEnterprise.customSources}
            </div>
            <div className="mt-1 font-mono text-[9px] text-muted-foreground/40">
              {t.yourEnterprise.custom}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-12 py-4 border-y border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-hud-cyan rounded-full animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t.yourEnterprise.infoSources}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-hud-green/60 rounded-full" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t.yourEnterprise.infoIntegration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-hud-amber/60 rounded-full" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t.yourEnterprise.infoOfflineOnline}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
