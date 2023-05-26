import { Show, createEffect, createSignal } from "solid-js";

const HighestWin = (props: any) => {
  const [HighestWin, setHighestWin] = createSignal({
    opponent_rating: 0,
    game_date: "",
    org_name: "",
    event_name: "",
    opponent_name: "",
  });

  createEffect(() => {
    props.games?.forEach((game: any) => {
      if (
        game?.score === 1 &&
        game?.optRating !== null &&
        game?.opponent_rating > HighestWin().opponent_rating
      ) {
        console.log("This was a highest win", +game.score);
        setHighestWin(game);
      }
    });
  });

  return (
    <div class="flex border-2 rounded-lg items-center w-1/2 gap-3 flex-col bg-green-300">
      <Show
        when={HighestWin()?.opponent_rating != 0}
        fallback={
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] justify-center"
            role="status"
          />
        }
      >
        <p class="text-xl">Highest Win:</p>
        <p class="text-2xl">{`${HighestWin()?.opponent_name} - ${
          HighestWin()?.opponent_rating
        }`}</p>
        <p class="text-lg">{`${HighestWin()?.org_name}`}</p>
        <p class="text-lg">{`${HighestWin()?.game_date}`}</p>
      </Show>
    </div>
  );
};

export default HighestWin;
