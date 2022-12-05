import { getInput } from "../utils.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await getInput(__dirname);

function getRucksacks(data: string): string[] {
  return data.split("\n");
}

const allItems = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getItemPriority(item: string): number {
  return allItems.indexOf(item) + 1;
}

export function getDuplicateItemsPriority(data: string): number {
  let priority = 0;
  const rucksacks = getRucksacks(data);

  rucksacks.forEach((rucksack) => {
    const half = Math.ceil(rucksack.length / 2);
    const compartment1 = rucksack.slice(0, half);
    const compartment2 = rucksack.slice(half);
    const dupes = [];

    for (const item of compartment1) {
      if (compartment2.indexOf(item) > -1 && dupes.indexOf(item) === -1) {
        dupes.push(item);
        priority += getItemPriority(item);
      }
    }
  });

  return priority;
}

export function getGroupBadgesPriority(data: string): number {
  let priority = 0;
  const rucksacks = getRucksacks(data);
  const groups = [];

  // get three-elf groups
  for (let i = 0; i < rucksacks.length - 2; i += 3) {
    groups.push(rucksacks.slice(i, i + 3));
  }

  for (const group of groups) {
    const [elf1, elf2, elf3] = group;
    const dupes = [];

    for (const item of elf1) {
      if (
        elf2.indexOf(item) > -1 &&
        elf3.indexOf(item) > -1 &&
        dupes.indexOf(item) === -1
      ) {
        dupes.push(item);
        priority += getItemPriority(item);
      }
    }
  }

  return priority;
}

console.log("part 1: ", getDuplicateItemsPriority(input));
console.log("part 2: ", getGroupBadgesPriority(input));
