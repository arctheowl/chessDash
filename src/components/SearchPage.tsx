import { createEffect, createSignal, Show } from "solid-js";
import PlayerList from "./PlayerList";

const SearchPage = () => {
  const [PlayerName, setPlayerName] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [showPlayerList, setShowPlayerList] = createSignal(false);
  createEffect(() => {
    if (PlayerName() === "") {
      setShowPlayerList(false);
    }
  });
  return (
    <div class="">
      <form
        onsubmit={(e) => {
          e.preventDefault();
        }}
      >
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
            <Show when={loading()} fallback={`Enter`}>
              <div
                class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] justify-center"
                role="status"
              />
            </Show>
          </button>
        </div>
      </form>
      <Show when={showPlayerList()}>
        <PlayerList name={PlayerName()} setLoading={setLoading} />
      </Show>
    </div>
  );
};

export default SearchPage;
