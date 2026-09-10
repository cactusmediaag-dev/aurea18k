import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'en' | 'es';

interface LanguageState {
  lang: Lang;
  // true once the visitor has explicitly picked a language (switcher or banner),
  // so we never show the suggestion banner again.
  hasChosen: boolean;
  setLang: (lang: Lang) => void;
  dismissSuggestion: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: 'en',
      hasChosen: false,
      setLang: (lang) => set({ lang, hasChosen: true }),
      dismissSuggestion: () => set({ hasChosen: true }),
    }),
    { name: 'aurea-language' },
  ),
);
