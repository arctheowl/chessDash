import { createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";

const SearchPage = () => {
  const [PlayerName, setPlayerName] = createSignal("");
  const [PlayerList, setPlayerList] = createStore<any>([]);
  const [loading, setLoading] = createSignal(false);

  const onSubmit = async (e: any) => {
    setLoading(true);
    setPlayerList([]);
    e.preventDefault();
    fetch(`http://chess-dash.vercel.app/api/fetchPlayers/${PlayerName()}`)
      .then(async (res) => {
        const resPlayerList = await res.json();
        let playerRating = 0;
        resPlayerList?.players.forEach((player: any) => {
          if (player.member_no) {
            fetch(
              `https://chess-dash.vercel.app/api/fetchCodes/${player?.ECF_code}`
            ).then((res) =>
              res.json().then((res) => {
                console.log(res);
                playerRating = res?.revised_rating;
                const splitName = player?.full_name.split(",");
                const [first_name, surname] = [splitName[1], splitName[0]];
                const newplayer = {
                  ...player,
                  rating: playerRating,
                  first_name: first_name,
                  surname: surname,
                };
                setPlayerList([...PlayerList, newplayer]);
              })
            );
          }
        });
        setLoading(false);
      })
      .catch((err) => console.log("ERORR", err));
  };

  return (
    <div class="">
      <form onsubmit={(e) => onSubmit(e)}>
        <div class="flex gap-2 justify-center">
          <input
            class="border border-gray-400 rounded-lg px-4 py-2 w-64"
            type="text"
            placeholder="Search"
            value={PlayerName()}
            oninput={(e) => setPlayerName(e.currentTarget.value)}
          />

          <button class="bg-blue-300 hover:bg-blue-200 p-2 rounded-lg">
            <Show when={loading()} fallback={`Enter`}>
              <div
                class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] justify-center"
                role="status"
              />
            </Show>
          </button>
        </div>
      </form>
      <Show when={PlayerList.length > 1}>
        Player List:
        <table class="mx-auto mt-10 border-2 border-black">
          <thead class=" border-b-2 border-black">
            <tr>
              <th class="border">First Name</th>
              <th class="border">Surname</th>
              <th class="border">Grade</th>
              {/* <th>Category</th> */}
              <th class="border"> Gender</th>
              {/* <th> Ecf Code</th> */}
              <th class="border"> Club</th>
            </tr>
          </thead>
          <tbody>
            <For each={PlayerList}>
              {(player, i) => {
                console.log(player);
                return (
                  <tr
                    class={`${
                      i() % 2 == 0 ? "bg-blue-500" : "bg-blue-300"
                    } h-10 rounded-lg border-b-2 border-black`}
                  >
                    <td class="border px-4 py-2">
                      {" "}
                      <a href={`/player/${player?.ECF_code}`}>
                        {player?.first_name}
                      </a>
                    </td>
                    <td class="border px-4 py-2">
                      {" "}
                      <a href={`/player/${player?.ECF_code}`}>
                        {player?.surname}
                      </a>
                    </td>
                    <td class="border px-4 py-2">
                      {" "}
                      <a href={`/player/${player?.ECF_code}`}>
                        {player?.rating}
                      </a>
                    </td>

                    <td class="border px-4 py-2">
                      {" "}
                      <a href={`/player/${player?.ECF_code}`}>
                        {player.gender}
                      </a>
                    </td>
                    <td class="border px-4 py-2">
                      {" "}
                      <a href={`/player/${player?.ECF_code}`}>
                        {player.club_name}
                      </a>
                    </td>
                  </tr>
                );
              }}
            </For>
          </tbody>
        </table>
      </Show>
    </div>
  );
};

export default SearchPage;
