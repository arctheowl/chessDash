import { A, useParams } from "solid-start";
import HighestWin from "./HighestWin";
import LowestLose from "./LowestLose";
import HighestRating from "./HighestRating";
import WhiteScore from "./WhiteScore";
import BlackScore from "./BlackScore";
import { For, Show, createResource } from "solid-js";
import LineChart from "./Charts/gradeHistory";

const PastGames = () => {
  const id = useParams().id;

  const [GameHistory] = createResource(async () => {
    return fetch(
      `https://www.ecfrating.org.uk/v2/new/api.php?v2/games/Standard/player/${id}`
    ).then((res) => res.json());
  });
  let i = 0;
  return (
    <div class="p-2 text-center">
      <HighestRating games={GameHistory()?.games} />
      <div class="flex md:w-1/3 mx-auto gap-2 py-2">
        <HighestWin games={GameHistory()?.games} />
        <LowestLose games={GameHistory()?.games} />
      </div>
      <div class="flex md:w-1/3 mx-auto gap-2 py-2">
        <WhiteScore games={GameHistory()?.games} />
        <BlackScore games={GameHistory()?.games} />
      </div>
      <div class="md:w-1/2 p-2 mx-auto">
        <h1 class="text-2xl">Game History</h1>
        <LineChart games={GameHistory()?.games} />
      </div>

      {/* <p>Past Games: {GameHistory()?.games.length}</p> */}
      <div class="pt-10">
        <h1 class="text-2xl">Game History</h1>
      </div>
      <div class=" -ml-1 overflow-scroll">
        <table class="md:w-1/2 md:mx-auto border-2 text-sm md:text-base">
          <thead class="md:w-full bg-red-200">
            <tr>
              {/* <th class="px-10 text-center border-2 border-gray-600">Index</th> */}
              <th class="md:px-10 text-center  border-2 border-gray-600">
                Date
              </th>
              <th class="md:px-10  border-2 border-gray-600">Color</th>
              <th class="md:px-10 text-center  border-2 border-gray-600">
                Score
              </th>
              <th class="md:px-10 text-center  border-2 border-gray-600">
                Rating Change
              </th>
              <th class="md:px-10 text-center  border-2 border-gray-600">
                Rating
              </th>
              <th class="md:px-10 text-center  border-2 border-gray-600">
                Opponent
              </th>
              <th class="md:px-10 text-center  border-2 border-gray-600">
                Opt Rating
              </th>
              {/* <th class="px-10 text-center  border-2 border-gray-600">
                Opt ECF Code
              </th> */}
              <th class="md:px-10 text-center  border-2 border-gray-600">
                Event
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={GameHistory()?.games}>
              {(game) => {
                if (game?.opponent_name.length) {
                  i++;
                  return (
                    <tr
                      class={`${
                        i % 2 == 0 ? "bg-blue-500" : "bg-blue-300"
                      } h-10`}
                    >
                      {/* <td class="text-center border-2 border-gray-600">{i}</td> */}
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
                        <a href={`/player/${game.opponent_no}`}>
                          {game.opponent_name}
                        </a>
                      </td>
                      <td class="text-center border-2 border-gray-600">
                        {game.opponent_rating}
                      </td>
                      {/* <td class="text-center border-2 border-gray-600">
                        {game.opponent_no}
                      </td> */}
                      {/* <td class="text-center">{game.optECFType}</td> */}
                      <td class="text-center border-2 border-gray-600">
                        {game?.org_name}
                        {game?.event_name}
                      </td>
                    </tr>
                  );
                }
              }}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastGames;
