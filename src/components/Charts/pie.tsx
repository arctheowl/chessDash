import { createEffect, createSignal, onMount } from "solid-js";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Pie } from "solid-chartjs";

const MyChart = (props: any) => {
  /**
   * You must register optional elements before using the chart,
   * otherwise you will have the most primitive UI
   */

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  });

  const [score, setScore] = createSignal({
    wins: null,
    losses: null,
    draws: null,
    total: null,
  });
  createEffect(() => {
    setScore(props.score);
  });
  console.log(props);

  const chartData = {
    labels: ["Wins", "Loses", "Draws"],
    datasets: [
      {
        data: [props.score.wins, props.score.losses, props.score.draws],
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          footer: function (context: any) {
            let percentage = (
              (context[0].parsed / props.score.total) *
              100
            ).toFixed(0);
            let label = [percentage + "%"];
            console.log(context);
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={chartOptions} width={250} height={250} />
    </div>
  );
};
export default MyChart;
