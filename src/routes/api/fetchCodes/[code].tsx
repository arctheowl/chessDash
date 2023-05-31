import { APIEvent, json } from "solid-start";

export async function GET({ params }: APIEvent) {
  let firstDate = Date.now();
  let isoDate = new Date(firstDate);
  let finalDate = isoDate.toISOString().slice(0, 10);
  const response = await fetch(
    `https://www.ecfrating.org.uk/v2/new/api.php?v2/ratings/S/${params.code}/${finalDate}`
  ).then((res) => res.json().catch((err) => console.log(err)));
  // console.log(response);
  return json(response);
}
