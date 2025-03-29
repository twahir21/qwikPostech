// src/i18n.ts
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize i18next and configure backend
export const setupI18n = async () => {
  await i18next.use(Backend).init({
    fallbackLng: "en",
    backend: {
      loadPath: path.join(__dirname, "languages/{{lng}}.json"), // Load language files
    },
    interpolation: { escapeValue: false },
  });
};

// Get translation function
export const t = (key: string) => i18next.t(key);
