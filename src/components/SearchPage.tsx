import { createSignal, Show } from "solid-js";
import PlayerList from "./PlayerList";

const SearchPage = () => {
  const [PlayerName, setPlayerName] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [showPlayerList, setShowPlayerList] = createSignal(false);

  return (
    <div class="">
      <div class="flex gap-2 justify-center">
        <input
          class="border border-gray-400 rounded-lg px-4 py-2 w-64"
          type="text"
          placeholder="Search"
          value={PlayerName()}
          oninput={(e) => setPlayerName(e.currentTarget.value)}
        />

        <button
          onClick={() => setShowPlayerList(true)}
          class="bg-blue-300 hover:bg-blue-200 p-2 rounded-lg"
        >
          Enter
        </button>
      </div>
      <Show when={showPlayerList()}>
        <PlayerList name={PlayerName()} setLoading={setLoading} />
      </Show>
    </div>
  );
};

export default SearchPage;
