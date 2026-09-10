import { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguageStore, Lang } from '@/stores/languageStore';

const LANGS: Array<{ code: Lang; label: string; short: string }> = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
];

const LanguageSwitcher = ({ compact = false }: { compact?: boolean }) => {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  if (compact) {
    // Mobile: two inline options, active one highlighted in gold.
    return (
      <div className="flex items-center gap-1">
        {LANGS.map((l, i) => (
          <span key={l.code} className="flex items-center gap-1">
            {i > 0 && <span className="text-gold/40 text-[11px]">·</span>}
            <button
              onClick={() => setLang(l.code)}
              className={`bg-transparent border-none cursor-pointer p-1 font-sans text-[12px] tracking-[0.15em] uppercase transition-colors ${
                lang === l.code ? 'text-gold font-medium' : 'text-warm-black/60 hover:text-gold'
              }`}
              aria-pressed={lang === l.code}
            >
              {l.short}
            </button>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-transparent border border-gold/30 hover:border-gold cursor-pointer px-3 py-2 transition-colors duration-200 group"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4 text-gold" strokeWidth={1.5} />
        <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-warm-black group-hover:text-gold transition-colors">
          {current.short}
        </span>
        <ChevronDown className={`w-3 h-3 text-warm-black/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-cream-light border border-gold/25 shadow-lg z-50 min-w-[150px]">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center justify-between gap-4 px-4 py-3 bg-transparent border-none cursor-pointer font-sans text-[12px] tracking-[0.1em] transition-colors ${
                lang === l.code ? 'text-gold font-medium bg-gold-pale/30' : 'text-warm-black hover:text-gold hover:bg-cream'
              }`}
            >
              <span>{l.label}</span>
              {lang === l.code && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
