import { component$, useStore, $ } from "@builder.io/qwik";

export default component$(() => {
  const customer = useStore({
    name: "",
    contact: "",
  });

  const handleInputChange = $((event: Event, field: keyof typeof customer) => {
    const target = event.target as HTMLInputElement;
    customer[field] = target.value;
  });

  const handleSubmit = $(() => {
    console.log("Customer Data:", customer);
    // Add form submission logic here
  });

  return (
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4">Customer Form</h2>
      <form preventdefault:submit onSubmit$={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700">Customer Name</label>
          <input
            type="text"
            class="w-full p-2 border rounded"
            placeholder="e.g. Salim Ali"
            value={customer.name}
            onInput$={(e) => handleInputChange(e, "name")}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Contact Info</label>
          <input
            type="text"
            class="w-full p-2 border rounded"
            placeholder="e.g. 0723 456 789"
            value={customer.contact}
            onInput$={(e) => handleInputChange(e, "contact")}
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
});