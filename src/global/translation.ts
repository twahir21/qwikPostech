import { createContextId } from "@builder.io/qwik";
import i18next from "i18next";

export const I18nContext = createContextId<{ lang: string; t: (key: string) => string }>("i18n");

export const setupI18n = async () => {
  await i18next.init({
    fallbackLng: "en",
    resources: {
      en: { translation: { welcome: "Welcome to POS Tech", sales: "Sales" } },
      sw: { translation: { welcome: "Karibu PosTech", sales: "Mauzo" } },
    },
  });
};

export const changeLanguage = async (lang: string) => {
  await i18next.changeLanguage(lang);
};

export const t = (key: string) => i18next.t(key);
