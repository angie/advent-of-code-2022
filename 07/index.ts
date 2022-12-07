import { getInput } from "../utils.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await getInput(__dirname);

type FileSystem = {
  parent?: FileSystem;
  dirs: { [name: string]: FileSystem };
  files: { [name: string]: number };
};

function parseFs(data: string): FileSystem {
  const fs: FileSystem = { dirs: {}, files: {} };
  let current = fs;

  for (const line of data.trim().split("\n")) {
    const [start, ...rest] = line.split(" ");

    if (start === "$") {
      const cmd = rest[0];
      // console.log("command line", cmd);
      if (cmd === "cd") {
        const dir = rest[1];

        if (dir === "/") {
          current = fs;
        } else if (dir === "..") {
          current = current.parent!;
        } else {
          // if we haven't seen this directory before...
          if (!current.dirs[dir]) {
            current.dirs[dir] = { parent: current, dirs: {}, files: {} };
          }

          // move on to parse the next dir
          current = current.dirs[dir];
        }
      }
    } else if (start !== "dir") {
      current.files[rest[0]] = Number.parseInt(start);
    }
  }

  return fs;
}

let dirSizes: number[] = [];

function calcDirSizes(fs: FileSystem): number {
  let size = 0;

  for (const file in fs.files) {
    size += fs.files[file];
  }

  for (const dir in fs.dirs) {
    const dirSize = calcDirSizes(fs.dirs[dir]);
    size += dirSize;
    dirSizes.push(dirSize);
  }

  return size;
}

export function part1(data: string): number {
  dirSizes = [];
  const fs = parseFs(data);
  calcDirSizes(fs);

  return dirSizes
    .filter((d) => d <= 100_000)
    .reduce((curr, acc) => curr + acc, 0);
}

export function part2(data: string): number {
  dirSizes = [];
  const fs = parseFs(data);
  const root = calcDirSizes(fs);

  const TOTAL_SPACE = 70_000_000;
  const SPACE_REQUIRED = 30_000_000;

  return Math.min(
    ...dirSizes.filter((d) => d >= SPACE_REQUIRED - (TOTAL_SPACE - root))
  );
}

console.log("part 1: ", part1(input));
console.log("part 2: ", part2(input));
