// src/components/ReceiptsPage.tsx
import { component$, useStore } from "@builder.io/qwik";

type Receipt = {
  id: string;
  date: string;
  type: "Sale" | "Return" | "Payment";
  customerName: string;
  totalAmount: number;
  paymentMethod: string;
  status: "Paid" | "Unpaid" | "Partial";
};

export default component$(() => {
  // Dummy data
  const receipts: Receipt[] = [
    {
      id: "R001",
      date: "2025-04-12",
      type: "Sale",
      customerName: "John Doe",
      totalAmount: 150000,
      paymentMethod: "Cash",
      status: "Paid",
    },
    {
      id: "R002",
      date: "2025-04-13",
      type: "Payment",
      customerName: "Jane Smith",
      totalAmount: 50000,
      paymentMethod: "Cash",
      status: "Paid",
    },
    {
      id: "R003",
      date: "2025-04-14",
      type: "Sale",
      customerName: "Alice Johnson",
      totalAmount: 250000,
      paymentMethod: "Credit",
      status: "Unpaid",
    },
    {
      id: "R004",
      date: "2025-04-15",
      type: "Return",
      customerName: "David Lee",
      totalAmount: -50000,
      paymentMethod: "Cash",
      status: "Refunded",
    },
    {
      id: "R005",
      date: "2025-04-16",
      type: "Sale",
      customerName: "Mary Clark",
      totalAmount: 100000,
      paymentMethod: "Debit",
      status: "Partial",
    },
  ];

  const store = useStore({
    search: "",
  });

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.customerName.toLowerCase().includes(store.search.toLowerCase()) ||
      receipt.id.includes(store.search)
  );

  const totalSales = receipts
    .filter((receipt) => receipt.type === "Sale")
    .reduce((acc, receipt) => acc + receipt.totalAmount, 0);
  const totalPayments = receipts
    .filter((receipt) => receipt.type === "Payment")
    .reduce((acc, receipt) => acc + receipt.totalAmount, 0);
  const totalReturns = receipts
    .filter((receipt) => receipt.type === "Return")
    .reduce((acc, receipt) => acc + receipt.totalAmount, 0);

  return (
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Search and Filters Section */}
      <div class="flex flex-col md:flex-row justify-between items-center mb-4">
        <div class="flex items-center space-x-2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search by ID or Customer Name"
            value={store.search}
            onInput$={(e) => (store.search = (e.target as HTMLInputElement).value)}
            class="p-2 rounded-md border border-gray-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Receipts Table */}
      <table class="min-w-full table-auto text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2">Receipt ID</th>
            <th class="px-4 py-2">Date</th>
            <th class="px-4 py-2">Type</th>
            <th class="px-4 py-2">Customer</th>
            <th class="px-4 py-2">Amount (Tsh)</th>
            <th class="px-4 py-2">Payment</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReceipts.length === 0 ? (
            <tr>
              <td colSpan={8} class="text-center py-4 text-red-600">
                No receipts found.
              </td>
            </tr>
          ) : (
            filteredReceipts.map((receipt) => (
              <tr key={receipt.id} class="border-b">
                <td class="px-4 py-2">{receipt.id}</td>
                <td class="px-4 py-2">{receipt.date}</td>
                <td class="px-4 py-2">{receipt.type}</td>
                <td class="px-4 py-2">{receipt.customerName}</td>
                <td class="px-4 py-2">{receipt.totalAmount.toLocaleString()}</td>
                <td class="px-4 py-2">{receipt.paymentMethod}</td>
                <td class="px-4 py-2">{receipt.status}</td>
                <td class="px-4 py-2 space-x-2">
                  <button class="bg-blue-500 text-white px-2 py-1 rounded-md">View</button>
                  <button class="bg-green-500 text-white px-2 py-1 rounded-md">Download</button>
                  <button class="bg-red-500 text-white px-2 py-1 rounded-md">
                    Refund
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Debt Management Summary */}
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Debt Management Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h3 class="font-medium text-gray-700">Total Sales</h3>
            <p class="text-2xl font-semibold">{totalSales.toLocaleString()} Tsh</p>
          </div>
          <div class="bg-green-100 p-4 rounded-lg shadow-sm">
            <h3 class="font-medium text-gray-700">Total Payments</h3>
            <p class="text-2xl font-semibold">{totalPayments.toLocaleString()} Tsh</p>
          </div>
          <div class="bg-red-100 p-4 rounded-lg shadow-sm">
            <h3 class="font-medium text-gray-700">Total Returns</h3>
            <p class="text-2xl font-semibold">{totalReturns.toLocaleString()} Tsh</p>
          </div>
        </div>
      </div>

      {/* Pagination (for demo purposes) */}
      <div class="flex justify-between items-center mt-6">
        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Previous</button>
        <span class="text-sm text-gray-700">Page 1 of 10</span>
        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Next</button>
      </div>
    </div>
  );
});
