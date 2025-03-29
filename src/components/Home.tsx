import { component$ } from "@builder.io/qwik";

export const HomeComponent = component$(() => {
  return (
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Profit */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Total Profit</h3>
        <p class="text-2xl font-bold">$12,500</p>
      </div>

      {/* Total Sales */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Total Sales</h3>
        <p class="text-2xl font-bold">$45,000</p>
      </div>

      {/* Most Profitable Product */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Most Profitable Product</h3>
        <p class="text-2xl font-bold">Product A</p>
      </div>

      {/* Most Sold Product */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Most Sold Product</h3>
        <p class="text-2xl font-bold">Product B</p>
      </div>

      {/* Most Buying User */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Most Buying User</h3>
        <p class="text-2xl font-bold">John Doe</p>
      </div>

      {/* Most Debt User */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Most Debt User</h3>
        <p class="text-2xl font-bold">Jane Smith</p>
      </div>

      {/* Long Debt User */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Long Debt User</h3>
        <p class="text-2xl font-bold">Alice Johnson (Last payment: 2 months ago)</p>
      </div>

      {/* Low Stock */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Low Stock</h3>
        <p class="text-2xl font-bold">Product X</p>
      </div>

      {/* Total Expenses */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Total Expenses</h3>
        <p class="text-2xl font-bold">$7,000</p>
      </div>

      {/* Total Return */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Total Return</h3>
        <p class="text-2xl font-bold">$1,200</p>
      </div>

      {/* Top Asked Products */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Top Asked Products</h3>
        <p class="text-2xl font-bold">Product Y</p>
      </div>

      {/* Total Expired Products */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">Total Expired Products</h3>
        <p class="text-2xl font-bold">5</p>
      </div>

      {/* Remained Time for SaaS (Countdown) */}
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h3 class="text-xl font-semibold">SaaS Subscription</h3>
        <p class="text-2xl font-bold">Expires in 20 days</p>
      </div>
    </div>
  );
});
