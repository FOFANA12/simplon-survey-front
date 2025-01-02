import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    languages: {
      en: {
        name: 'English',
        code: 'en',
      },
      fr: {
        name: 'Français',
        code: 'fr',
      },
    },
  }),
});
