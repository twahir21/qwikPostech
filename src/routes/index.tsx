import type { DocumentHead } from "@builder.io/qwik-city";
import { component$, useStore, $ } from "@builder.io/qwik";

export default component$(() => {
  const store = useStore({
    isSidebarOpen: false,
  });

  const toggleSidebar = $(() => {
    store.isSidebarOpen = !store.isSidebarOpen;
  });

  return (
    <div class="flex h-screen">
      {/* Sidebar */}
      <div
        class={`bg-gray-800 text-white w-16 md:w-64 transition-all duration-300 ${
          store.isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div class="flex justify-between items-center px-4 py-2">
          <span class="text-xl font-bold">POS</span>
          <button class="md:hidden" onClick$={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav class="mt-10">
          <ul>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>🏠</span> Home</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>💰</span> Sales</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>📊</span> Analytics</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>🧾</span> Receipts</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>💳</span> Debt</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>💸</span> Expenses</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>📉</span> Graph</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>📦</span> Products</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>👥</span> Customers</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-700"><span>🔗</span> Suppliers</a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div class="flex-1 p-6">
        {/* Cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Scan QR Code Card */}
          <div class="bg-white shadow-lg rounded-lg p-4">
            <h3 class="text-lg font-semibold">📱 Scan QR Code</h3>
            <button class="bg-blue-500 text-white p-2 rounded mt-4 w-full">Scan Now</button>
          </div>

          {/* Total Profit Card */}
          <div class="bg-white shadow-lg rounded-lg p-4">
            <h3 class="text-lg font-semibold">💵 Total Profit</h3>
            <p class="text-xl mt-2">$10,000</p>
          </div>

          {/* Low Stock Card */}
          <div class="bg-white shadow-lg rounded-lg p-4">
            <h3 class="text-lg font-semibold">⚠️ Low Stock</h3>
            <p class="mt-2">10 items remaining</p>
          </div>

          {/* Expired Products Card */}
          <div class="bg-white shadow-lg rounded-lg p-4">
            <h3 class="text-lg font-semibold">❌ Expired Products</h3>
            <p class="mt-2">3 products expired today</p>
          </div>

          {/* Sales Card */}
          <div class="bg-white shadow-lg rounded-lg p-4">
            <h3 class="text-lg font-semibold">💸 Sales</h3>
            <p class="mt-2">Total Sales: $5,000</p>
          </div>

          {/* Expenses Card */}
          <div class="bg-white shadow-lg rounded-lg p-4">
            <h3 class="text-lg font-semibold">💳 Expenses</h3>
            <p class="mt-2">Total Expenses: $1,200</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "POS Dashboard",
  meta: [
    {
      name: "description",
      content: "A Point of Sale (POS) Dashboard built with Qwik",
    },
  ],
};
