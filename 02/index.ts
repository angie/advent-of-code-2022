import { getInput } from "../utils.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await getInput(__dirname);

const OUTCOME_FROM_SHAPES: Record<string, Record<string, string>> = {
  A: { X: "draw", Y: "win", Z: "loss" },
  B: { X: "loss", Y: "draw", Z: "win" },
  C: { X: "win", Y: "loss", Z: "draw" },
};

const RESULT_SCORE: Record<string, number> = {
  loss: 0,
  draw: 3,
  win: 6,
  X: 0,
  Y: 3,
  Z: 6,
};

const SHAPE_SCORE: Record<string, number> = { X: 1, Y: 2, Z: 3 };

function getPairs(input: string): string[][] {
  const pairs = input
    .trim()
    .split("\n")
    .map((line) => line.split(" "));

  return pairs;
}

export function getScore(data: string): number {
  const pairs = getPairs(data);

  const total = pairs.reduce((acc, pair) => {
    const [them, me] = pair;
    const outcome = OUTCOME_FROM_SHAPES[them][me];
    const score = RESULT_SCORE[outcome] + SHAPE_SCORE[me];
    return acc + score;
  }, 0);

  return total;
}

const SCORE_FROM_OUTCOME: Record<string, Record<string, number>> = {
  A: { X: 3, Y: 1, Z: 2 },
  B: { X: 1, Y: 2, Z: 3 },
  C: { X: 2, Y: 3, Z: 1 },
};

export function getAlternateScore(data: string): number {
  let score = 0;
  const pairs = getPairs(data);

  pairs.forEach((pair) => {
    const [them, result] = pair;

    score += SCORE_FROM_OUTCOME[them][result];
    score += RESULT_SCORE[result];
  });

  return score;
}

console.log("part 1: ", getScore(input));
console.log("part 2: ", getAlternateScore(input));
