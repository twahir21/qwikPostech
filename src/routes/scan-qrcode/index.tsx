import {
  component$,
  useTask$,
  useStore,
  $,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();

  // Define state
  const state = useStore({
    query: {} as Record<string, string>,
    isLoading: true,
    editableFields: {
      quantity: "1",
      saleType: "cash",
      discount: "0",
      description: "",
      typeDetected: "sales", // Default to 'sales'
    },
    calculatedAmount: 0, // Calculated dynamically
  });

  // Parse URL parameters and initialize state
  useTask$(() => {
    const urlParams = new URLSearchParams(location.url.search);
    const params: Record<string, string> = {};

    urlParams.forEach((value, key) => {
      if (!["shopId", "userId", "productId", "generatedAt"].includes(key)) {
        params[key] = value;
      }
    });

    state.query = params;
    state.editableFields.quantity = params.quantity || "1";
    state.editableFields.saleType = params.saleType || "cash";
    state.editableFields.discount = params.discount || "0";
    state.editableFields.description = params.description || "";
    state.editableFields.typeDetected = params.typeDetected || "sales"; // Default to sales

    // Calculate initial amount
    const priceSold = parseFloat(params.priceSold || "0");
    const quantity = parseInt(state.editableFields.quantity, 10);
    state.calculatedAmount = quantity * priceSold;

    state.isLoading = false;
  });

  // Handle input changes
  const handleChange = $((e: Event, field: keyof typeof state.editableFields) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    state.editableFields[field] = target.value;

    // Recalculate amount when quantity or priceSold changes
    if (field === "quantity" || field === "typeDetected") {
      const priceSold = parseFloat(state.query.priceSold || "0");
      const quantity = parseInt(state.editableFields.quantity, 10);
      state.calculatedAmount = quantity * priceSold;
    }
  });

  // Handle form submission
  const handleSubmit = $(() => {
    // Perform actions like sending data to the backend or updating the database
    console.log("Submitting data:", {
      ...state.query,
      ...state.editableFields,
      calculatedAmount: state.calculatedAmount,
    });
    alert("Transaction submitted successfully!");
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
          {/* Display product details */}
          <div class="grid sm:grid-cols-2 gap-4">
            {Object.entries(state.query).map(([key, value]) => {
              if (
                ["quantity", "saleType", "discount", "description", "priceSold", "typeDetected"].includes(
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

          {/* Editable fields */}
          <div class="border-t pt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-600 font-medium mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={state.editableFields.quantity}
                onInput$={(e) => handleChange(e, "quantity")}
                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-lg font-bold text-green-600"
              />
            </div>

            <div>
              <label class="block text-gray-600 font-medium mb-1">
                Type Detected
              </label>
              <select
                value={state.editableFields.typeDetected}
                onChange$={(e) => handleChange(e, "typeDetected")}
                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="sales">Sales</option>
                <option value="purchases">Purchases</option>
              </select>
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

          {/* Display calculated amount */}
          <div class="pt-4 text-blue-600 font-semibold text-sm">
            💰 Total Amount: {state.calculatedAmount.toFixed(2)}{" "}
            ({state.editableFields.quantity} × {state.query.priceSold})
          </div>

          {/* Submit button */}
          <button
            onClick$={handleSubmit}
            class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Submit Transaction
          </button>
        </div>
      )}
    </div>
  );
});