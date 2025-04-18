import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const username = useSignal('john_doe');
  const email = useSignal('john@example.com');
  const password = useSignal('');
  const message = useSignal('');
  const loading = useSignal(false);

  return (
    <div class="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center p-6 animate-fade-in">
      <div class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6 hover:shadow-2xl transition duration-300 ease-in-out">
        <h2 class="text-2xl font-bold text-center mb-2 animate-slide-in">
          👤 Wasifu wa Mtumiaji
        </h2>

        <form preventdefault:submit onSubmit$={async () => {
          loading.value = true;
          message.value = '';

          const res = await fetch('/profile/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: username.value,
              email: email.value,
              password: password.value || undefined
            }),
          });

          const result = await res.json();
          loading.value = false;

          message.value = result.success
            ? '✅ Taarifa zimehifadhiwa kikamilifu.'
            : '❌ Samahani, imeshindikana. Jaribu tena.';
        }} class="space-y-4">
          <div>
            <label class="block text-sm font-semibold">👤 Jina la Mtumiaji</label>
            <input
              type="text"
              bind:value={username}
              class="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-semibold">📧 Barua Pepe</label>
            <input
              type="email"
              bind:value={email}
              class="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-semibold">🔒 Nenosiri Mpya (Hiari)</label>
            <input
              type="password"
              bind:value={password}
              placeholder="Achana nalo ikiwa hutaki kubadilisha"
              class="input input-bordered w-full mt-1"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full mt-4 animate-bounce"
            disabled={loading.value}
          >
            {loading.value ? '⏳ Inahifadhi...' : '💾 Hifadhi Mabadiliko'}
          </button>
        </form>

        {message.value && (
          <p class="text-center text-sm text-blue-600 animate-fade-in">
            {message.value}
          </p>
        )}
      </div>
    </div>
  );
});
