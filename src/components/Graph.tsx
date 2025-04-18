import { component$, useVisibleTask$ } from "@builder.io/qwik";
import Chart from "chart.js/auto";
import { fetchWithLang } from "~/routes/function/fetchLang";

type NetSalesData = {
  day: string;
  netSales: number;
};


export const Graph = component$((props: {lang: string, data: NetSalesData[] }) => {
  useVisibleTask$(async () => {
    await fetchWithLang("http://localhost:3000/analytics", {
      credentials: 'include'
    });
  });

  useVisibleTask$(() => {
    const canvas = document.getElementById("salesChart") as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cleanup old chart if reloaded
    if ((canvas as any)._chartInstance) {
      (canvas as any)._chartInstance.destroy();
    }

    const salesMap = new Map<string, number>();
    props.data.forEach((entry) => {
      salesMap.set(entry.day, entry.netSales);
    });

    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = labels.map((day) => salesMap.get(day) || 0);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Mauzo",
            data,
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
    <div class="max-w-3xl mx-auto bg-gray-200 p-8 rounded-lg shadow-lg mb-10 mt-6">
      <h1 class="text-lg font-bold mb-4">📊 Sales Data</h1>
      {props.data.length === 0 ? (
        <p class="text-red-600 font-semibold">No data to display</p>
      ) : (
        <canvas id="salesChart" height="150"></canvas>
      )}
    </div>
  );
});
