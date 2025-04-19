// src/components/ProfitComparisonChart.tsx
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import Chart from "chart.js/auto";

export const Salexp = component$(() => {
  useVisibleTask$(() => {
    const canvas = document.getElementById("profitTrendChart") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sales = [50000, 60000, 55000, 70000, 65000, 72000, 75000];
    const expenses = [20000, 25000, 22000, 30000, 27000, 29000, 31000];
    const purchases = [18000, 20000, 21000, 22000, 20000, 23000, 25000];

    new Chart(ctx, {
      type: "line",
      data: {
        labels: days,
        datasets: [
          {
            label: "Sales",
            data: sales,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
            tension: 0.4,
          },
          {
            label: "Expenses",
            data: expenses,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: false,
            tension: 0.4,
          },
          {
            label: "Purchases",
            data: purchases,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Tsh" },
          },
          x: {
            title: { display: true, text: "Day" },
          },
        },
      },
    });
  });

  return (
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow mb-10">
      <h2 class="text-xl font-bold mb-4">📈 Profit Comparison (Sales vs Expenses & Purchases)</h2>
      <canvas id="profitTrendChart" height="250"></canvas>
    </div>
  );
});
