import {
    component$,
    useTask$,
    useStore,
    $,
  } from "@builder.io/qwik";
  import { useLocation } from "@builder.io/qwik-city";
  
  export default component$(() => {
    const location = useLocation();
  
    const state = useStore({
      query: {} as Record<string, string>,
      isLoading: true,
      editableFields: {
        quantity: "1",
        saleType: "cash",
        discount: "0",
        description: "",
      },
    });
  
    useTask$(() => {
      const urlParams = new URLSearchParams(location.url.search);
      const params: Record<string, string> = {};
  
      urlParams.forEach((value, key) => {
        params[key] = value;
      });
  
      state.query = params;
      state.editableFields.quantity = params.quantity || "1";
      state.editableFields.saleType = params.saleType || "cash";
      state.editableFields.discount = params.discount || "0";
      state.editableFields.description = params.description || "";
  
      state.isLoading = false;
    });
  
    const handleChange = $((e: Event, field: keyof typeof state.editableFields) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      state.editableFields[field] = target.value;
    });
  
    return (
      <div class="p-4 max-w-2xl mx-auto text-sm sm:text-base">
        <h1 class="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
          📦 QR Code Product Data
        </h1>
  
        {state.isLoading ? (
          <p class="text-gray-600">Loading...</p>
        ) : Object.keys(state.query).length === 0 ? (
          <p class="text-red-500">❌ No valid query parameters found!</p>
        ) : (
          <div class="bg-white rounded-xl shadow-lg p-4 border border-gray-200 space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              {Object.entries(state.query).map(([key, value]) => {
                if (
                  ["quantity", "saleType", "discount", "description"].includes(
                    key
                  )
                )
                  return null;
                return (
                  <div key={key}>
                    <p class="text-gray-500 font-medium">{key}</p>
                    <p class="text-gray-900 font-semibold">
                      {decodeURIComponent(value)}
                    </p>
                  </div>
                );
              })}
            </div>
  
            <div class="border-t pt-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-600 font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={state.editableFields.quantity}
                  onInput$={(e) => handleChange(e, "quantity")}
                  class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
  
              <div>
                <label class="block text-gray-600 font-medium mb-1">
                  Sale Type
                </label>
                <select
                  value={state.editableFields.saleType}
                  onChange$={(e) => handleChange(e, "saleType")}
                  class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="cash">Cash</option>
                  <option value="debt">Debt</option>
                </select>
              </div>
  
              <div>
                <label class="block text-gray-600 font-medium mb-1">
                  Discount
                </label>
                <input
                  type="number"
                  value={state.editableFields.discount}
                  onInput$={(e) => handleChange(e, "discount")}
                  class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
  
              <div class="sm:col-span-2">
                <label class="block text-gray-600 font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={state.editableFields.description}
                  onInput$={(e) => handleChange(e, "description")}
                  rows={3}
                  placeholder="e.g. Home use, party order..."
                  class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                ></textarea>
              </div>
            </div>
  
            <div class="pt-4 text-blue-600 font-semibold text-sm">
              ✅ Type Detected:{" "}
              {state.query.saleType
                ? "Sale"
                : state.query.priceBought
                ? "Purchase"
                : state.query.description
                ? "Expense"
                : "Unknown"}
            </div>
          </div>
        )}
      </div>
    );
  });
  