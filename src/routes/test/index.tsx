import { component$, useSignal, useStore } from '@builder.io/qwik';
import { format } from 'date-fns';

interface DummySale {
  id: number;
  date: string;
  total: number;
  paymentType: string;
  customer: string;
  products: { name: string; qty: number }[];
}

export default component$(() => {
  const dateFilter = useSignal('today');
  const search = useSignal('');

  const filters = useStore({
    startDate: '',
    endDate: '',
  });

  const salesData: DummySale[] = [
    {
      id: 1,
      date: new Date().toISOString(),
      total: 20000,
      paymentType: 'Cash',
      customer: 'John Doe',
      products: [
        { name: 'Soda', qty: 3 },
        { name: 'Chips', qty: 2 },
      ],
    },
    {
      id: 2,
      date: new Date().toISOString(),
      total: 15000,
      paymentType: 'Debt',
      customer: 'Jane Smith',
      products: [{ name: 'Milk', qty: 1 }],
    },
    {
      id: 3,
      date: new Date().toISOString(),
      total: 10000,
      paymentType: 'Cash',
      customer: 'Ali Musa',
      products: [{ name: 'Bread', qty: 4 }],
    },
  ];

  // Simulate search filter
  const filteredSales = salesData.filter((sale) =>
    sale.customer.toLowerCase().includes(search.value.toLowerCase())
  );

    // Dummy analytics data
    const analytics = {
        totalSales: 125000,
        totalProfit: 48000,
        totalExpenses: 32000,
        netProfit: 16000,
        mostSold: [
          { name: 'Soda 500ml', sold: 150 },
          { name: 'Bread', sold: 120 },
          { name: 'Sugar 1kg', sold: 90 },
        ],
        lowestStock: [
          { name: 'Milk 1L', stock: 2 },
          { name: 'Cooking Oil 500ml', stock: 4 },
        ],
      };

  return (
    <>
        <div class="p-4">
      {/* Filters */}
      <div class="flex flex-wrap gap-2 mb-4">
        <select
          class="border px-3 py-2 rounded"
          value={dateFilter.value}
          onChange$={(e) => (dateFilter.value = (e.target as HTMLSelectElement).value)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
          <option value="custom">Custom</option>
        </select>
        {dateFilter.value === 'custom' && (
          <>
            <input
              type="date"
              class="border px-3 py-2 rounded"
              onChange$={(e) => (filters.startDate = (e.target as HTMLInputElement).value)}
            />
            <input
              type="date"
              class="border px-3 py-2 rounded"
              onChange$={(e) => (filters.endDate = (e.target as HTMLInputElement).value)}
            />
          </>
        )}
        <input
          type="text"
          placeholder="Search customer"
          class="border px-3 py-2 rounded flex-1"
          onInput$={(e) => (search.value = (e.target as HTMLInputElement).value)}
        />
      </div>

      {/* Sales Table */}
      <div class="overflow-x-auto border rounded shadow">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2">Date</th>
              <th class="p-2">Products</th>
              <th class="p-2">Total</th>
              <th class="p-2">Payment</th>
              <th class="p-2">Customer</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id} class="border-t">
                <td class="p-2">{format(new Date(sale.date), 'dd MMM yyyy')}</td>
                <td class="p-2">{sale.products.map((p) => `${p.name} x${p.qty}`).join(', ')}</td>
                <td class="p-2">{Intl.NumberFormat().format(sale.total)}</td>
                <td class="p-2">{sale.paymentType}</td>
                <td class="p-2">{sale.customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Buttons */}
      <div class="flex justify-between items-center mt-4">
        <button class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-900">Export CSV</button>
      </div>
    </div>

<div class="p-4 space-y-4">
{/* Summary Cards */}
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div class="bg-green-100 text-green-800 p-4 rounded shadow text-center">
    <p class="text-sm">Total Sales</p>
    <p class="text-xl font-bold">TSh {analytics.totalSales.toLocaleString()}</p>
  </div>
  <div class="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
    <p class="text-sm">Profit</p>
    <p class="text-xl font-bold">TSh {analytics.totalProfit.toLocaleString()}</p>
  </div>
  <div class="bg-red-100 text-red-800 p-4 rounded shadow text-center">
    <p class="text-sm">Expenses</p>
    <p class="text-xl font-bold">TSh {analytics.totalExpenses.toLocaleString()}</p>
  </div>
  <div class="bg-purple-100 text-purple-800 p-4 rounded shadow text-center">
    <p class="text-sm">Net Profit</p>
    <p class="text-xl font-bold">TSh {analytics.netProfit.toLocaleString()}</p>
  </div>
</div>

{/* Most Sold Products */}
<div class="bg-white border rounded shadow p-4">
  <h2 class="text-lg font-semibold mb-2">🔥 Most Sold Products</h2>
  <ul class="space-y-1">
    {analytics.mostSold.map((item) => (
      <li key={item.name} class="flex justify-between border-b pb-1">
        <span>{item.name}</span>
        <span>{item.sold} pcs</span>
      </li>
    ))}
  </ul>
</div>

{/* Lowest Stock */}
<div class="bg-white border rounded shadow p-4">
  <h2 class="text-lg font-semibold mb-2">📉 Low Stock Warning</h2>
  <ul class="space-y-1">
    {analytics.lowestStock.map((item) => (
      <li key={item.name} class="flex justify-between border-b pb-1 text-red-600">
        <span>{item.name}</span>
        <span>{item.stock} left</span>
      </li>
    ))}
  </ul>
</div>
</div>
    </>
  );
});
