import type { RequestHandler } from "@builder.io/qwik-city";

type Translation = Record<string, string>;

const translations: Record<string, Translation> = {
  en: {
    greeting: "Hello!",
    welcome: "Welcome!",
    goodbye: "Goodbye!",
  },
  fr: {
    greeting: "Bonjour!",
    welcome: "Bienvenue!",
    goodbye: "Au revoir!",
  },
  sw: {
    greeting: "Habari!",
    welcome: "Karibu!",
    goodbye: "Kwaheri!",
  },
  ar: {
    greeting: "مرحبا!",
    welcome: "أهلاً وسهلاً!",
    goodbye: "وداعاً!",
  },
};

export const onGet: RequestHandler = ({ query, json }) => {
  const lang = query.get("lang") || "en"; // Get the language from query params
  const key = query.get("key"); // Get the translation key
  
  // Ensure the lang exists in translations
  const translation = translations[lang];

  // Return the specific key translation
  if (key && translation[key]) {
    json(200, { message: translation[key] });
  } else {
    json(404, { message: "Translation not found" });
  }
};
