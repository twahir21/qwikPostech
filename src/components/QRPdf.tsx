import { Translate } from "./Language";
import { component$, useStore, $ } from '@builder.io/qwik';
import { fetchWithLang } from '~/routes/function/fetchLang';

export const QrPdf = component$((props: {lang: string}) => {
  const store = useStore({
    isLoading: false, // Tracks if the API request is in progress
    modal: {
      isOpen: false,
      message: '',
      isSuccess: false,
    },
  });

  // Handle Generate QR Codes Button Click
  const generateQRCodes = $(async () => {
    try {
      store.isLoading = true; // Set loading state to true

      // Call the backend API to generate QR codes
      const response = await fetchWithLang('http://localhost:3000/generate-qrcode', {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to generate QR codes.');
      }

      // Show success message
      store.modal = {
        isOpen: true,
        message: 'QR codes generated successfully!',
        isSuccess: true,
      };
    } catch (error) {
      console.error('Error generating QR codes:', error);

      // Show error message
      store.modal = {
        isOpen: true,
        message: 'An error occurred while generating QR codes.',
        isSuccess: false,
      };
    } finally {
      store.isLoading = false; // Reset loading state
    }
  });

  return (
    <>
      {/* Generate QR Codes Button */}
      <h1 class="text-xl font-bold text-gray-700 mt-6 mb-2 border-b-2 pb-2">
        <Translate lang={props.lang} keys={['step_3']} /> 
      </h1>
      <button
        class={`bg-gray-700 text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-500 ${
          store.isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick$={generateQRCodes}
        disabled={store.isLoading}
      >
        {store.isLoading ? (
          // Custom Loader
          <div class="loaderCustom"></div>
        ) : (
          'Generate QR Codes'
        )}
      </button>

      {/* Generate PDF */}
      <h1 class="text-xl font-bold text-gray-700 mt-6 mb-2 border-b-2 pb-2">
        <Translate lang={props.lang} keys={['step_4']} /> 
      </h1>

      <button
        class="bg-gray-700 text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-500"
      > Print QR codes 
      </button>

      {/* Modal Popup */}
      {store.modal.isOpen && (
        <div class="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-500 z-50">
          <div class="bg-white p-6 rounded shadow-lg text-center">
            <p class={store.modal.isSuccess ? 'text-green-600' : 'text-red-600'}>
              {store.modal.message}
            </p>
            <button
              class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick$={() => (store.modal.isOpen = false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
});