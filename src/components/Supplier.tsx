import { component$, useStore, $ } from "@builder.io/qwik";
import { fetchWithLang } from "~/routes/function/fetchLang";
import { Translate } from "./Language";
import { fetchCategories, fetchSuppliers, globalStore } from "~/routes/function/helpers";

export const SupplierComponent = component$((props: {lang: string}) => {
  const formState = useStore({
    name: "",
    contact: "",
    category: "",
    errors: {
      name: "",
      contact: ""
    } as {[key: string]: string},
    valid: {
      name: false,
      contact: false
    } as {[key: string]: boolean},
    modal: {
      isOpen: false,
      message: "" as string,
      isSuccess: false,
    }
  });

  // Validation Function

  const validateField = $((field: string, value: string) => {
    let error = "";
    let isValid = false;

    if (field === "name" || field === "contact") {
      isValid = value.trim().length >= 3;
      error = isValid ? "" : "Lazima iwe na herufi 3 au zaidi";
    }

    formState.errors[field] = error;
    formState.valid[field] = isValid;
  });

  // Handle Input Change
  type FormField = keyof Pick<typeof formState, "name" | "contact" | "category">;

  const handleInputChange = $((field: FormField, value: string) => {
    formState[field] = value.trim(); // Now type-safe
    validateField(field, value);
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();

    if (!formState.valid.name || !formState.valid.contact) {
      formState.modal = { isOpen: true, message: "Tafadhali jaza taarifa zote sahihi", isSuccess: false };
      return;
    }

    try {
      // Send category only if it's not empty
      if (formState.category.trim()) {
        const categoryResponse = await fetchWithLang("http://localhost:3000/categories", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ generalName: formState.category }),
        });
        await categoryResponse.json();
      }

      // Send supplier data
      const supplierResponse = await fetchWithLang("http://localhost:3000/suppliers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: formState.name.trim().toLowerCase(), contact: formState.contact.trim() }),
      });
      
      const supplierData = await supplierResponse.json();

      await fetchSuppliers();
      console.log("Tahir: ", globalStore.supplierData)
      await fetchCategories ();


      formState.modal = {
        isOpen: true,
        message: supplierData.success ? supplierData.message || "Umefanikiwa" : "Tatizo limejitokeza",
        isSuccess: supplierData.success,
      };
      
      if (supplierData.success) {
        formState.name = "";
        formState.contact = "";
        formState.category = "";
        formState.errors = { name: "", contact: "" };
        formState.valid = { name: false, contact: false };
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      formState.modal = { isOpen: true, message: "Tatizo la mtandao. Tafadhali jaribu tena", isSuccess: false };
    }
  });

  return (
    <>
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-5 border-2 border-gray-600">
      <h2 class="text-xl font-bold mb-4">
        <Translate lang={props.lang} keys={['addSupp']}/>
        </h2>
      <form onSubmit$={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Jina la Supplier</label>
          <input
            type="text"
            class="w-full mt-1 p-2 border rounded-lg"
            placeholder="e.g. Bonite, Pepsi, Mo"
            value={formState.name}
            onInput$={(e) => handleInputChange('name', (e.target as HTMLInputElement).value)}
          />
          {formState.errors.name && <p class="text-red-500 text-sm">{formState.errors.name}</p>}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Mawasiliano</label>
          <input
            type="text"
            class="w-full mt-1 p-2 border rounded-lg"
            placeholder="e.g. 0723 456 789"
            value={formState.contact}
            onInput$={(e) => handleInputChange('contact', (e.target as HTMLInputElement).value)}
          />
          {formState.errors.contact && <p class="text-red-500 text-sm">{formState.errors.contact}</p>}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Kategoria</label>
          <input
            type="text"
            class="w-full mt-1 p-2 border rounded-lg"
            placeholder="e.g. Ngano, Vinywaji"
            value={formState.category}
            onInput$={(e) => (formState.category = (e.target as HTMLInputElement).value)}
          />
        </div>

        <button
          type="button"
          onClick$={(e) => handleSubmit(e)}
          disabled={!formState.valid.name || !formState.valid.contact}
          class="bg-gray-700 text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-500"
        >
          Tuma
        </button>
      </form>

      {/* Modal Popup */}
      {formState.modal.isOpen && (
        <div class="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-500 z-50">
          <div class="bg-white p-6 rounded shadow-lg text-center">
            <p class={formState.modal.isSuccess ? 'text-green-600' : 'text-red-600'}>{formState.modal.message}</p>
            <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick$={() => (formState.modal.isOpen = false)}>
              Sawa
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
});