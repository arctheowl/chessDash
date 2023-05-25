import { createSignal } from "solid-js";

const LowestLose = ({ games }: any) => {
  const [lowestLose, setLowestLose] = createSignal({
    opponent_rating: 1000000,
    game_date: "",
    org_name: "",
    opponent_name: "",
  });

  games?.forEach((game: any) => {
    if (
      game?.score === 0 &&
      game?.optRating !== null &&
      game?.opponent_rating < lowestLose().opponent_rating &&
      game?.opponent_rating !== ""
    ) {
      setLowestLose(game);
    }
  });

  return (
    <div class="flex border-2 rounded-lg items-center mx-auto w-1/2 gap-3 flex-col bg-red-300">
      <p class="text-xl">Lowest Lose:</p>
      <p class="text-2xl">{`${lowestLose()?.opponent_name}- ${
        lowestLose()?.opponent_rating
      }`}</p>
      <p class="text-lg">{`${lowestLose()?.org_name}`}</p>
      <p class="text-lg">{`${lowestLose()?.game_date}`}</p>
    </div>
  );
};

export default LowestLose;
