import { createEffect, createSignal, onMount } from "solid-js";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Line } from "solid-chartjs";

const LineChart = (props: any) => {
  /**
   * You must register optional elements before using the chart,
   * otherwise you will have the most primitive UI
   */

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  });
  let gameDates: any = [];
  let playerRatings: any = [];
  createEffect(() => {
    props.games?.forEach((game: any) => {
      if (game?.player_rating) {
        playerRatings.push(game?.player_rating);
        gameDates.push(game?.game_date);
      }
    });
  });
  const chartData = {
    labels: gameDates.reverse(),
    datasets: [
      {
        data: playerRatings.reverse(),
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};
export default LineChart;
