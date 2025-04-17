// src/components/SalesPieChart.tsx
import { component$, useStore, useVisibleTask$, noSerialize } from '@builder.io/qwik';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

type SalesTypeData = {
  type: 'Cash' | 'Debt';
  amount: number;
};

export default component$(() => {
  const dummyData: SalesTypeData[] = [
    { type: 'Cash', amount: 850 },
    { type: 'Debt', amount: 250 },
  ];

  const state = useStore<{ chart: Chart | null }>({ chart: null });

  useVisibleTask$(() => {
    const canvas = document.getElementById('salesPieChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Destroy old chart
    state.chart?.destroy();

    const total = dummyData.reduce((sum, item) => sum + item.amount, 0);
    const labels = dummyData.map((item) => item.type);
    const data = dummyData.map((item) => item.amount);

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Sales Breakdown',
            data,
            backgroundColor: ['#4ade80', '#f87171'], // green, red
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          datalabels: {
            color: '#fff',
            font: {
              weight: 'bold',
              size: 14,
            },
            formatter: (value: number) => {
              const percentage = ((value / total) * 100).toFixed(1);
              return `${percentage}%`;
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    state.chart = noSerialize(chart);
  });

  return (
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-10">
      <h2 class="text-xl font-bold mb-4 text-center">📊 Cash vs Debt Sales</h2>
      <canvas id="salesPieChart" height="250"></canvas>
    </div>
  );
});
