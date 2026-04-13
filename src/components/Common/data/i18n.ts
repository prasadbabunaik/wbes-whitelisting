import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationGr from "@common/locales/gr.json";
import translationIT from "@common/locales/it.json";
import translationRS from "@common/locales/ru.json";
import translationSP from "@common/locales/sp.json";
import translationENG from "@common/locales/en.json";
import translationCN from "@common/locales/ch.json";
import translationFR from "@common/locales/fr.json";
import translationAR from "@common/locales/ar.json";

// the translations
const resources = {
  gr: {
    translation: translationGr,
  },
  it: {
    translation: translationIT,
  },
  rs: {
    translation: translationRS,
  },
  sp: {
    translation: translationSP,
  },
  en: {
    translation: translationENG,
  },
  cn: {
    translation: translationCN,
  },
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR,
  },
};

// Determine initial language setting only in browser
let language = "en";
if (typeof window !== "undefined") {
  const storedLang = localStorage.getItem("I18N_LANGUAGE");
  if (storedLang) {
    language = storedLang;
  } else {
    localStorage.setItem("I18N_LANGUAGE", language);
  }
}
i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language,
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
