import { APIEvent, json } from "solid-start";

export async function GET({ params }: APIEvent) {
  const response = await fetch(
    `https://www.ecfrating.org.uk/v2/new/api.php?v2/players/name/${params.name}`
  ).then((res) => res.json().catch((err) => console.log(err)));
  // console.log(response);
  return json(response);
}
