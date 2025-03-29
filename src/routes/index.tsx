import { component$, useStore, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import logo from "/newLogo.png";
import { HomeComponent } from "~/components/Home";

export default component$(() => {
  const store = useStore({
    isSidebarOpen: false,
    currentPage: "home",
  });

  const toggleSidebar = $(() => {
    store.isSidebarOpen = !store.isSidebarOpen;
  });

  const navigate = $((page: string) => {
    store.currentPage = page;
    if (window.innerWidth < 768) store.isSidebarOpen = false; // Close on mobile
  });

  return (
    <div class="flex h-screen overflow-hidden">
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
            { name: "sales", emoji: "💰" },
            { name: "analytics", emoji: "📊" },
            { name: "receipts", emoji: "🧾" },
            { name: "debt", emoji: "💳" },
            { name: "expenses", emoji: "💸" },
            { name: "graph", emoji: "📉" },
            { name: "products", emoji: "📦" },
            { name: "customers", emoji: "👥" },
            { name: "suppliers", emoji: "🔗" },
          ].map(({ name, emoji }) => (
            <button
              key={name}
              class="block w-full text-left py-2 px-4 hover:bg-gray-700"
              onClick$={() => navigate(name)}
            >
              <span class="mr-2">{emoji}</span>{name.charAt(0).toUpperCase() + name.slice(1)}
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
          <h1 class="text-xl font-bold">Welcome, Twahir</h1>
          <div class="flex gap-4">
            <button title="calculator">
              📱
            </button>
            <button title="Add Product">➕</button>
            <button title="Notification"> 🔔 </button>
            <button title="profile"> 👤 </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main class="p-6">
          {store.currentPage === "home" && <HomeComponent />}
          {store.currentPage === "sales" && <p>💰 Sales Page</p>}
          {store.currentPage === "analytics" && <p>📊 Analytics Page</p>}
          {store.currentPage === "receipts" && <p>🧾 Receipts Page</p>}
          {store.currentPage === "debt" && <p>💳 Debt Management</p>}
          {store.currentPage === "expenses" && <p>💸 Expenses Overview</p>}
          {store.currentPage === "graph" && <p>📉 Graph Reports</p>}
          {store.currentPage === "products" && <p>📦 Products Inventory</p>}
          {store.currentPage === "customers" && <p>👥 Customers List</p>}
          {store.currentPage === "suppliers" && <p>🔗 Suppliers Directory</p>}
        </main>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "POS Dashboard",
  meta: [
    { name: "description", content: "A Point of Sale (POS) Dashboard built with Qwik" },
  ],
};
