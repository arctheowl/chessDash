import { useParams } from "solid-start";
import HighestWin from "./HighestWin";
import LowestLose from "./LowestLose";
import HighestRating from "./HighestRating";
import WhiteScore from "./WhiteScore";
import BlackScore from "./BlackScore";
import { For, createResource } from "solid-js";

const PastGames = () => {
  const id = useParams().id;

  const [GameHistory] = createResource(async () => {
    return fetch(
      `https://www.ecfrating.org.uk/v2/new/api.php?v2/games/Standard/player/${id}`
    ).then((res) => res.json());
  });
  let i = 0;
  return (
    <div>
      <div class="flex md:w-1/3 mx-auto p-5">
        <HighestWin games={GameHistory()?.games} />
        <LowestLose games={GameHistory()?.games} />
      </div>
      <HighestRating games={GameHistory()?.games} />
      <WhiteScore games={GameHistory()?.games} />
      <BlackScore games={GameHistory()?.games} />
      Past Games: {GameHistory()?.games.length}
      <table class="w-2/3 mx-auto border-2">
        <thead class="w-full bg-red-200">
          <tr>
            <th class="px-10 text-center border-2 border-gray-600">Index</th>
            <th class="px-10 text-center  border-2 border-gray-600">Date</th>
            <th class="px-10  border-2 border-gray-600">Color</th>
            <th class="px-10 text-center  border-2 border-gray-600">Score</th>
            <th class="px-10 text-center  border-2 border-gray-600">
              Rating Change
            </th>
            <th class="px-10 text-center  border-2 border-gray-600">Rating</th>
            <th class="px-10 text-center  border-2 border-gray-600">
              Opponent
            </th>
            <th class="px-10 text-center  border-2 border-gray-600">
              Opt Rating
            </th>
            <th class="px-10 text-center  border-2 border-gray-600">
              Opt ECF Code
            </th>
            <th class="px-10 text-center  border-2 border-gray-600">Event</th>
          </tr>
        </thead>
        <tbody>
          <For each={GameHistory()?.games}>
            {(game) => {
              if (game?.opponent_name) {
                i++;
                return (
                  <tr
                    class={`${i % 2 == 0 ? "bg-blue-500" : "bg-blue-300"} h-10`}
                  >
                    <td class="text-center border-2 border-gray-600">{i}</td>
                    <td class="text-center border-2 border-gray-600">
                      {game?.game_date}
                    </td>
                    <td class="text-center border-2 border-gray-600">
                      {game?.colour}
                    </td>
                    <td class="text-center border-2 border-gray-600">
                      {game.score > 2 ? "1/2" : game.score}
                    </td>
                    <td class="text-center border-2 border-gray-600">
                      {game.increment}
                    </td>
                    <td class="text-center border-2 border-gray-600">
                      {game.player_rating}
                    </td>
                    <td class="text-center border-2 border-gray-600">
                      {game.opponent_name}
                    </td>
                    <td class="text-center border-2 border-gray-600">
                      {game.opponent_rating}
                    </td>
                    <td class="text-center border-2 border-gray-600">
                      {game.opponent_no}
                    </td>
                    {/* <td class="text-center">{game.optECFType}</td> */}
                    <td class="text-center border-2 border-gray-600">
                      {game.org_name} {game.event_name}
                    </td>
                  </tr>
                );
              }
            }}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default PastGames;
