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

export const SalesComponent = component$(() => {
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

  return (
    <>
    <div class="p-4">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-6 text-primary text-gray-800">
        💰 Mauzo Yaliyofanyika
        </h1>

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
                <td
                class={`p-2 font-semibold ${
                    sale.paymentType === 'Cash' ? 'text-green-600' : 'text-yellow-600'
                }`}
                >
                {sale.paymentType}
                </td>
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
    </>
  );
});
