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

export function getSumOfTop3Calories(data: string): number {
  const totalCaloriesPerElf = getElves(data).map((cals) => {
    return cals.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  });

  const topThree = totalCaloriesPerElf.sort((a, b) => b - a).slice(0, 3);
  return topThree.reduce((acc, curr) => acc + curr, 0);
}

console.log("part 1: ", getMostTotalCalories(input));
console.log("part 2: ", getSumOfTop3Calories(input));
