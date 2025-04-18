import { component$, useSignal, useTask$, $, useContext } from '@builder.io/qwik';
import { fetchWithLang } from '~/routes/function/fetchLang';
import { Translate } from './Language';
import { RefetchContext } from './context/refreshContext';

interface Supplier {
  id: string;
  company: string;
  contact: string
  createdAt: string;
}

export const SuppCrudComponent =  component$((props: {lang: string }) => {
  const supplier = useSignal<Supplier[]>([]);
  const total = useSignal(0);
  const search = useSignal('');
  const currentPage = useSignal(1);
  const perPage = 10;
  const isLoading = useSignal(false);
  const selectedSupplier = useSignal<Supplier | null>(null);
  const isEditing = useSignal(false);
  const isDeleting = useSignal(false);


  const fetchSuppliers = $(async () => {
    isLoading.value = true;
    try {
      const res = await fetchWithLang(
        `http://localhost:3000/suppliers?search=${encodeURIComponent(search.value)}&page=${currentPage.value}&limit=${perPage}`,{
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
        throw new Error(`Imeshindwa kujibu kuhusu wateja: ${text}`);
      }


      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || 'Imeshindwa kuleta supplier kutoka kwenye seva');
      }
      supplier.value = json.data;

      total.value = json.total;
    } catch (err) {
      console.error('Imeshindwa kuleta supplier:', err);
    } finally {
      isLoading.value = false;
    }
  });

  const { supplierRefetch } = useContext(RefetchContext);

  useTask$(({ track }) => {
    track(() => search.value);
    track(() => currentPage.value);
    track(() => supplierRefetch.value);
    fetchSuppliers();
    supplierRefetch.value = false;
  });

  const totalPages = () => Math.ceil(total.value / perPage);

  const editSupplier = $((supplier: Supplier) => {
    selectedSupplier.value = { ...supplier }; // Prepopulate the form with supplier data
    isEditing.value = true;
  });
  
  const deleteSupplier = $(async (supplierId: string) => {
    try {
      const res = await fetchWithLang(`http://localhost:3000/suppliers/${supplierId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const text = await res.text(); // Fallback for non-JSON errors
        throw new Error(`Imeshindwa kufuta muuzaji: ${text}`);
      }
  
      // If deletion is successful, remove the supplier from the list
      supplier.value = supplier.value.filter(supplier => supplier.id !== supplierId);
    } catch (err) {
      console.error('Imeshindwa kufika kwa seva za muuzaji: ', err);
    } finally {
      isDeleting.value = false;
    }
  });
  

  return (
    <div class="p-4 max-w-5xl mx-auto">

      <h1 class="text-xl font-bold mb-4 text-center"> <Translate lang={props.lang} keys={['suppliers']} /> </h1>

      <input
        class="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="🔍 Tafuta kwa jina la muuzaji ..."
        bind:value={search}
      />

      {/* Desktop Table */}
     <div class="hidden sm:block border border-gray-300 rounded overflow-hidden">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-100 font-semibold text-gray-600">
            <tr>
              <th class="p-3 border-b border-gray-200"><Translate lang={props.lang} keys={['name']} /></th>
              <th class="p-3 border-b border-gray-200"><Translate lang={props.lang} keys={['contact']} /></th>
              <th class="p-3 border-b border-gray-200"><Translate lang={props.lang} keys={['action']} /></th>
            </tr>
          </thead>
          <tbody>
            {isLoading.value ? (
              <tr>
                <td colSpan={6} class="p-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : supplier.value.length === 0 ? (
              <tr>
                <td colSpan={7} class="p-4 text-center text-gray-500">
                Hakuna muuzaji yoyote, msajili kwanza ....
                </td>
              </tr>
              )
             : (
              supplier.value.map((supplier) => (
                <tr key={supplier.id} class="border-b border-gray-200">
                  <td class="p-3">{supplier.company}</td>
                  <td class="p-3"> {supplier.contact} </td>
                  <div class="p-3 space-x-2">
                    <button class="text-blue-600 hover:underline" onClick$={() => editSupplier(supplier)}>
                        Edit
                    </button>
                    <button
                        class="text-red-600 hover:underline"
                        onClick$={() => {
                        selectedSupplier.value = supplier;
                        isDeleting.value = true;
                        }}
                    >
                        Delete
                    </button>
                    </div>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div class="sm:hidden space-y-4">
        {supplier.value.map((supplier) => (
          <div key={supplier.id} class="border rounded-lg p-3 bg-white shadow-sm">
            <div class="font-semibold">{supplier.company}</div>
            <div class="text-sm"> {supplier.contact}</div>
            <td class="p-3 space-x-2">
                <button class="text-blue-600 hover:underline" onClick$={() => editSupplier(supplier)}>
                    Edit
                </button>
                <button
                    class="text-red-600 hover:underline"
                    onClick$={() => {
                    selectedSupplier.value = supplier;
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
        onClick$={() => {
          if (currentPage.value > 1) currentPage.value--;
        }}          
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

      {isEditing.value && selectedSupplier.value && (
  <div class="fixed inset-0 flex items-center justify-center z-10 bg-gray-600 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-lg font-semibold">Edit Supplier</h2>

      <div class="mt-4">
        <label class="block text-sm"><Translate lang={props.lang} keys={['name']} /></label>
        <input
          type="text"
          class="w-full p-2 border border-gray-300 rounded"
          value={selectedSupplier.value.company}
          onInput$={(e) => (selectedSupplier.value!.company = (e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="mt-4">
      <label class="block text-sm"><Translate lang={props.lang} keys={['contact']} /></label>
      <input
          type="number"
          class="w-full p-2 border border-gray-300 rounded"
          value={selectedSupplier.value.contact}
          onInput$={(e) => {
            const value = (e.target as HTMLInputElement).value;
            selectedSupplier.value!.contact = value;
          }}

        />
      </div>

      <div class="mt-4 flex gap-2">
        <button
          class="px-4 py-2 bg-gray-700 text-white rounded"
          onClick$={async () => {
            try {
              const res = await fetchWithLang(`http://localhost:3000/suppliers/${selectedSupplier.value!.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept-Language': 'sw', // Adjust as necessary
                },
                body: JSON.stringify(selectedSupplier.value),
                credentials: 'include',
              });

              supplierRefetch.value = true;
              if (!res.ok) {
                const text = await res.text();
                throw new Error(`Imeshindwa ku-update muuzaji: ${text}`);
              }
              const updatedSupplier = await res.json();
              // Update Supplier in the local list
              const index = supplier.value.findIndex(p => p.id === updatedSupplier.id);
              if (index > -1) {
                supplier.value[index] = updatedSupplier;
              }
              isEditing.value = false;
            } catch (err) {
              console.error('Imeshindwa ku-update muuzaji:', err);
            }
          }}
        >
          Save
        </button>
        <button
          class="px-4 py-2 bg-gray-300 text-black rounded"
          onClick$={() => {
            isEditing.value = false;
            selectedSupplier.value = null;
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
      <p class="mt-2 text-sm">Are you sure you want to delete this supplier?</p>
      <div class="mt-4 flex gap-2">
        <button
          class="px-4 py-2 bg-red-500 text-white rounded"
          onClick$={() => deleteSupplier(selectedSupplier.value!.id)}
        >
          Delete
        </button>
        <button
          class="px-4 py-2 bg-gray-300 text-black rounded"
          onClick$={() => {
            isDeleting.value = false;
            selectedSupplier.value = null;
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
