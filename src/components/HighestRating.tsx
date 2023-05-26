import { Show, createEffect, createSignal, onMount } from "solid-js";

type IRating = {
  date?: string | null;
  rating?: number;
};

const HighestRating = (props: { games: any[] }) => {
  const [highestRating, setHighestRating] = createSignal<IRating>({
    date: null,
    rating: 0,
  });

  createEffect(() => {
    props.games?.forEach((game: any) => {
      if (game.player_rating !== null) {
        if (game.player_rating > highestRating().rating!) {
          let newHighestRating = {
            date: game.game_date,
            rating: game.player_rating,
          };
          setHighestRating(newHighestRating);
        }
      }
    });
  });

  return (
    <div class="flex border-2 rounded-lg items-center mx-auto md:w-1/3 gap-2 flex-col p-2">
      <Show
        when={highestRating().rating != 0}
        fallback={
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        }
      >
        <p class="text-2xl">Highest Rating:</p>
        <p class="text-2xl">{`${highestRating().rating}`}</p>
        <p class="text-lg">{`${highestRating().date}`}</p>
      </Show>
    </div>
  );
};

export default HighestRating;
