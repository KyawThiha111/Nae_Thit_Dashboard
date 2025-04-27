// stores/languageStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: string;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      toggleLanguage: () => set((state) => ({
        language: state.language === 'en' ? 'my' : 'en'
      })),
    }),
    {
      name: 'lang', // unique name for localStorage
    }
  )
);