import { getInput } from "../utils.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await getInput(__dirname);

export function getElves(data: string): number[][] {
  return data.split("\n\n").map((line) => line.split("\n").map(Number));
}

export function getMostTotalCalories(data: string): number {
  const elves = getElves(data);

  let highest = 0;
  for (const elf of elves) {
    const total = elf.reduce((acc, curr) => acc + curr, 0);

    if (total > highest) highest = total;
  }

  return highest;
}

console.log(getMostTotalCalories(input));
