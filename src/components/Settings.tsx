// src/components/SettingsPage.tsx
import { component$, useSignal } from '@builder.io/qwik';

export const SettingsComponent = component$(() => {
  const shopName = useSignal('MyPOS Tech');
  const email = useSignal('admin@example.com');
  const currentPassword = useSignal('');
  const newPassword = useSignal('');
  const confirmPassword = useSignal('');
  const isTrial = true;
  const trialEnds = '2025-04-30';

  return (
    <div class="p-4 max-w-3xl mx-auto">
      <h1 class="text-xl font-bold mb-4">⚙️ Settings</h1>

      {/* Shop Info */}
      <section class="mb-6 bg-white shadow rounded-xl p-4">
        <h2 class="text-lg font-semibold mb-2">🛍️ Shop Information</h2>
        <div class="space-y-3">
          <input
            type="text"
            class="w-full p-2 border rounded"
            placeholder="Shop Name"
            value={shopName.value}
            onInput$={(e) => (shopName.value = (e.target as HTMLInputElement).value)}
          />
          <input
            type="email"
            class="w-full p-2 border rounded"
            placeholder="Admin Email"
            value={email.value}
            onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
          />
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            💾 Save Changes
          </button>
        </div>
      </section>

      {/* Password */}
      <section class="mb-6 bg-white shadow rounded-xl p-4">
        <h2 class="text-lg font-semibold mb-2">🔐 Change Password</h2>
        <div class="space-y-3">
          <input
            type="password"
            class="w-full p-2 border rounded"
            placeholder="Current Password"
            bind:value={currentPassword}
          />
          <input
            type="password"
            class="w-full p-2 border rounded"
            placeholder="New Password"
            bind:value={newPassword}
          />
          <input
            type="password"
            class="w-full p-2 border rounded"
            placeholder="Confirm New Password"
            bind:value={confirmPassword}
          />
          <button class="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
            🔒 Update Password
          </button>
        </div>
      </section>

      {/* Subscription Info */}
      <section class="mb-6 bg-white shadow rounded-xl p-4">
        <h2 class="text-lg font-semibold mb-2">💳 Subscription</h2>
        {isTrial ? (
          <p class="text-sm text-gray-600">
            You are currently on a <span class="font-bold text-green-600">14-day trial</span>. It expires on{' '}
            <span class="font-semibold">{trialEnds}</span>.
          </p>
        ) : (
          <p class="text-sm text-gray-600">
            Your subscription is active. Next renewal: <span class="font-semibold">2025-05-01</span>
          </p>
        )}
        <button class="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          🧾 Manage Billing
        </button>
      </section>

      {/* Danger Zone */}
      <section class="bg-red-100 border border-red-400 rounded-xl p-4">
        <h2 class="text-lg font-semibold text-red-700 mb-2">⚠️ Danger Zone</h2>
        <p class="text-sm text-red-700 mb-3">Deleting your shop is permanent and cannot be undone.</p>
        <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          🗑️ Delete Shop
        </button>
      </section>
    </div>
  );
});
