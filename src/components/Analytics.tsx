import { component$, useResource$, Resource } from '@builder.io/qwik';
import { fetchWithLang } from '~/routes/function/fetchLang';

export const Analytics = component$(() => {
  const analyticsResource = useResource$<any>(async () => {
    const res = await fetchWithLang('http://localhost:3000/analytics', {
      credentials: 'include', // if you need to send cookies
      headers: {
        'Accept-Language': 'sw',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch analytics');
    }

    return res.json(); // ✅ THIS IS THE KEY PART
  });

  return (
    <div class="p-4">
      <Resource
        value={analyticsResource}
        onPending={() => <div>Loading analytics...</div>}
        onRejected={(error) => (
          <div class="text-red-500">Error: {error.message}</div>
        )}
        onResolved={(data) => (
          <pre class="text-sm bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      />
    </div>
  );
});
