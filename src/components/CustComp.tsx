import { component$, useSignal, useTask$, $ } from '@builder.io/qwik';
import { fetchWithLang } from '~/routes/function/fetchLang';

interface Customer {
  id: string;
  name: string;
  contact: string
  createdAt: string;
}

export const CustomersCrudComponent =  component$(() => {
  const products = useSignal<Customer[]>([]);
  const total = useSignal(0);
  const search = useSignal('');
  const currentPage = useSignal(1);
  const perPage = 10;
  const isLoading = useSignal(false);
  const selectedCustomer = useSignal<Customer | null>(null);
  const isEditing = useSignal(false);
  const isDeleting = useSignal(false);


  const fetchProducts = $(async () => {
    isLoading.value = true;
    try {
      const res = await fetchWithLang(
        `http://localhost:3000/customers?search=${encodeURIComponent(search.value)}&page=${currentPage.value}&limit=${perPage}`,{
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

  const editCustomer = $((customer: Customer) => {
    selectedCustomer.value = { ...customer }; // Prepopulate the form with product data
    isEditing.value = true;
  });
  
  const deleteProduct = $(async (productId: string) => {
    try {
      const res = await fetchWithLang(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const text = await res.text(); // Fallback for non-JSON errors
        throw new Error(`Failed to delete product: ${text}`);
      }
  
      // If deletion is successful, remove the product from the list
      products.value = products.value.filter(product => product.id !== productId);
    } catch (err) {
      console.error('Failed to delete product:', err);
    } finally {
      isDeleting.value = false;
    }
  });
  

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
              <th class="p-3 border-b border-gray-200">Contact</th>
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
            ) : products.value.length === 0 ? (
              <tr>
                <td colSpan={7} class="p-4 text-center text-gray-500">
                Hakuna mteja yoyote, msajili kwanza ....
                </td>
              </tr>
              )
             : (
              products.value.map((customer) => (
                <tr key={customer.id} class="border-b border-gray-200">
                  <td class="p-3">{customer.name}</td>
                  <td class="p-3"> {customer.contact} </td>
                  <td class="p-3 space-x-2">
                    <button class="text-blue-600 hover:underline" onClick$={() => editCustomer(customer)}>
                        Edit
                    </button>
                    <button
                        class="text-red-600 hover:underline"
                        onClick$={() => {
                        selectedCustomer.value = customer;
                        isDeleting.value = true;
                        }}
                    >
                        Delete
                    </button>
                    </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div class="sm:hidden space-y-4">
        {products.value.map((customer) => (
          <div key={customer.id} class="border rounded-lg p-3 bg-white shadow-sm">
            <div class="font-semibold">{customer.name}</div>
            <div class="text-sm">Price Sold: Tsh {customer.contact}</div>
            <td class="p-3 space-x-2">
                <button class="text-blue-600 hover:underline" onClick$={() => editCustomer(customer)}>
                    Edit
                </button>
                <button
                    class="text-red-600 hover:underline"
                    onClick$={() => {
                    selectedCustomer.value = customer;
                    isDeleting.value = true;
                    }}
                >
                    Delete
                </button>
                </td>

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

      {isEditing.value && selectedCustomer.value && (
  <div class="fixed inset-0 flex items-center justify-center z-10 bg-gray-600 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-lg font-semibold">Edit Customers</h2>

      <div class="mt-4">
        <label class="block text-sm">Name</label>
        <input
          type="text"
          class="w-full p-2 border border-gray-300 rounded"
          value={selectedCustomer.value.name}
          onInput$={(e) => (selectedCustomer.value!.name = (e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm">PriceSold</label>
        <input
          type="number"
          class="w-full p-2 border border-gray-300 rounded"
          value={selectedCustomer.value.contact}
          onInput$={(e) => {
            const value = (e.target as HTMLInputElement).value;
            selectedCustomer.value!.contact = value;
          }}

        />
      </div>

      <div class="mt-4 flex gap-2">
        <button
          class="px-4 py-2 bg-gray-700 text-white rounded"
          onClick$={async () => {
            try {
              console.log('Updating customer:', selectedCustomer.value!.id);
              const res = await fetchWithLang(`http://localhost:3000/customers/${selectedCustomer.value!.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept-Language': 'sw', // Adjust as necessary
                },
                body: JSON.stringify(selectedCustomer.value),
                credentials: 'include',
              });
              if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed to update product: ${text}`);
              }
              const updatedProduct = await res.json();
              // Update product in the local list
              const index = products.value.findIndex(p => p.id === updatedProduct.id);
              if (index > -1) {
                products.value[index] = updatedProduct;
              }
              isEditing.value = false;
            } catch (err) {
              console.error('Failed to update product:', err);
            }
          }}
        >
          Save
        </button>
        <button
          class="px-4 py-2 bg-gray-300 text-black rounded"
          onClick$={() => {
            isEditing.value = false;
            selectedCustomer.value = null;
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


{isDeleting.value && (
  <div class="fixed inset-0 flex items-center justify-center z-10 bg-gray-600 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-lg font-semibold">Confirm Deletion</h2>
      <p class="mt-2 text-sm">Are you sure you want to delete this product?</p>
      <div class="mt-4 flex gap-2">
        <button
          class="px-4 py-2 bg-red-500 text-white rounded"
          onClick$={() => deleteProduct(selectedCustomer.value!.id)}
        >
          Delete
        </button>
        <button
          class="px-4 py-2 bg-gray-300 text-black rounded"
          onClick$={() => {
            isDeleting.value = false;
            selectedCustomer.value = null;
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
});
