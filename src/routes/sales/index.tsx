import { component$, useSignal, useVisibleTask$, useStore } from '@builder.io/qwik';
import { format } from 'date-fns';
import { fetchWithLang } from '../function/fetchLang';

export default component$(() => {
  const dateFilter = useSignal('today');
  const search = useSignal('');

  const filters = useStore({
    startDate: '',
    endDate: '',
  });

  const salesData = useVisibleTask$(async ({ track }) => {
    track(() => dateFilter.value);
    track(() => search.value);
    track(() => filters.startDate);
    track(() => filters.endDate);

    const res = await fetchWithLang(
      `http://localhost:3000/sales?filter=${dateFilter.value}&search=${search.value}&start=${filters.startDate}&end=${filters.endDate}`
    );
    return res.json();
  });

  return (
    <div class="p-4">
      {/* Date Filter */}
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
          placeholder="Search product or customer"
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
            {salesData.value?.map((sale) => (
              <tr key={sale.id} class="border-t">
                <td class="p-2">{format(new Date(sale.date), 'dd MMM yyyy')}</td>
                <td class="p-2">{sale.products.map((p: any) => `${p.name} x${p.qty}`).join(', ')}</td>
                <td class="p-2">{Intl.NumberFormat().format(sale.total)}</td>
                <td class="p-2">{sale.paymentType}</td>
                <td class="p-2">{sale.customer || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export and Create */}
      <div class="flex justify-between items-center mt-4">
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Export CSV</button>
        <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ New Sale</button>
      </div>
    </div>
  );
});
