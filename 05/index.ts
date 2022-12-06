import { getInput } from "../utils.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await getInput(__dirname);

function parseStacks(lines: string[]): string[][] {
  const numStacks = lines.pop()?.replace(/\s/g, "").length;
  const stacks: string[][] = Array.from(Array(numStacks), () => []);

  for (const line of lines.reverse()) {
    // each crate is 3 characters long, e.g. [A], so we'll examine each chunk to check if it's a crate
    const chunkSize = 3;
    let stackIdx = 0;
    let pointer = 0;

    while (pointer < line.length) {
      // grab the next chunk
      const chunk = line.slice(pointer, pointer + chunkSize);
      // check if it's a crate or not
      if (chunk.match(/\[\w\]/)) {
        // if it's a crate, push it onto the correct stack
        stacks[stackIdx].push(chunk[1]);
      }

      // set our pointer to look at the next chunk (+1 for spaces between crates)
      pointer += chunkSize + 1;
      // and move along to the next stack
      stackIdx += 1;
    }
  }

  return stacks;
}

function getStacksAndInstructions(data: string): {
  stacks: string[][];
  instructions: number[][];
} {
  const instructions = [];

  const [rawStacks, rawInstructions] = data
    .split("\n\n")
    .map((d) => d.split("\n"));

  for (const ri of rawInstructions) {
    const matches = ri.match(/\d+/g)?.map((m) => Number.parseInt(m));

    if (matches) {
      instructions.push(matches);
    }
  }

  const stacks = parseStacks(rawStacks);

  return {
    stacks,
    instructions,
  };
}

export function getTopRowPart1(data: string): string {
  const { stacks, instructions } = getStacksAndInstructions(data);

  for (const instruction of instructions) {
    const [moves, from, to] = instruction;
    for (let i = 0; i < moves; i++) {
      const crate = stacks[from - 1].pop() as string;
      stacks[to - 1].push(crate);
    }
  }

  return stacks.reduce((acc, curr) => {
    return (acc += curr[curr.length - 1]);
  }, "");
}

export function getTopRowPart2(data: string): string {
  const { stacks, instructions } = getStacksAndInstructions(data);

  for (const instruction of instructions) {
    const [moves, from, to] = instruction;
    const moving = stacks[from - 1].splice(-moves, moves);
    stacks[to - 1].push(...moving);
  }

  return stacks.reduce((acc, curr) => {
    return (acc += curr[curr.length - 1]);
  }, "");
}

console.log("part 1: ", getTopRowPart1(input));
console.log("part 2: ", getTopRowPart2(input));
