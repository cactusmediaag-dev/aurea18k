import { useEffect, useState } from 'react';
import { Globe, X } from 'lucide-react';
import { useLanguageStore } from '@/stores/languageStore';

// Shown once to visitors whose browser is set to Spanish while the site is in
// English (the official default). Asks before switching — never automatic.
const LanguageSuggestionBanner = () => {
  const { lang, hasChosen, setLang, dismissSuggestion } = useLanguageStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasChosen || lang === 'es') return;
    const browserLangs = navigator.languages ?? [navigator.language];
    const prefersSpanish = browserLangs.some((l) => l?.toLowerCase().startsWith('es'));
    if (prefersSpanish) setVisible(true);
  }, [hasChosen, lang]);

  if (!visible) return null;

  const accept = () => { setLang('es'); setVisible(false); };
  const dismiss = () => { dismissSuggestion(); setVisible(false); };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-[520px] bg-dark-green border border-gold/40 shadow-xl px-5 py-4 flex items-center gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-3">
      <div className="flex items-center gap-3 flex-1">
        <Globe className="w-5 h-5 text-gold-light shrink-0" strokeWidth={1.5} />
        <p className="font-sans text-[13px] text-cream-light leading-snug m-0">
          ¿Prefieres ver Aurea Jewels en <em className="font-serif italic text-gold-light">español</em>?
        </p>
      </div>
      <div className="flex items-center gap-2 max-sm:w-full">
        <button
          onClick={accept}
          className="bg-gold text-warm-black hover:bg-gold-light transition-colors font-sans text-[11px] tracking-[0.15em] uppercase font-medium px-4 py-2.5 border-none cursor-pointer max-sm:flex-1"
        >
          Sí, en español
        </button>
        <button
          onClick={dismiss}
          className="bg-transparent text-cream-light/70 hover:text-cream-light transition-colors font-sans text-[11px] tracking-[0.1em] uppercase px-3 py-2.5 border border-cream-light/30 cursor-pointer max-sm:flex-1"
        >
          Keep English
        </button>
        <button
          onClick={dismiss}
          className="bg-transparent border-none cursor-pointer p-1 text-cream-light/50 hover:text-cream-light transition-colors max-sm:hidden"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LanguageSuggestionBanner;
