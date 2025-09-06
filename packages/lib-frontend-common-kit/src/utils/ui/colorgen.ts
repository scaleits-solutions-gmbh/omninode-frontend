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
  let hash: number = 0;
  for (let i = 0; i < seed.length; i++) {
    hash += seed.charCodeAt(i);
  }
  const color: availableColor = colors[hash % colors.length] as availableColor;
  return color;
} 