import { A, useParams } from "solid-start";
import PastGames from "./PastGames";
import { Show, createResource } from "solid-js";
import { FaSolidMedal } from "solid-icons/fa";
import { IoMan, IoWoman } from "solid-icons/io";

const PlayerDash = () => {
  const id = useParams().id;
  const [player] = createResource(async () => {
    return fetch(
      `https://www.ecfrating.org.uk/v2/new/api.php?v2/players/code/${id}`
    ).then((res) => res.json());
  });

  return (
    <div class="mx-auto md:pt-10">
      <Show
        when={player()?.full_name}
        fallback={
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        }
      >
        <div class="md:mx-auto border-2 rounded-lg md:w-1/3 p-2 text-center">
          <h1>Player Info</h1>
          <div class="flex justify-between px-10">
            <FaSolidMedal color="#ffd700" size={35} />
            {player()?.gender == "F" ? (
              <IoWoman color="#ff69b4" size={35} />
            ) : (
              <IoMan color="#00bfff" size={35} />
            )}
          </div>
          <h2> {player()?.full_name}</h2>
          <h2>
            <A href={`https://ratings.fide.com/profile/${player()?.FIDE_no}`}>
              Fide Id: {player()?.FIDE_no}
            </A>
          </h2>
          <h2>
            Country: {player()?.nation}
            {player()?.flag}
          </h2>

          <Show when={player()?.title}>
            <h2>Title: {player()?.title}</h2>
          </Show>
          <h2>Club Code: {player()?.club_code}</h2>
          <h2>Club: {player()?.club_name}</h2>
          <h2>Last Game: {player()?.date_last_game}</h2>
        </div>

        <PastGames />
      </Show>
    </div>
  );
};

export default PlayerDash;
