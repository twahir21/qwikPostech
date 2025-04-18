import { component$, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import logo from "/newLogo.png";
import { HomeComponent } from "~/components/Home";
import { ProductComponent } from "~/components/Products";
import { CustomerComponent } from "~/components/Customer";
import { CrudPrdComponent } from "~/components/PrdComponent";
import { UsageComponent } from "~/components/Usage";
import { SalesComponent } from "~/components/Sales";
import { AnalyticsComponent } from "~/components/Analytics";
import { DebtComponent } from "~/components/Debts";
import { ExpensesComponent } from "~/components/Expenses";
import { SuppCrudComponent } from "~/components/Supp";
import { SettingsComponent } from "~/components/Settings";

// Example translations (you can fetch these from an API or external file)
const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome, {username}",
    home: "Home",
    sales: "Sales",
    analytics: "Analytics",
    receipts: "Receipts",
    debt: "Debt Management",
    expenses: "Expenses Overview",
    graph: "Graph Reports",
    products: "Products Inventory",
    customers: "Customers List",
    suppliers: "Suppliers Directory",
    settings: "Settings",
    start: "Get Started",
    guide: "Guide"
  },
  ar: {
    welcome: "أهلاً، {username}",
    home: "الصفحة الرئيسية",
    sales: "المبيعات",
    analytics: "التحليلات",
    receipts: "الإيصالات",
    debt: "إدارة الديون",
    expenses: "نظرة عامة على المصاريف",
    graph: "تقارير الرسوم البيانية",
    products: "مخزون المنتجات",
    customers: "قائمة العملاء",
    suppliers: "دليل الموردين",
    settings: "الإعدادات",
    start: "ابدأ" ,
    guide: "دليل"

  },
  sw: {
    welcome: "Karibu, {username}",
    home: "Nyumbani",
    sales: "Mauzo",
    analytics: "Takwimu",
    receipts: "Risiti",
    debt: "Usimamizi wa Madeni",
    expenses: "Muhtasari wa Gharama",
    graph: "Ripoti za Picha",
    products: "Hisa za Bidhaa",
    customers: "Orodha ya Wateja",
    suppliers: "Orodha ya Wauzaji",
    settings: "Mipangilio",
    start: "Anza hapa",
    guide: "Mwongozo"

  },
  fr: {
    welcome: "Bienvenue, {username}",
    home: "Accueil",
    sales: "Ventes",
    analytics: "Analytique",
    receipts: "Reçus",
    debt: "Gestion de la Dette",
    expenses: "Aperçu des Dépenses",
    graph: "Graphiques",
    products: "Inventaire des Produits",
    customers: "Liste des Clients",
    suppliers: "Répertoire des Fournisseurs",
    settings: "Paramètres",
    start: "Commencer ici",
    guide: "Guide"

  },
};

export default component$(() => {
  const store = useStore({
    isSidebarOpen: false,
    currentPage: "home",
    selectedLanguage: "en", // Default language
    input: "",
    showCalculator: false,
    username: "", // Default username
  });

  const toggleSidebar = $(() => {
    store.isSidebarOpen = !store.isSidebarOpen;
  });

  const handleButtonClick = $((value: string) => {
    if (value === "C") {
      store.input = "";
    } else if (value === "=") {
      try {
        store.input = store.input = Function('"use strict"; return (' + store.input + ')')();

      } catch {
        store.input = "Error";
      }
    } else {
      store.input += value;
    }
  });



  const navigate = $((page: string) => {
    store.currentPage = page;
    if (window.innerWidth < 768) store.isSidebarOpen = false; // Close on mobile
  });




  const translate = (key: string) => {
    const translation = translations[store.selectedLanguage][key] || key;
    // Replace {username} placeholder with actual username
    return translation.replace("{username}", store.username);
  };

  // Load selected language from localStorage when component is visible
  useVisibleTask$(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      store.selectedLanguage = savedLanguage;
    }
  });

    // Update username from localStorage when the component becomes visible
  useVisibleTask$(() => {
    const username = localStorage.getItem("username") || "Guest";
      // Utility function to capitalize the first letter of each word
    const capitalizeWords = (username: string) => {
      return username
        .trim() // Remove leading/trailing spaces
        .split(' ') // Split by space to handle multi-word names
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
        .join(' '); // Rejoin words with a space
    };
    store.username = capitalizeWords(username);
  });  
  
  // Logout function
  const navigateLogout = useNavigate();

  const logout = $(() => {
    // Delete the authentication cookie
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // Optionally clear any localStorage items related to the user
    localStorage.removeItem("username");

    // Redirect to the login page or home page
    navigateLogout("/auth");  
  });




    // Update localStorage when language changes
    const handleLanguageChange = $((event: Event) => {
      const newLanguage = (event.target as HTMLSelectElement).value;
      store.selectedLanguage = newLanguage;
      localStorage.setItem("selectedLanguage", newLanguage);
    });

  return (
    <div class="flex min-h-screen">
      {/* Sidebar & Overlay */}
      <aside
        class={`bg-gray-800 text-white fixed inset-y-0 left-0 transform transition-all duration-300 md:relative md:translate-x-0 w-64 p-4 z-50 ${
          store.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button class="md:hidden absolute top-4 right-4 text-white" onClick$={toggleSidebar}>
          ✖
        </button>
        <span class="inline-flex items-center pl-1">
          <img 
            src={logo} 
            alt="Profile" 
            class="w-10 h-10 rounded-full border-2 border-blue-600 ml-2" 
            width="70" 
            height="70" 
          />
          <p class="pl-2">PosTech</p>
        </span>

        <nav class="mt-5">
          {[
            { name: "home", emoji: "🏠" },
            { name: "guide", emoji: "📖" },
            { name: "start", emoji: "🚀" },
            { name: "sales", emoji: "💰" },
            { name: "analytics", emoji: "📊" },
            { name: "receipts", emoji: "🧾" },
            { name: "debt", emoji: "💳" },
            { name: "expenses", emoji: "💸" },
            { name: "graph", emoji: "📉" },
            { name: "products", emoji: "📦" },
            { name: "customers", emoji: "👥" },
            { name: "suppliers", emoji: "🔗" },
            { name: "settings", emoji: "⚙️" },
          ].map(({ name, emoji }) => (
            <button
              key={name}
              class="block w-full text-left py-2 px-4 hover:bg-gray-700"
              onClick$={() => navigate(name)}
            >
              <span class="mr-2">{emoji}</span>{translate(name)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {store.isSidebarOpen && (
        <div class="fixed inset-0 bg-opacity-50 md:hidden" onClick$={toggleSidebar}></div>
      )}

      {/* Main Content */}
      <div class="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header class="bg-white shadow-md p-4 flex justify-between items-center">
          <button class="md:hidden" onClick$={toggleSidebar}>☰</button>
          <h1>Dashboard</h1>
          <div class="flex gap-5">
            <select
              class="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-2 px-2 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
              onChange$={handleLanguageChange}
              value={store.selectedLanguage}
            >
              <option value="en">🇬🇧 English</option>
              <option value="ar">🇸🇦 العربية</option>
              <option value="sw">🇹🇿 Swahili</option>
              <option value="fr">🇫🇷 Français</option>
            </select>

            <div class="relative">
              <button
                class="p-2 text-white rounded"
                onClick$={() => (store.showCalculator = true)}
              >
                📱
              </button>

              {store.showCalculator && (
                <div class="fixed inset-0 flex justify-end items-center bg-opacity-50">
                  <div class="bg-white p-6 rounded-lg shadow-lg w-80 relative border-2 border-b-blue-900">
                    <button
                      class="absolute top-2 right-2 text-gray-600 hover:text-red-600 pb-2"
                      onClick$={() => (store.showCalculator = false)}
                    >
                      ✖
                    </button>
                    <input
                      type="text"
                      class="w-full p-2 text-right text-xl border rounded mb-4 mr-4 mt-4"
                      value={store.input}
                      disabled
                    />
                    <div class="grid grid-cols-4 gap-2">
                      {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "C", "=", "+"].map(
                        (btn) => (
                          <button
                            key={btn}
                            class={`p-4 rounded text-xl ${
                              btn === "C" ? "bg-red-500 text-white" :
                              btn === "=" ? "bg-gray-900 text-white" :
                              "bg-gray-200"
                            }`}
                            onClick$={() => handleButtonClick(btn)}
                          >
                            {btn}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button title="Logout" onClick$={logout}> ⏻ </button>

            {/* <button title="profile"> 👤 </button> */}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main class="p-6">
          <h1 class="text-xl font-bold pb-2">{translate("welcome")}</h1>

          {store.currentPage === "home" && <HomeComponent lang={store.selectedLanguage} />}
          {store.currentPage === "guide" && <UsageComponent />}
          {store.currentPage === "start" &&  <ProductComponent lang={store.selectedLanguage} />}
          {store.currentPage === "sales" && <SalesComponent />}
          {store.currentPage === "analytics" && <AnalyticsComponent />}
          {store.currentPage === "receipts" && <p>🧾 {translate("receipts")} Page</p>}
          {store.currentPage === "debt" && <DebtComponent />}
          {store.currentPage === "expenses" && <ExpensesComponent />}
          {store.currentPage === "graph" && <p>📉 {translate("graph")} Reports</p>}
          {store.currentPage === "products" && <CrudPrdComponent lang={store.selectedLanguage}/> }
          {store.currentPage === "customers" && <CustomerComponent lang={store.selectedLanguage}/>}
          {store.currentPage === "suppliers" && <SuppCrudComponent lang={store.selectedLanguage}/>} 
          {store.currentPage === "settings" && <SettingsComponent />}
        </main>
      </div>
    </div>
  );
});


export const head: DocumentHead = {
  title: "POS Dashboard - Manage Sales and Inventory",
  meta: [
    // Basic meta tags
    { name: "description", content: "A Point of Sale (POS) Dashboard built with Qwik to manage sales, inventory, and customer data." },
    { name: "keywords", content: "POS, dashboard, sales management, inventory management, Qwik, e-commerce, point of sale system" },
    { name: "author", content: "Twahir Sudy" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },

    // Open Graph (OG) tags for social media
    { property: "og:title", content: "POS Dashboard - Manage Sales and Inventory" },
    { property: "og:description", content: "A modern POS system built with Qwik to efficiently manage sales and inventory in real-time." },
    { property: "og:image", content: "https://mypostech.store/assets/images/pos-dashboard-thumbnail.jpg" },
    { property: "og:url", content: "https://mypostech.store/dashboard" },
    { property: "og:type", content: "website" },

    // Twitter Card meta tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "POS Dashboard - Manage Sales and Inventory" },
    { name: "twitter:description", content: "A modern POS system built with Qwik to efficiently manage sales and inventory in real-time." },
    { name: "twitter:image", content: "https://mypostech.store/assets/images/pos-dashboard-thumbnail.jpg" },

    // Structured Data (JSON-LD) for enhanced SEO
    {
      name: "application/ld+json",
      content: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "POS Dashboard",
        "description": "A Point of Sale (POS) Dashboard built with Qwik to manage sales, inventory, and customer data.",
        "url": "https://mypostech.store/dashboard",
        "author": {
          "@type": "Twahir Sudy",
          "name": "MyPOS",
          "url": "https://mypostech.store"
        },
        "publisher": {
          "@type": "Twahir Sudy",
          "name": "MyPOS",
          "logo": {
            "@type": "ImageObject",
            "url": "https://mypostech.store/public/newLogo.png"
          }
        }
      })
    }
  ]
};
