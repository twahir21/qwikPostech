import { $, component$, useStore } from "@builder.io/qwik";

export default component$(() => {
  const store = useStore({
    input: "",
    showCalculator: false,
  });

  const handleButtonClick = $((value: string) => {
    if (value === "C") {
      store.input = "";
    } else if (value === "=") {
      try {
        store.input = eval(store.input).toString();
      } catch {
        store.input = "Error";
      }
    } else {
      store.input += value;
    }
  });

  return (
    <div class="relative">
      <button
        class="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick$={() => (store.showCalculator = true)}
      >
        📱 Calculator
      </button>

      {store.showCalculator && (
        <div class="fixed inset-0 flex justify-center items-center bg-opacity-50">
          <div class="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <button
              class="absolute top-2 right-2 text-gray-600 hover:text-red-600 pb-2"
              onClick$={() => (store.showCalculator = false)}
            >
              ✖
            </button>
            <input
              type="text"
              class="w-full p-2 text-right text-xl border rounded mb-4 mr-4 mt-4"
              value={store.input}
              disabled
            />
            <div class="grid grid-cols-4 gap-2">
              {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "C", "=", "+"].map(
                (btn) => (
                  <button
                    key={btn}
                    class={`p-4 rounded text-xl ${
                      btn === "C" ? "bg-red-500 text-white" :
                      btn === "=" ? "bg-gray-900 text-white" :
                      "bg-gray-200"
                    }`}
                    onClick$={() => handleButtonClick(btn)}
                  >
                    {btn}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
