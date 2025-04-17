// src/components/TestChart.tsx
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import Chart from "chart.js/auto";

export default component$(() => {
  useVisibleTask$(() => {
    const canvas = document.getElementById("testChart") as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cleanup old chart if reloaded
    if ((canvas as any)._chartInstance) {
      (canvas as any)._chartInstance.destroy();
    }

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
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

    (canvas as any)._chartInstance = chart;
  });

  return (
    <div class="max-w-xl mx-auto mt-10 p-4 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">📊 Simple Chart Test</h2>
      <canvas id="testChart" height="200" width="400"></canvas>
    </div>
  );
});
