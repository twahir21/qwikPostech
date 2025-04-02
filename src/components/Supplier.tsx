import { component$, useStore, $ } from "@builder.io/qwik";

export const SupplierComponent = component$(() => {
  const formState = useStore({
    name: "",
    contact: "",
    category: "",
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
  
    try {
      const categoryResponse = await fetch("http://localhost:3000/categories", {
        method: "POST",
        credentials: "include",  // Include cookies for authentication
        headers: {
          "Content-Type": "application/json",  // Ensure you're sending JSON data
        },
        body: JSON.stringify({ generalName: formState.category }),
      });
  
      if (!categoryResponse.ok) {
        const errorText = await categoryResponse.text();  // Get error response as text
        console.error("Error adding category:", errorText);  // Log the error message
        throw new Error(errorText);  // Throw the error to be caught below
      }
  
      const supplierResponse = await fetch("http://localhost:3000/suppliers", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company: formState.name, contact: formState.contact }),
      });
  
      if (!supplierResponse.ok) {
        const errorText = await supplierResponse.text();  // Log error details
        console.error("Error adding supplier:", errorText);
        throw new Error(errorText);
      }
  
      console.log("Category and Supplier added successfully");
    } catch (error) {
      console.error("Form submission failed:", error);
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
    </div>
  );
});
