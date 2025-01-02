import { createI18n } from "vue-i18n";
const messages = Object.fromEntries(
  Object.entries(import.meta.glob("./locales/*.json", { eager: true })).map(
    ([key, value]) => [key.slice(10, -5), value.default]
  )
);

export default createI18n({
  defaultScope: "global",
  legacy: false,

  locale: "fr",
  fallbackLocale: "fr",

  messages,

  //fallbackWarn: false,
  //missingWarn: false
});
