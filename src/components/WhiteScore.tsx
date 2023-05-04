import { createSignal } from "solid-js";

const WhiteScore = ({ games }: any) => {
  const [whiteScore, setWhiteScore] = createSignal({
    wins: 0,
    losses: 0,
    draws: 0,
    total: 0,
  });

  games?.forEach((game: any) => {
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
  return (
    <div>
      Wins as White :{`${whiteScore().wins}`}
      Loses as White :{`${whiteScore().losses}`}
      Draws as White :{`${whiteScore().draws}`}
      Total as White :{`${whiteScore().total}`}
    </div>
  );
};

export default WhiteScore;
