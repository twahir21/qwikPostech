// src/components/SalesPage.tsx
import { component$, useSignal } from "@builder.io/qwik";

type Sale = {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: "Paid" | "Debt";
};

export default component$(() => {
  const search = useSignal("");
  const sales: Sale[] = [
    { id: "S001", date: "2025-04-16", customer: "John Doe", amount: 120000, status: "Paid" },
    { id: "S002", date: "2025-04-16", customer: "Jane Smith", amount: 85000, status: "Debt" },
    { id: "S003", date: "2025-04-15", customer: "Michael Brown", amount: 220000, status: "Paid" },
    { id: "S004", date: "2025-04-14", customer: "Alice Johnson", amount: 105000, status: "Paid" },
    { id: "S005", date: "2025-04-13", customer: "Robert Lee", amount: 67000, status: "Debt" },
  ];

  const filtered = sales.filter(
    (sale) =>
      sale.customer.toLowerCase().includes(search.value.toLowerCase()) ||
      sale.id.includes(search.value)
  );

  const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
  const todaySales = sales.filter((s) => s.date === "2025-04-16").reduce((sum, s) => sum + s.amount, 0);
  const totalCustomers = new Set(sales.map((s) => s.customer)).size;

  return (
    <div class="p-4 max-w-5xl mx-auto">
      <h1 class="text-xl font-bold mb-4">📊 Sales Dashboard</h1>

      {/* Summary Cards */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-blue-100 rounded-xl p-4">
          <h2 class="text-sm text-gray-600">Total Sales</h2>
          <p class="text-2xl font-semibold">{totalSales.toLocaleString()} Tsh</p>
        </div>
        <div class="bg-green-100 rounded-xl p-4">
          <h2 class="text-sm text-gray-600">Today’s Sales</h2>
          <p class="text-2xl font-semibold">{todaySales.toLocaleString()} Tsh</p>
        </div>
        <div class="bg-purple-100 rounded-xl p-4">
          <h2 class="text-sm text-gray-600">Total Customers</h2>
          <p class="text-2xl font-semibold">{totalCustomers}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div class="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by ID or Customer"
          class="w-full p-2 border rounded-md"
          value={search.value}
          onInput$={(e) => (search.value = (e.target as HTMLInputElement).value)}
        />
      </div>

      {/* Sales Table */}
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Date</th>
              <th class="px-4 py-2">Customer</th>
              <th class="px-4 py-2">Amount</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} class="text-center text-red-500 py-4">No sales found.</td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} class="border-b">
                  <td class="px-4 py-2">{s.id}</td>
                  <td class="px-4 py-2">{s.date}</td>
                  <td class="px-4 py-2">{s.customer}</td>
                  <td class="px-4 py-2">{s.amount.toLocaleString()} Tsh</td>
                  <td class={`px-4 py-2 font-semibold ${s.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                    {s.status}
                  </td>
                  <td class="px-4 py-2">
                    <button class="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div class="flex justify-between items-center mt-4 text-sm">
        <button class="bg-gray-300 px-4 py-1 rounded">Previous</button>
        <span>Page 1 of 1</span>
        <button class="bg-gray-300 px-4 py-1 rounded">Next</button>
      </div>
    </div>
  );
});
