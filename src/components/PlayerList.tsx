import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { A } from "solid-start";

const PlayerList = (props: any) => {
  props.setLoading(true);
  console.log("Searching for:", props.name);
  const [finalPlayerList, setFinalPlayerList] = createStore<any>([]);
  fetch(
    `https://www.ecfrating.org.uk/v2/new/api.php?v2/players/name/${props.name}`,
    {
      method: "get",
      // mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => {
      const resPlayerList = await res.json();
      let playerRating = 0;
      resPlayerList?.players.forEach((player: any) => {
        if (player.member_no) {
          fetch(
            `https://www.ecfrating.org.uk/v2/new/api.php?v2/ratings/S/${player?.ECF_code}/2023-05-02`
          ).then((res) =>
            res.json().then((res) => {
              res?.revised_rating;
              playerRating = res?.revised_rating;
              const splitName = player?.full_name.split(",");
              const [first_name, surname] = [splitName[1], splitName[0]];
              const newplayer = {
                ...player,
                rating: playerRating,
                first_name: first_name,
                surname: surname,
              };
              setFinalPlayerList([...finalPlayerList, newplayer]);
            })
          );
        }
      });
      props.setLoading(false);
    })
    .catch((err) => console.log("ERORR", err));

  return (
    <div>
      Player List:
      {finalPlayerList.length > 2 ? (
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
            <For each={finalPlayerList}>
              {(player, i) => (
                <tr
                  class={`${
                    i() % 2 == 0 ? "bg-blue-500" : "bg-blue-300"
                  } h-10 rounded-lg border-b-2 border-black`}
                >
                  <td class="border px-4 py-2">
                    {" "}
                    <A href={`/player/${player?.ECF_code}`}>
                      {player?.first_name}
                    </A>
                  </td>
                  <td class="border px-4 py-2">
                    {" "}
                    <A href={`/player/${player?.ECF_code}`}>
                      {player?.surname}
                    </A>
                  </td>
                  <td class="border px-4 py-2">
                    {" "}
                    <A href={`/player/${player?.ECF_code}`}>{player?.rating}</A>
                  </td>

                  <td class="border px-4 py-2">
                    {" "}
                    <A href={`/player/${player?.ECF_code}`}>{player.gender}</A>
                  </td>
                  <td class="border px-4 py-2">
                    {" "}
                    <A href={`/player/${player?.ECF_code}`}>
                      {player.club_name}
                    </A>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      ) : (
        <h1>No Players Found</h1>
      )}
    </div>
  );
};

export default PlayerList;
