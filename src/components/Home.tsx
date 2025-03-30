import { component$ } from "@builder.io/qwik";
import { Translate } from "./Language";
import { RecentProductsTable } from "./Recent";

export const HomeComponent = component$((props: {lang: string}) => {
  return (
    <>
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Profit */}
      <div class="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="profit" class="pr-1.5">💵</span> Total Profit
        </h3>
        <p class="text-3xl font-bold">$12,500</p>
      </div>

      {/* Total Sales */}
      <div class="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="sales" class="pr-1.5">📈</span> Total Sales
        </h3>
        <p class="text-3xl font-bold">$45,000</p>
      </div>

      {/* Most Profitable Product */}
      <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="product" class="pr-1.5">🛒</span> Most Profitable Product
        </h3>
        <p class="text-2xl font-semibold">Product A</p>
      </div>

      {/* Most Sold Product */}
      <div class="bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="sold" class="pr-1.5">🔥</span> Most Sold Product
        </h3>
        <p class="text-2xl font-semibold">Product B</p>
      </div>

      {/* Most Buying User */}
      <div class="bg-gradient-to-r from-pink-400 to-red-500 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="user" class="pr-1.5">👤</span> Most Buying User
        </h3>
        <p class="text-2xl font-semibold">John Doe</p>
      </div>

      {/* Most Debt User */}
      <div class="bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="debt" class="pr-1.5">💳</span> Most Debt User
        </h3>
        <p class="text-2xl font-semibold">Jane Smith</p>
      </div>

      {/* Long Debt User */}
      <div class="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="long-debt" class="pr-1.5">⏳</span> Long Debt User
        </h3>
        <p class="text-2xl font-semibold">Alice Johnson <span class="text-sm text-gray-200">(Last payment: 2 months ago)</span></p>
      </div>

      {/* Low Stock */}
      <div class="bg-gradient-to-r from-red-500 to-yellow-600 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="low-stock" class="pr-1.5">⚠️</span> Low Stock
        </h3>
        <p class="text-2xl font-semibold">Product X</p>
      </div>

      {/* Total Expenses */}
      <div class="bg-gradient-to-r from-indigo-400 to-blue-500 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="expenses" class="pr-1.5">💸</span> Total Expenses
        </h3>
        <p class="text-2xl font-semibold">$7,000</p>
      </div>

      {/* Total Return */}
      <div class="bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="return" class="pr-1.5">🔄</span> Total Return
        </h3>
        <p class="text-2xl font-semibold">$1,200</p>
      </div>

      {/* Top Asked Products */}
      <div class="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="asked-product" class="pr-1.5">❓</span> Top Asked Products
        </h3>
        <p class="text-2xl font-semibold">Product Y</p>
      </div>

      {/* Total Expired Products */}
      <div class="bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="expired" class="pr-1.5">📅</span> Total Expired Products
        </h3>
        <p class="text-2xl font-semibold">5</p>
      </div>

      {/* Remained Time for SaaS (Countdown) */}
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg p-4 rounded-lg">
        <h3 class="text-lg font-medium flex items-center">
          <span role="img" aria-label="countdown" class="pr-1.5">⏰</span> SaaS Subscription
        </h3>
        <p class="text-2xl font-semibold">Expires in 20 days</p>
      </div>
    </div>

    <Translate lang={props.lang} keys={['greeting', 'welcome', 'goodbye']} />

    <RecentProductsTable />
    </>
  );
});
