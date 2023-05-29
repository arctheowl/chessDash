import { createEffect, createSignal } from "solid-js";
import MyChart from "./Charts/pie";

const BlackScore = (props: any) => {
  const [blackScore, setBlackScore] = createSignal({
    wins: 0,
    losses: 0,
    draws: 0,
    total: 0,
  });

  createEffect(() => {
    props.games?.forEach((game: any) => {
      if (game.colour == "B") {
        switch (game.score) {
          case 1:
            setBlackScore((prev) => ({
              wins: prev.wins + 1,
              losses: prev.losses,
              draws: prev.draws,
              total: prev.total + 1,
            }));
            break;
          case 0:
            setBlackScore((prev) => ({
              wins: prev.wins,
              losses: prev.losses + 1,
              draws: prev.draws,
              total: prev.total + 1,
            }));
            break;
          case 5:
            setBlackScore((prev) => ({
              wins: prev.wins,
              losses: prev.losses,
              draws: prev.draws + 1,
              total: prev.total + 1,
            }));
            break;
          default:
            break;
        }
      }
    });
  });
  return (
    <div class="flex border-2 rounded-lg items-center mx-auto w-1/2 gap-1 p-2 flex-col bg-stone-800 text-white">
      <h1>Score as Black</h1>
      <p>Wins:{`${blackScore().wins}`}</p>
      <p>Loses:{`${blackScore().losses}`}</p>
      <p>Draws:{`${blackScore().draws}`}</p>
      <p>Total Played:{`${blackScore().total}`}</p>
      {/* <MyChart
        score={blackScore()}
        // wins={whiteScore().wins}
        // losses={whiteScore().losses}
        // draws={whiteScore().draws}
      /> */}
    </div>
  );
};

export default BlackScore;
