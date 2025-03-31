import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Translate } from "./Language";

export const Graph =  component$((props: {lang: string}) => {
  useVisibleTask$(() => {
    const ctx = document.getElementById("salesChart") as HTMLCanvasElement;

    new window.Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Mauzo",
            data: [120, 250, 180, 300, 270, 400, 500],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },        },
      },
    });
  });

  return (
    <div class="max-w-3xl mx-auto bg-gray-200 p-8 rounded-lg shadow-lg mb-10 mt-6">
      <h1><Translate lang={props.lang} keys={['graph_title']}/></h1>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <canvas id="salesChart"></canvas>
    </div>
  );
});
