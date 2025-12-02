export type availableColor =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "orange"
  | "pink"
  | "brown"
  | "gray";

export function generateColor(seed: string): availableColor {
  const colors: availableColor[] = [
    "blue",
    "red",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "gray",
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash += seed.charCodeAt(i);
  }
  const color = colors[hash % colors.length];
  return color;
}
