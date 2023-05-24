import { createSignal } from "solid-js";

type IRating = {
  date?: string | null;
  rating?: number;
};

const HighestRating = ({ games }: any) => {
  const [highestRating, setHighestRating] = createSignal<IRating>({
    date: null,
    rating: 0,
  });

  games?.forEach((game: any) => {
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
  return (
    <div class="flex border-2 rounded-lg items-center mx-auto md:w-1/3 gap-5 flex-col p-2">
      <p>Highest Rating:</p>
      <p>{`${highestRating().rating} on ${highestRating().date}`}</p>
    </div>
  );
};

export default HighestRating;
