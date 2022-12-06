import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getTopRowPart1, getTopRowPart2 } from "./index.ts";

const input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

Deno.test("part 1: string representing the top crates of all stacks", () => {
  assertEquals(getTopRowPart1(input), "CMZ");
});

Deno.test("part 2: string representing the top crates of all stacks", () => {
  assertEquals(getTopRowPart2(input), "MCD");
});
