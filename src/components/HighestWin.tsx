import { createSignal } from "solid-js";

const HighestWin = ({ games }: any) => {
  const [HighestWin, setHighestWin] = createSignal({
    opponent_rating: 0,
    game_date: "",
    org_name: "",
    opponent_name: "",
  });

  games?.forEach((game: any) => {
    if (
      game?.score === 1 &&
      game?.optRating !== null &&
      game?.opponent_rating > HighestWin().opponent_rating
    ) {
      console.log("This was a highest win", +game.score);
      setHighestWin(game);
    }
  });

  return (
    <div class="flex border-2 rounded-lg items-center mx-auto w-1/3 gap-5 flex-col">
      <p>Highest Win:</p>
      <p>{`${HighestWin()?.opponent_rating}`}</p>
      <p>vs</p>
      <p>{`${HighestWin()?.opponent_name}`}</p>
      {` at ${HighestWin()?.org_name} on ${HighestWin()?.game_date}`}
    </div>
  );
};

export default HighestWin;
