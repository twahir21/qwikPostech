import { component$, useSignal, useTask$, $ } from '@builder.io/qwik';

interface Product {
  id: string;
  name: string;
  categoryId: string;
  priceSold: string;
  stock: number;
  shopId: string;
  supplierId: string;
  minStock: number;
  status: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
  isQRCode: boolean;
}

export const CrudPrdComponent =  component$(() => {
  const products = useSignal<Product[]>([]);
  const total = useSignal(0);
  const search = useSignal('');
  const currentPage = useSignal(1);
  const perPage = 10;
  const isLoading = useSignal(false);

  const fetchProducts = $(async () => {
    isLoading.value = true;
    try {
      const res = await fetch(
        `http://localhost:3000/products?search=${encodeURIComponent(search.value)}&page=${currentPage.value}&limit=${perPage}`,{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'sw', // Adjust as necessary
          },
        }
      );

      if (!res.ok) {
        const text = await res.text(); // fallback for non-JSON errors
        throw new Error(`Failed to fetch products: ${text}`);
      }


      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || 'Failed to fetch products');
      }
      products.value = json.data;

      console.log(products.value);
      total.value = json.total;
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      isLoading.value = false;
    }
  });

  useTask$(({ track }) => {
    track(() => search.value);
    track(() => currentPage.value);
    fetchProducts();
  });

  const totalPages = () => Math.ceil(total.value / perPage);

  return (
    <div class="p-4 max-w-5xl mx-auto">
      <h1 class="text-xl font-bold mb-4 text-center">📦 Products</h1>

      <input
        class="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Search product name..."
        bind:value={search}
      />

      {/* Desktop Table */}
     <div class="hidden sm:block border border-gray-300 rounded overflow-hidden">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-100 font-semibold text-gray-600">
            <tr>
              <th class="p-3 border-b border-gray-200">Name</th>
              <th class="p-3 border-b border-gray-200">Price</th>
              <th class="p-3 border-b border-gray-200">Stock</th>
              <th class="p-3 border-b border-gray-200">Unit</th>
              <th class="p-3 border-b border-gray-200">Status</th>
              <th class="p-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading.value ? (
              <tr>
                <td colSpan={6} class="p-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              products.value.map((product) => (
                <tr key={product.id} class="border-b border-gray-200">
                  <td class="p-3">{product.name}</td>
                  <td class="p-3">Tsh {product.priceSold} /=</td>
                  <td class="p-3">{product.stock}</td>
                  <td class="p-3">{product.unit}</td>
                  <td class="p-3">
                    <span
                      class={`px-2 py-1 text-xs rounded-full ${
                        product.status === 'available'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td class="p-3 space-x-2">
                    <button class="text-blue-600 hover:underline">Edit</button>
                    <button class="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div class="sm:hidden space-y-4">
        {products.value.map((product) => (
          <div key={product.id} class="border rounded-lg p-3 bg-white shadow-sm">
            <div class="font-semibold">{product.name}</div>
            <div class="text-sm">Ksh {product.priceSold}</div>
            <div class="text-sm">Stock: {product.stock}</div>
            <div class="text-sm">Unit: {product.unit}</div>
            <div class="text-sm mt-1">
              <span
                class={`inline-block px-2 py-1 text-xs rounded-full ${
                  product.status === 'available'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {product.status}
              </span>
            </div>
            <div class="mt-2 flex gap-2">
              <button class="text-blue-600 hover:underline text-sm">Edit</button>
              <button class="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div class="mt-6 flex justify-between items-center">
        <button
          onClick$={() => currentPage.value--}
          disabled={currentPage.value === 1}
          class="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span class="text-sm">
          Page {currentPage.value} of {totalPages()}
        </span>
        <button
          onClick$={() => currentPage.value++}
          disabled={currentPage.value >= totalPages()}
          class="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
});
