import { createEffect, createSignal } from "solid-js";
import MyChart from "./Charts/pie";

const WhiteScore = (props: any) => {
  const [whiteScore, setWhiteScore] = createSignal({
    wins: 0,
    losses: 0,
    draws: 0,
    total: 0,
  });
  createEffect(() => {
    props.games?.forEach((game: any) => {
      if (game.colour == "W") {
        switch (game.score) {
          case 1:
            setWhiteScore((prev) => ({
              wins: prev.wins + 1,
              losses: prev.losses,
              draws: prev.draws,
              total: prev.total + 1,
            }));
            break;
          case 0:
            setWhiteScore((prev) => ({
              wins: prev.wins,
              losses: prev.losses + 1,
              draws: prev.draws,
              total: prev.total + 1,
            }));
            break;
          case 5:
            setWhiteScore((prev) => ({
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
    <div class="flex border-2 rounded-lg items-center mx-auto w-1/2 gap-1 p-2 flex-col">
      <h1>Score as White</h1>
      <p>Wins:{`${whiteScore().wins}`}</p>
      <p>Loses:{`${whiteScore().losses}`}</p>
      <p>Draws:{`${whiteScore().draws}`}</p>
      <p>Total Played:{`${whiteScore().total}`}</p>
      {/* <MyChart
        score={whiteScore()}
        wins={whiteScore().wins}
        losses={whiteScore().losses}
        draws={whiteScore().draws}
      /> */}
    </div>
  );
};

export default WhiteScore;
