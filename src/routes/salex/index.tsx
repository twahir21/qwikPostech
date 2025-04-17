// src/components/ProfitBreakdownChart.tsx
import { component$, useStore, useVisibleTask$, noSerialize } from "@builder.io/qwik";
import Chart from "chart.js/auto";

export default component$(() => {
  const dummyData = [
    { day: "Mon", sales: 1200, expenses: 300, purchases: 400 },
    { day: "Tue", sales: 1000, expenses: 250, purchases: 300 },
    { day: "Wed", sales: 1100, expenses: 270, purchases: 350 },
    { day: "Thu", sales: 1300, expenses: 320, purchases: 450 },
    { day: "Fri", sales: 1400, expenses: 310, purchases: 420 },
    { day: "Sat", sales: 1500, expenses: 330, purchases: 480 },
  ];

  const state = useStore<{ chart: Chart | null }>({ chart: null });

  useVisibleTask$(() => {
    const canvas = document.getElementById("breakdownChart") as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    state.chart?.destroy();

    const labels = dummyData.map((entry) => entry.day);

    const salesData = dummyData.map((entry) => entry.sales);
    const expenseData = dummyData.map((entry) => -entry.expenses); // show as negative
    const purchaseData = dummyData.map((entry) => -entry.purchases); // show as negative

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Sales",
            data: salesData,
            backgroundColor: "rgba(34, 197, 94, 0.7)",
            borderColor: "rgba(34, 197, 94, 1)",
            borderWidth: 2,
          },
          {
            label: "Expenses",
            data: expenseData,
            backgroundColor: "rgba(239, 68, 68, 0.7)",
            borderColor: "rgba(239, 68, 68, 1)",
            borderWidth: 2,
          },
          {
            label: "Purchases",
            data: purchaseData,
            backgroundColor: "rgba(251, 191, 36, 0.7)",
            borderColor: "rgba(251, 191, 36, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const val = context.raw as number;
                return `${context.dataset.label}: ${val < 0 ? "-" : ""}Tsh ${Math.abs(val)}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            min: -Math.max(...expenseData.map(Math.abs), ...purchaseData.map(Math.abs)) - 100,
            max: Math.max(...salesData) + 100,
            ticks: {
              callback: function (value) {
                return `${Number(value) < 0 ? "-" : ""}Tsh ${Math.abs(Number(value))}`;
              },
            },
          },
        },
      },
    });

    state.chart = noSerialize(chart);
  });

  return (
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md my-10">
      <h2 class="text-xl font-bold mb-4 text-center">📊 Daily Sales vs Costs Breakdown</h2>
      <canvas id="breakdownChart" height="300"></canvas>
    </div>
  );
});
