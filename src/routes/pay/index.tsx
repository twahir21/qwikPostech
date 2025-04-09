import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-white to-sky-100 text-gray-800">
      <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <div class="text-center">
          <h1 class="text-2xl font-bold mb-2">💸 Support MyPOS Tech</h1>
          <p class="text-sm text-gray-500">
            Kindly make a payment to the number below to access premium features.
          </p>
        </div>

        <div class="bg-gray-100 rounded-xl p-4 text-center">
          <p class="text-gray-500 text-sm">Pay to:</p>
          <p class="text-lg font-bold text-gray-800 tracking-wide">
            +255 712 345 678
          </p>
          <p class="text-sm mt-1 text-gray-500">MyPOS Technologies (M-Pesa / Airtel Money)</p>
        </div>

        <div class="text-sm text-center text-gray-500">
          After payment, send a screenshot via WhatsApp or SMS to verify your account. Access will be granted shortly.
        </div>

        <a
          href="https://wa.me/255674291587"
          target="_blank"
          class="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
        >
          📲 Message on WhatsApp
        </a>

        <div class="text-xs text-center text-gray-400">
          Thanks for supporting a solo developer 🙏
        </div>
      </div>
    </div>
  );
});
