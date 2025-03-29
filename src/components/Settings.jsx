import { component$ } from "@builder.io/qwik";

export const SettingComponent = component$(() => {
    return (
        <>
                    <select 
          class="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-2 px-2 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
        >
          <option value="en">🇬🇧 English</option>
          <option value="ar">🇸🇦 العربية</option>
          <option value="sw">🇹🇿 Swahili</option>
          <option value="fr">🇫🇷 Français</option>
        </select>
        </>
    )
});