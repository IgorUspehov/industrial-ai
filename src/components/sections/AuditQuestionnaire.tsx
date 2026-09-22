import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Loader2,
  Database,
  Brain,
  Activity,
  Factory,
  Send,
  RotateCcw,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { SectionHeader } from '@/components/hud/SectionHeader';
import { useT } from '@/i18n';
import { cn } from '@/lib/utils';

type StepId = 'type' | 'size' | 'processes' | 'data' | 'history' | 'problem' | 'readiness' | 'contact';

interface AuditData {
  enterpriseType: string;
  enterpriseSize: string;
  automatedProcesses: string[];
  availableData: string[];
  hasHistoricalData: string;
  mainProblem: string;
  aiReadiness: number;
  contactName: string;
  contactCompany: string;
  contactPosition: string;
  contactEmail: string;
  contactPhone: string;
  contactCountry: string;
}

const initialData: AuditData = {
  enterpriseType: '',
  enterpriseSize: '',
  automatedProcesses: [],
  availableData: [],
  hasHistoricalData: '',
  mainProblem: '',
  aiReadiness: 5,
  contactName: '',
  contactCompany: '',
  contactPosition: '',
  contactEmail: '',
  contactPhone: '',
  contactCountry: '',
};

const stepIds: StepId[] = ['type', 'size', 'processes', 'data', 'history', 'problem', 'readiness', 'contact'];

type Phase = 'form' | 'submitting' | 'success';

export function AuditQuestionnaire() {
  const t = useT();
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<AuditData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>('form');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('ai-audit-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...initialData, ...parsed });
      }
      const savedStep = sessionStorage.getItem('ai-audit-step');
      if (savedStep) {
        setStepIndex(Math.min(parseInt(savedStep, 10), stepIds.length - 1));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem('ai-audit-data', JSON.stringify(data));
      sessionStorage.setItem('ai-audit-step', String(stepIndex));
    } catch {
      // ignore
    }
  }, [data, stepIndex]);

  const currentStepId = stepIds[stepIndex];
  const progress = ((stepIndex + 1) / stepIds.length) * 100;

  const updateField = useCallback(<K extends keyof AuditData>(field: K, value: AuditData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  }, []);

  const toggleArrayItem = useCallback((field: 'automatedProcesses' | 'availableData', value: string) => {
    setData((prev) => {
      const arr = prev[field];
      const hasNone = value === 'none' || (field === 'automatedProcesses' && arr.includes('none'));
      const newArr = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : hasNone && value !== 'none'
          ? [value]
          : [...arr.filter((v) => v !== 'none'), value];
      return { ...prev, [field]: newArr };
    });
  }, []);

  const validateStep = useCallback((): boolean => {
    const step = currentStepId;
    const v = t.audit.validation;
    const newErrors: Record<string, string> = {};

    if (step === 'type' && !data.enterpriseType) newErrors.enterpriseType = v.selectType;
    if (step === 'size' && !data.enterpriseSize) newErrors.enterpriseSize = v.selectSize;
    if (step === 'processes' && data.automatedProcesses.length === 0) newErrors.automatedProcesses = v.selectAtLeastOne;
    if (step === 'data' && data.availableData.length === 0) newErrors.availableData = v.selectAtLeastOne;
    if (step === 'history' && !data.hasHistoricalData) newErrors.hasHistoricalData = v.selectOption;
    if (step === 'problem' && !data.mainProblem) newErrors.mainProblem = v.selectProblem;

    if (step === 'contact') {
      if (!data.contactName.trim()) newErrors.contactName = v.enterName;
      if (!data.contactCompany.trim()) newErrors.contactCompany = v.enterCompany;
      if (!data.contactPosition.trim()) newErrors.contactPosition = v.enterPosition;
      if (!data.contactEmail.trim()) {
        newErrors.contactEmail = v.enterEmail;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
        newErrors.contactEmail = v.invalidEmail;
      }
      if (!data.contactCountry.trim()) newErrors.contactCountry = v.enterCountry;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStepId, data, t.audit.validation]);

  const handleNext = useCallback(() => {
    if (!validateStep()) return;
    if (stepIndex < stepIds.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  }, [validateStep, stepIndex]);

  const handleBack = useCallback(() => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    setErrors({});
  }, [stepIndex]);

  const handleSubmit = useCallback(async () => {
    if (!validateStep()) return;
    setPhase('submitting');
    setSubmitError(null);

    try {
      await addDoc(collection(db, 'ai_audits'), {
        enterprise_type: data.enterpriseType,
        enterprise_size: data.enterpriseSize,
        automated_processes: data.automatedProcesses,
        available_data: data.availableData,
        has_historical_data: data.hasHistoricalData,
        main_problem: data.mainProblem,
        ai_readiness: data.aiReadiness,
        contact_name: data.contactName,
        contact_company: data.contactCompany,
        contact_position: data.contactPosition,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone || null,
        contact_country: data.contactCountry,
        created_at: serverTimestamp(),
      });

      setPhase('success');
      sessionStorage.removeItem('ai-audit-data');
      sessionStorage.removeItem('ai-audit-step');
    } catch (err) {
      setPhase('form');
      setSubmitError(err instanceof Error ? err.message : t.audit.validation.submitError);
    }
  }, [validateStep, data, t.audit.validation.submitError]);

  const handleRestart = useCallback(() => {
    setData(initialData);
    setStepIndex(0);
    setErrors({});
    setPhase('form');
    setSubmitError(null);
    sessionStorage.removeItem('ai-audit-data');
    sessionStorage.removeItem('ai-audit-step');
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (phase !== 'form') return;
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (stepIndex < stepIds.length - 1) {
          handleNext();
        } else {
          handleSubmit();
        }
      }
      if (e.key === 'Escape') {
        handleBack();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, stepIndex, handleNext, handleBack, handleSubmit]);

  useEffect(() => {
    if (phase === 'form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [stepIndex, phase]);

  if (phase === 'submitting') {
    return <SubmittingView />;
  }

  if (phase === 'success') {
    return <SuccessView onRestart={handleRestart} />;
  }

  const stepMeta = t.audit.steps[currentStepId];

  return (
    <section id="audit" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hud-cyan/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 md:px-8">
        <SectionHeader
          index={t.audit.index}
          title={t.audit.title}
          subtitle={t.audit.subtitle}
        />

        <div ref={formRef} className="relative">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-hud-cyan">
                  {t.audit.step} {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  / {String(stepIds.length).padStart(2, '0')}
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {Math.round(progress)}% {t.audit.complete}
              </span>
            </div>
            <div className="h-1 bg-border relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-hud-cyan transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-progress" style={{ backgroundSize: '40px 100%' }} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              {stepIds.map((id, i) => (
                <button
                  key={id}
                  onClick={() => i < stepIndex && setStepIndex(i)}
                  disabled={i >= stepIndex}
                  className={cn(
                    'flex-1 h-1 transition-colors',
                    i < stepIndex && 'bg-hud-cyan/60 cursor-pointer hover:bg-hud-cyan',
                    i === stepIndex && 'bg-hud-cyan',
                    i > stepIndex && 'bg-border',
                  )}
                  aria-label={t.audit.stepAria.replace('{n}', String(i + 1)).replace('{title}', t.audit.steps[id].title)}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="relative p-6 md:p-10 border border-border bg-card/40 corner-brackets min-h-[400px]">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-px bg-hud-cyan/60" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-hud-cyan/80">
                  {stepMeta.title}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {stepMeta.subtitle}
              </h3>
            </div>

            <div className="animate-fade-in" key={currentStepId}>
              {currentStepId === 'type' && (
                <NicheGrid
                  options={buildOptions(t.audit.enterpriseTypes)}
                  selected={data.enterpriseType}
                  onSelect={(v) => updateField('enterpriseType', v)}
                  error={errors.enterpriseType}
                />
              )}

              {currentStepId === 'size' && (
                <OptionGrid
                  options={buildOptions(t.audit.enterpriseSizes)}
                  selected={data.enterpriseSize}
                  onSelect={(v) => updateField('enterpriseSize', v)}
                  error={errors.enterpriseSize}
                  columns={2}
                />
              )}

              {currentStepId === 'processes' && (
                <MultiSelectGrid
                  options={buildOptions(t.audit.processOptions)}
                  selected={data.automatedProcesses}
                  onToggle={(v) => toggleArrayItem('automatedProcesses', v)}
                  error={errors.automatedProcesses}
                  columns={2}
                  hint={t.audit.multiSelectHint}
                />
              )}

              {currentStepId === 'data' && (
                <MultiSelectGrid
                  options={buildOptions(t.audit.dataOptions)}
                  selected={data.availableData}
                  onToggle={(v) => toggleArrayItem('availableData', v)}
                  error={errors.availableData}
                  columns={2}
                  hint={t.audit.multiSelectHint}
                />
              )}

              {currentStepId === 'history' && (
                <OptionGrid
                  options={buildOptions(t.audit.historyOptions)}
                  selected={data.hasHistoricalData}
                  onSelect={(v) => updateField('hasHistoricalData', v)}
                  error={errors.hasHistoricalData}
                  columns={4}
                />
              )}

              {currentStepId === 'problem' && (
                <OptionGrid
                  options={buildOptions(t.audit.problemOptions)}
                  selected={data.mainProblem}
                  onSelect={(v) => updateField('mainProblem', v)}
                  error={errors.mainProblem}
                  columns={3}
                />
              )}

              {currentStepId === 'readiness' && (
                <ReadinessSlider
                  value={data.aiReadiness}
                  onChange={(v) => updateField('aiReadiness', v)}
                />
              )}

              {currentStepId === 'contact' && (
                <ContactForm
                  data={data}
                  errors={errors}
                  updateField={updateField}
                />
              )}
            </div>

            {submitError && (
              <div className="mt-6 p-4 border border-hud-red/30 bg-hud-red/5 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-hud-red shrink-0 mt-0.5" />
                <p className="text-sm text-hud-red">{submitError}</p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
              <button
                onClick={handleBack}
                disabled={stepIndex === 0}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest border transition-all',
                  stepIndex === 0
                    ? 'border-border/50 text-muted-foreground/30 cursor-not-allowed'
                    : 'border-border text-foreground hover:border-hud-cyan/40 hover:text-hud-cyan',
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                {t.audit.buttons.back}
              </button>

              {stepIndex < stepIds.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-hud-cyan text-background font-mono text-xs font-bold uppercase tracking-widest hover:glow-cyan transition-all"
                >
                  {t.audit.buttons.next}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-hud-cyan text-background font-mono text-xs font-bold uppercase tracking-widest hover:glow-cyan transition-all"
                >
                  <Send className="w-4 h-4" />
                  {t.audit.buttons.submit}
                </button>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">
              <span>{t.audit.keyboard.enter}</span>
              <span>{t.audit.keyboard.esc}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Helpers ---

function buildOptions(obj: Record<string, string>): { value: string; label: string }[] {
  return Object.entries(obj).map(([value, label]) => ({ value, label }));
}

// --- Sub-components ---

interface Option {
  value: string;
  label: string;
}

function OptionGrid({
  options,
  selected,
  onSelect,
  error,
  columns = 2,
}: {
  options: Option[];
  selected: string;
  onSelect: (v: string) => void;
  error?: string;
  columns?: number;
}) {
  const colClass = columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : columns === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div>
      <div className={cn('grid gap-3', colClass)}>
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={cn(
                'group relative p-4 md:p-5 border text-left transition-all duration-200',
                isSelected
                  ? 'border-hud-cyan/60 bg-hud-cyan/10 text-hud-cyan glow-cyan'
                  : 'border-border bg-background/50 text-foreground hover:border-hud-cyan/30 hover:bg-card',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base font-medium">{opt.label}</span>
                <div
                  className={cn(
                    'w-4 h-4 border flex items-center justify-center transition-all',
                    isSelected ? 'border-hud-cyan bg-hud-cyan' : 'border-border group-hover:border-hud-cyan/40',
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 text-background" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

function NicheGrid({
  options,
  selected,
  onSelect,
  error,
}: {
  options: Option[];
  selected: string;
  onSelect: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="flex justify-center">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              aria-pressed={isSelected}
              className={cn(
                'group relative w-full max-w-2xl min-h-36 md:min-h-44 p-6 md:p-8 border text-left transition-all duration-300 corner-brackets',
                'flex items-center gap-5 md:gap-8',
                isSelected
                  ? 'border-hud-cyan/70 bg-hud-cyan/10 text-hud-cyan glow-cyan'
                  : 'border-border bg-background/50 text-foreground hover:border-hud-cyan/40 hover:bg-card',
              )}
            >
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center border border-hud-cyan/40 bg-hud-cyan/10 shrink-0">
                <Factory className="w-6 h-6 md:w-8 md:h-8 text-hud-cyan" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground block mb-2">
                  03
                </span>
                <span className="text-base md:text-xl font-semibold leading-snug block">
                  {opt.label}
                </span>
              </div>
              <div
                className={cn(
                  'w-7 h-7 md:w-8 md:h-8 border-2 flex items-center justify-center transition-all shrink-0',
                  isSelected ? 'border-hud-cyan bg-hud-cyan' : 'border-border group-hover:border-hud-cyan/50',
                )}
              >
                {isSelected && <Check className="w-5 h-5 text-background" />}
              </div>
            </button>
          );
        })}
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

function MultiSelectGrid({
  options,
  selected,
  onToggle,
  error,
  columns = 2,
  hint,
}: {
  options: Option[];
  selected: string[];
  onToggle: (v: string) => void;
  error?: string;
  columns?: number;
  hint?: string;
}) {
  const colClass = columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div>
      {hint && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-hud-cyan/60 rounded-full" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {hint}
          </span>
        </div>
      )}
      <div className={cn('grid gap-3', colClass)}>
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className={cn(
                'group relative p-4 border text-left transition-all duration-200',
                isSelected
                  ? 'border-hud-cyan/60 bg-hud-cyan/10 text-hud-cyan'
                  : 'border-border bg-background/50 text-foreground hover:border-hud-cyan/30 hover:bg-card',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{opt.label}</span>
                <div
                  className={cn(
                    'w-4 h-4 border flex items-center justify-center transition-all',
                    isSelected ? 'border-hud-cyan bg-hud-cyan' : 'border-border group-hover:border-hud-cyan/40',
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 text-background" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

function ReadinessSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const t = useT();
  const r = t.audit.readiness;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
            {r.currentLabel}
          </div>
          <div className="font-mono text-5xl md:text-6xl font-bold text-hud-cyan tabular-nums glow-text-soft">
            {value}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
            {r.scaleLabel}
          </div>
          <div className="font-mono text-sm text-muted-foreground">
            {r.scaleHint}
          </div>
        </div>
      </div>

      <div className="relative pt-4">
        <div className="absolute top-0 left-0 right-0 flex justify-between px-1">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={cn(
                  'w-0.5 h-3',
                  i + 1 <= value ? 'bg-hud-cyan/60' : 'bg-border',
                )}
              />
              <span className="mt-1 font-mono text-[9px] text-muted-foreground/50">{i + 1}</span>
            </div>
          ))}
        </div>

        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 mt-6 appearance-none bg-transparent cursor-pointer audit-slider"
          aria-label={r.ariaLabel}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-hud-red/60 rounded-full" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.low}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-hud-amber/60 rounded-full" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.medium}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-hud-green/60 rounded-full" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.high}</span>
        </div>
      </div>
    </div>
  );
}

function ContactForm({
  data,
  errors,
  updateField,
}: {
  data: AuditData;
  errors: Record<string, string>;
  updateField: <K extends keyof AuditData>(field: K, value: AuditData[K]) => void;
}) {
  const t = useT();
  const c = t.audit.contact;

  const fields: { key: keyof AuditData; label: string; type: string; required: boolean; placeholder?: string; half?: boolean }[] = [
    { key: 'contactName', label: c.name, type: 'text', required: true, placeholder: c.namePlaceholder, half: true },
    { key: 'contactCompany', label: c.company, type: 'text', required: true, placeholder: c.companyPlaceholder, half: true },
    { key: 'contactPosition', label: c.position, type: 'text', required: true, placeholder: c.positionPlaceholder, half: true },
    { key: 'contactEmail', label: c.email, type: 'email', required: true, placeholder: c.emailPlaceholder, half: true },
    { key: 'contactPhone', label: c.phone, type: 'tel', required: false, placeholder: c.phonePlaceholder, half: true },
    { key: 'contactCountry', label: c.country, type: 'text', required: true, placeholder: c.countryPlaceholder, half: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field.key} className={cn('flex flex-col gap-1.5', !field.half && 'sm:col-span-2')}>
          <label htmlFor={field.key} className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {field.label}
            {field.required && <span className="text-hud-red ml-1">*</span>}
          </label>
          <input
            id={field.key}
            type={field.type}
            value={data[field.key] as string}
            onChange={(e) => updateField(field.key, e.target.value as string)}
            placeholder={field.placeholder}
            className={cn(
              'px-4 py-3 bg-background/50 border text-foreground placeholder:text-muted-foreground/40 transition-colors outline-none',
              errors[field.key as string]
                ? 'border-hud-red/50'
                : 'border-border focus:border-hud-cyan/50',
            )}
          />
          {errors[field.key as string] && (
            <span className="text-xs text-hud-red">{errors[field.key as string]}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mt-4 flex items-center gap-2 text-hud-red">
      <AlertCircle className="w-4 h-4 shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

function SubmittingView() {
  const t = useT();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-hud-cyan/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 md:px-8 text-center">
        <div className="mb-8">
          <Loader2 className="w-12 h-12 text-hud-cyan animate-spin mx-auto" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t.audit.submitting.title}
        </h2>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
          {t.audit.submitting.subtitle}
        </p>
      </div>
    </section>
  );
}

function SuccessView({ onRestart }: { onRestart: () => void }) {
  const t = useT();
  const [activeStep, setActiveStep] = useState(0);

  const processingSteps = [
    { label: t.audit.processingSteps.enterpriseData, icon: Database },
    { label: t.audit.processingSteps.analysis, icon: Brain },
    { label: t.audit.processingSteps.aiPotential, icon: Activity },
    { label: t.audit.processingSteps.futureProduction, icon: Factory },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < processingSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [processingSteps.length]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hud-green/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-hud-green/40 bg-hud-green/5 mb-8">
          <div className="w-2 h-2 bg-hud-green rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-hud-green">
            {t.audit.success.status}
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-cyan glow-text-soft mb-4">
          {t.audit.success.title}
        </h2>

        <p className="text-lg text-muted-foreground mb-12">
          {t.audit.success.message}
        </p>

        <div className="p-8 border border-border bg-card/40 corner-brackets">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {processingSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;
              return (
                <div key={i} className="flex items-center gap-4 md:gap-2">
                  <div
                    className={cn(
                      'flex flex-col items-center gap-2 transition-all duration-500',
                      isActive ? 'opacity-100' : 'opacity-30',
                    )}
                  >
                    <div
                      className={cn(
                        'w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border transition-all duration-500',
                        isCurrent
                          ? 'border-hud-cyan/60 bg-hud-cyan/10 text-hud-cyan glow-cyan animate-processing'
                          : isActive
                            ? 'border-hud-green/40 bg-hud-green/5 text-hud-green'
                            : 'border-border text-muted-foreground',
                      )}
                    >
                      {isActive && !isCurrent ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-widest transition-colors',
                        isActive ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < processingSteps.length - 1 && (
                    <div className="hidden md:block w-12 h-px bg-gradient-to-r from-hud-cyan/20 to-transparent relative overflow-hidden">
                      <div
                        className={cn(
                          'absolute top-0 left-0 h-full w-1/3 bg-hud-cyan/60 transition-all duration-500',
                          i < activeStep ? 'translate-x-[200%]' : 'translate-x-[-100%]',
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 p-4 border border-border bg-card/20">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.audit.success.info}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-border font-mono text-xs font-bold uppercase tracking-widest text-foreground hover:border-hud-cyan/40 hover:text-hud-cyan transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          {t.audit.buttons.restart}
        </button>
      </div>
    </section>
  );
}
