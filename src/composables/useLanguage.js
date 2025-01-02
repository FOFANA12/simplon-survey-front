import { useI18n } from "vue-i18n";

export function useLanguage() {
  const { locale } = useI18n();
  
  const changeLanguage = (lang) => {
    locale.value = lang;
  };

  return {
    locale,
    changeLanguage,
  };
}
