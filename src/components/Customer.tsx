import { component$, useStore, $, useComputed$ } from "@builder.io/qwik";
import { CustomersCrudComponent } from "./CustComp";

export const CustomerComponent =  component$(() => {
  const customer = useStore({
    name: "",
    contact: "",
  });

  const handleInputChange = $((event: Event, field: keyof typeof customer) => {
    const target = event.target as HTMLInputElement;
    customer[field] = target.value;
  });

  const isFormInvalid = useComputed$(() => {
    return (
      customer.name.trim().length < 3 || customer.contact.trim().length < 3
    );
  });

  const handleSubmit = $(async () => {
    const name = customer.name.trim().toLowerCase();
    const contact = customer.contact.trim().toLowerCase();

    const response = await fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, contact }),
    });

    console.log("Submitted:", { name, contact, status: response.status });
  });

  return (
<>
    <h1 class="text-xl font-bold text-gray-700 mt-6 mb-2 border-b-2 pb-2">
        Create Customer :
    </h1>
    <div class="flex justify-center pt-4">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md border-2 border-gray-600">
        <h2 class="text-lg font-semibold mb-4 text-center">Customer Form</h2>
        <form preventdefault:submit onSubmit$={handleSubmit}>
          <div class="mb-4">
            <label class="block text-gray-800 mb-1">Customer Name</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. Salim Ali"
              value={customer.name}
              onInput$={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-800 mb-1">Contact Info</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. 0723 456 789"
              value={customer.contact}
              onInput$={(e) => handleInputChange(e, "contact")}
            />
          </div>
          <button
            type="submit"
            class="w-full bg-gray-700 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isFormInvalid.value}
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    <CustomersCrudComponent />
</>
  );
});
