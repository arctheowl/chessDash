import { Show, createEffect, createResource, createSignal } from "solid-js";

type Props = {
  data?: number[];
  rating: number;
};

const Percentile = ({ rating }: Props) => {
  const [percentile] = createResource(async () => {
    return fetch(
      `https://chess-dash.vercel.app/api/fetchPercentile/${rating}`
    ).then((res) => res.json());
  });
  createEffect(() => {
    percentile();
  });
  return (
    <div class="flex border-2 rounded-lg items-center md:w-1/3 mx-auto gap-3 flex-col mt-2">
      <Show
        when={percentile() !== undefined}
        fallback={
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] justify-center"
            role="status"
          />
        }
      >
        <p class="text-xl">Percentile of active players:</p>
        <p class="text-2xl">{`${percentile().percentile}%`}</p>
      </Show>
    </div>
  );
};

export default Percentile;
