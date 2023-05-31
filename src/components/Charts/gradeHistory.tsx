import { createEffect, onMount } from "solid-js";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Line } from "solid-chartjs";

const LineChart = (props: any) => {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  });
  let gameDates: any = [];
  let playerRatings: any = [];
  createEffect(() => {
    props.games?.forEach((game: any) => {
      if (game?.player_rating) {
        playerRatings.unshift(game?.player_rating);
        gameDates.unshift(game?.game_date);
      }
    });
  });
  const chartData = {
    labels: gameDates,
    datasets: [
      {
        data: playerRatings,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};
export default LineChart;
