import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const dummyReceipts = [
    {
      id: 'R001',
      date: '2023-10-01',
      customer: 'John Doe',
      items: [
        { name: 'Coffee', qty: 2, price: 5.0 },
        { name: 'Croissant', qty: 1, price: 3.0 },
      ],
      total: 13.0,
    },
    {
      id: 'R002',
      date: '2023-10-02',
      customer: 'Jane Smith',
      items: [
        { name: 'Tea', qty: 1, price: 4.0 },
        { name: 'Muffin', qty: 3, price: 2.5 },
      ],
      total: 11.5,
    },
  ];

  return (
    <div class="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Receipts</h1>
      </header>

      {/* Receipt List */}
      <div class="space-y-4">
        {dummyReceipts.map((receipt) => (
          <div
            key={receipt.id}
            class="bg-white rounded-lg shadow-md p-4"
          >
            {/* Receipt Header */}
            <div class="flex justify-between items-center mb-2">
              <div>
                <p class="text-sm text-gray-500">Receipt ID: {receipt.id}</p>
                <p class="text-sm text-gray-500">Date: {receipt.date}</p>
              </div>
              <p class="text-lg font-semibold text-gray-800">${receipt.total.toFixed(2)}</p>
            </div>

            {/* Customer Info */}
            <p class="text-gray-700 mb-2">Customer: {receipt.customer}</p>

            {/* Items List */}
            <ul class="space-y-1">
              {receipt.items.map((item, index) => (
                <li
                  key={index}
                  class="flex justify-between text-sm text-gray-600"
                >
                  <span>
                    {item.name} x{item.qty}
                  </span>
                  <span>${(item.qty * item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
});