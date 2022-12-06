import { getInput } from "../utils.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await getInput(__dirname);

function getStartOfMarker(data: string, numDistinctChars: number): number {
  let startIdx = 0;
  let endIdx = numDistinctChars;
  let markerFound = false;

  while (endIdx < data.length && !markerFound) {
    const chunk = data.slice(startIdx, endIdx);
    const unique = new Set(chunk);

    if (unique.size === chunk.length) {
      markerFound = true;
    } else {
      startIdx += 1;
      endIdx += 1;
    }
  }

  return endIdx;
}

export function getStartOfPacketMarker(data: string): number {
  return getStartOfMarker(data, 4);
}

export function getStartOfMessageMarker(data: string): number {
  return getStartOfMarker(data, 14);
}

console.log("part 1: ", getStartOfPacketMarker(input));
console.log("part 2: ", getStartOfMessageMarker(input));
