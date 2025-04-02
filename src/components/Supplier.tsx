import { component$, useStore, $ } from "@builder.io/qwik";
import { fetchWithLang } from "~/routes/function/fetchLang";

export const SupplierComponent = component$(() => {
  const formState = useStore({
    name: "",
    contact: "",
    category: "",
    modal: {
      isOpen: false,
      message: '' as string,
      isSuccess: false,
    }
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
  
    try {
      const categoryResponse = await fetchWithLang("http://localhost:3000/categories", {
        method: "POST",
        credentials: "include",  // Include cookies for authentication
        headers: {
          "Content-Type": "application/json",  // Ensure you're sending JSON data
        },
        body: JSON.stringify({ generalName: formState.category }),
      });
  
      const categoryData = await categoryResponse.json();
      if (!categoryResponse.ok || !categoryData.success) {
        formState.modal = { isOpen: true, message: categoryData.message || 'Tatizo limejitokeza', isSuccess: false };
      }else{
        formState.modal = { isOpen: true, message: categoryData.message || 'Umefanikiwa', isSuccess: true };
      }
  
      const supplierResponse = await fetchWithLang("http://localhost:3000/suppliers", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company: formState.name, contact: formState.contact }),
      });
  
      const supplierData = await supplierResponse.json();

      if (!supplierResponse.ok || !supplierData.success) {
        formState.modal = { isOpen: true, message: supplierData.message || 'Tatizo limejitokeza', isSuccess: false };
      }else{
        formState.modal = { isOpen: true, message: supplierData.message || 'Umefanikiwa', isSuccess: true };
      }
      // reset the form
      formState.name = "";
      formState.contact = "";
      formState.category = "";

    } catch (error) {
      console.error("Form submission failed:", error);
      formState.modal = { isOpen: true, message: 'Tatizo limejitokeza', isSuccess: false };
    }
  }); 
  

  return (
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-5 border-2 border-gray-600">
      <h2 class="text-xl font-bold mb-4">Add Supplier</h2>
      <form onSubmit$={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Supplier Name</label>
          <input
            type="text"
            class="w-full mt-1 p-2 border rounded-lg"
            placeholder="e.g. Bonite, Pepsi, Mo"
            value={formState.name}
            onInput$={(e) => (formState.name = (e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            class="w-full mt-1 p-2 border rounded-lg"
            value={formState.contact}
            placeholder="e.g. 0723 456 789"
            onInput$={(e) => (formState.contact = (e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            class="w-full mt-1 p-2 border rounded-lg"
            placeholder="e.g. Ngano, vinywaji"
            value={formState.category}
            onInput$={(e) => (formState.category = (e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <button
          type="button"
          onClick$={handleSubmit}
          class="bg-gray-700 text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-500"
        >
          Submit
        </button>
      </form>

        {/* Modal Popup */}
        {formState.modal.isOpen && (
          <div class="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-500 z-50">
            <div class="bg-white p-6 rounded shadow-lg text-center">
              <p class={formState.modal.isSuccess ? 'text-green-600' : 'text-red-600'}>{formState.modal.message}</p>
              <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick$={() => (formState.modal.isOpen = false)}>
                Ok
              </button>
            </div>
          </div>
        )}

    </div>
  );
});
