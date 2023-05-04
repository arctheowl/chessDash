import { createResource } from "solid-js";
import { createStore } from "solid-js/store";

export type IGameRecord = {
  date?: string | null;
  ratingChange?: string | null;
  color?: string | null;
  score?: string | null;
  rating?: string | null;
  opponent?: string | null;
  optRating?: string | null;
  optECFCode?: string | null;
  optECFType?: string | null;
  optGender?: string | null;
  event?: string | null;
};

export const [gameRecords, setGameRecords] = createStore<IGameRecord[]>([
  {
    date: null,
    ratingChange: null,
    color: null,
    score: null,
    rating: null,
    opponent: null,
    optRating: null,
    optECFCode: null,
    optECFType: null,
    optGender: null,
    event: null,
  },
]);

export const [GameHistory] = createResource(async (id) => {
  return fetch(
    `https://www.ecfrating.org.uk/v2/new/api.php?v2/games/Standard/player/${id}`
  ).then((res) => res.json());
});
