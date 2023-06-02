import { Show, createEffect, createSignal } from "solid-js";

const LowestLose = (props: any) => {
  const [lowestLose, setLowestLose] = createSignal({
    opponent_rating: 1000000,
    game_date: "",
    org_name: "",
    opponent_name: "",
  });
  createEffect(() => {
    props.games?.forEach((game: any) => {
      if (
        game?.score === 0 &&
        game?.optRating !== null &&
        game?.opponent_rating < lowestLose().opponent_rating &&
        game?.opponent_rating !== ""
      ) {
        setLowestLose(game);
      }
    });
  });

  return (
    <div class="flex border-2 rounded-lg items-center mx-auto w-1/2 gap-3 flex-col bg-red-300">
      <Show
        when={lowestLose()?.game_date != ""}
        fallback={
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] justify-center"
            role="status"
          />
        }
      >
        <p class="text-xl">Lowest Lose:</p>
        <p class="text-2xl">{`${lowestLose()?.opponent_name}- ${
          lowestLose()?.opponent_rating
        }`}</p>
        <p class="text-lg">{`${lowestLose()?.org_name}`}</p>
        <p class="text-lg">{`${lowestLose()?.game_date}`}</p>
      </Show>
    </div>
  );
};

export default LowestLose;
