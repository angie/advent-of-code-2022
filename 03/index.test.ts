import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getDuplicateItemsPriority, getGroupBadgesPriority } from "./index.ts";

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

Deno.test("sum of priorities for duplicate items", () => {
  assertEquals(getDuplicateItemsPriority(input), 157);
});

Deno.test("sum of priorities for three-elf groups", () => {
  assertEquals(getGroupBadgesPriority(input), 70);
});
