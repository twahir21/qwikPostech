import { component$, useStore } from "@builder.io/qwik";
import { translations } from "~/components/global/translation";
import type { LanguageCode } from "~/components/global/translation";
import { LanguageSwitcher } from "~/components/Language";

export default component$(() => {
  const store = useStore({
    language: "en" as LanguageCode, // default language
  });

  return (
    <div>
      {/* Language Switcher */}
      <div class="mb-4">
        <LanguageSwitcher store={store} />
      </div>

      {/* Main content */}
      <div>
        <h1>{translations[store.language].home}</h1>
        <nav>
          <button>{translations[store.language].sales}</button>
          <button>{translations[store.language].analytics}</button>
          <button>{translations[store.language].receipts}</button>
          <button>{translations[store.language].debt}</button>
          <button>{translations[store.language].expenses}</button>
          <button>{translations[store.language].graph}</button>
          <button>{translations[store.language].products}</button>
          <button>{translations[store.language].customers}</button>
          <button>{translations[store.language].suppliers}</button>
          <button>{translations[store.language].settings}</button>
        </nav>
      </div>
    </div>
  );
});
