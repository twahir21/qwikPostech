// routes/subscription/index.tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const paymentCode = useSignal('');
  const status = useSignal<'active' | 'expired' | 'pending'>('expired'); // get this from backend
  const message = useSignal('');
  const loading = useSignal(false);

  const colors = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-fade-in">
      <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-5 hover:scale-105 transition-all duration-300">
        <h2 class="text-2xl font-bold text-center">🧾 Lipa Usajili</h2>

        <div class={`text-center text-sm font-semibold py-2 px-4 rounded-xl ${colors[status.value]}`}>
          Hali ya akaunti: {status.value === 'active' ? 'Imelipiwa' : status.value === 'pending' ? 'Inasubiri kuhakikiwa' : 'Haijalipiwa'}
        </div>

        <p class="text-gray-600 text-sm text-center">
          Lipa kupitia M-Pesa/Tigo/Airtel kisha weka nambari ya uthibitisho hapa chini.
        </p>

        <form preventdefault:submit onSubmit$={async () => {
          loading.value = true;
          message.value = '';

          const res = await fetch('/subscription/confirm', {
            method: 'POST',
            body: JSON.stringify({ paymentCode: paymentCode.value }),
            headers: { 'Content-Type': 'application/json' },
          });

          const result = await res.json();
          loading.value = false;

          if (result.success) {
            message.value = '✅ Uthibitisho umepokelewa. Subiri uthibitisho wa mwisho.';
            status.value = 'pending';
          } else {
            message.value = '❌ Hakuna malipo yaliyopatikana kwa nambari hiyo.';
          }
        }}>
          <input
            type="text"
            placeholder="Ingiza nambari ya malipo (M-Pesa, Tigo...)"
            bind:value={paymentCode}
            class="input input-bordered w-full text-center py-2"
            required
          />

          <button
            type="submit"
            class="btn btn-primary w-full mt-4 animate-bounce"
            disabled={loading.value}
          >
            {loading.value ? '⏳ Inatuma...' : '📤 Tuma Uthibitisho'}
          </button>
        </form>

        {message.value && (
          <p class="text-center mt-3 text-sm font-semibold text-blue-600 animate-fade-in">
            {message.value}
          </p>
        )}

        <p class="text-xs text-center text-gray-400 mt-4">
          Malipo yako yatachunguzwa ndani ya dakika chache.
        </p>
      </div>
    </div>
  );
});
