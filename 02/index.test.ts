import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getAlternateScore, getScore } from "./index.ts";

const input = `A Y
B X
C Z`;

Deno.test("calculate score from pairs", () => {
  assertEquals(getScore(input), 15);
});

Deno.test("calculate secret alternate score from pairs", () => {
  assertEquals(getAlternateScore(input), 12);
});
