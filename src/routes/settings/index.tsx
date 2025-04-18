import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const receipts = [
    { id: 1, customer: 'John Doe', total: 20000, paymentType: 'Cash', date: '2025-04-18' },
    { id: 2, customer: 'Jane Smith', total: 15000, paymentType: 'Debt', date: '2025-04-17' },
    { id: 3, customer: 'Ali Musa', total: 10000, paymentType: 'Cash', date: '2025-04-16' },
  ];

  const searchQuery = useSignal('');

  const filteredReceipts = receipts.filter((receipt) =>
    receipt.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  return (
    <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md">
        {/* Receipt Search and Filter */}
        <div class="px-6 py-4 border-b">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">🧾 Receipt History</h2>

          <div class="flex gap-2 mb-4">
            <input
              type="text"
              class="border px-3 py-2 rounded"
              placeholder="Search by customer"
              onInput$={(e) => (searchQuery.value = (e.target as HTMLInputElement).value)}
            />
          </div>
        </div>

        {/* Receipt List */}
        <div class="px-6 py-4">
          <table class="w-full table-auto text-left text-sm">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-2">Customer</th>
                <th class="p-2">Total</th>
                <th class="p-2">Payment Type</th>
                <th class="p-2">Date</th>
                <th class="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipts.map((receipt) => (
                <tr key={receipt.id} class="border-t">
                  <td class="p-2">{receipt.customer}</td>
                  <td class="p-2">{Intl.NumberFormat().format(receipt.total)}</td>
                  <td class="p-2">{receipt.paymentType}</td>
                  <td class="p-2">{receipt.date}</td>
                  <td class="p-2">
                    <button
                      class="text-blue-600 hover:text-blue-800"
                      onClick$={() => alert(`Viewing receipt #${receipt.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
