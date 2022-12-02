import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  getElves,
  getMostTotalCalories,
  getSumOfTop3Calories,
} from "./index.ts";

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

Deno.test("gets an array of calories for each elf", () => {
  const expected = [
    [1000, 2000, 3000],
    [4000],
    [5000, 6000],
    [7000, 8000, 9000],
    [10000],
  ];

  assertEquals(getElves(input), expected);
});

Deno.test(
  "finds the largest total number of calories carried by an elf",
  () => {
    assertEquals(getMostTotalCalories(input), 24000);
  }
);

Deno.test("finds the total calories carried by top 3 elves", () => {
  assertEquals(getSumOfTop3Calories(input), 45000);
});
