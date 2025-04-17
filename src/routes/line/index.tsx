// src/components/SalesLineChart.tsx
import { component$, useVisibleTask$, noSerialize, useStore } from '@builder.io/qwik';
import Chart from 'chart.js/auto';

type WeeklySales = {
  day: string;
  sales: number;
};

export  default component$(() => {
  const dummyData: WeeklySales[] = [
    { day: 'Mon', sales: 120 },
    { day: 'Tue', sales: 200 },
    { day: 'Wed', sales: 150 },
    { day: 'Thu', sales: 300 },
    { day: 'Fri', sales: 280 },
    { day: 'Sat', sales: 100 },
    { day: 'Sun', sales: 90 },
  ];

  const state = useStore<{ chart: Chart | null }>({ chart: null });

  useVisibleTask$(() => {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart
    state.chart?.destroy();

    const labels = dummyData.map((item) => item.day);
    const values = dummyData.map((item) => item.sales);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Sales',
            data: values,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    state.chart = noSerialize(chart);
  });

  return (
    <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md my-10">
      <h2 class="text-xl font-bold mb-4">📈 Weekly Sales Trend</h2>
      <canvas id="lineChart" height="200"></canvas>
    </div>
  );
});
