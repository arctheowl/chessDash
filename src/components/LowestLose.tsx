import { createSignal } from "solid-js";

const LowestLose = ({ games }: any) => {
  const [lowestLose, setLowestLose] = createSignal({
    opponent_rating: 1000000,
    game_date: "",
    org_name: "",
    opponent_name: "",
  });

  games?.forEach((game: any) => {
    console.log(game);
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
    <div class="flex border-2 rounded-lg items-center mx-auto w-1/2 gap-3 flex-col">
      <p>Lowest Lose:</p>
      <p>{`${lowestLose()?.opponent_rating}`}</p>
      <p>vs</p>
      <p>{`${lowestLose()?.opponent_name}`}</p>
      {` at ${lowestLose()?.org_name} on ${lowestLose()?.game_date}`}
    </div>
  );
};

export default LowestLose;
