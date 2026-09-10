import { useLanguageStore, Lang } from '@/stores/languageStore';
import { translations, Translations, TitleSegment, SectionTitle } from '@/i18n/translations';

export type { Lang, Translations, TitleSegment, SectionTitle };
export { translations };

// React hook: returns the active dictionary (re-renders on language change).
export function useT(): Translations {
  const lang = useLanguageStore((s) => s.lang);
  return translations[lang];
}

export function useLang(): Lang {
  return useLanguageStore((s) => s.lang);
}

// Non-React access (stores, libs, toasts fired outside components).
export function t(): Translations {
  return translations[useLanguageStore.getState().lang];
}
