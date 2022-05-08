import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next).init({
    fallbackLng: "en",
    lng: "en",
    resources: {
      en: {
        translations: require("./locales/en/translations.json"),
      },
      fr: {
        translations: require("./locales/fr/translations.json"),
      },
      he: {
        translations: require("./locales/he/translations.json"),
      }

    },
    ns: ["translations"],
    defaultNS: "translations",
  });

i18n.languages = ["en", "fr", "he"];

export default i18n;
