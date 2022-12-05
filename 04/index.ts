import { getInput } from "../utils.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await getInput(__dirname);

function getAssignmentStartEndPairs(assignments: string): number[][][] {
  const startEndPairs: number[][][] = [];

  assignments
    .trim()
    .split("\n")
    .forEach((assignment) => {
      const [assignment1, assignment2] = assignment.split(",");
      const [start1, end1] = assignment1.split("-");
      const [start2, end2] = assignment2.split("-");
      startEndPairs.push([
        [Number.parseInt(start1), Number.parseInt(end1)],
        [Number.parseInt(start2), Number.parseInt(end2)],
      ]);
    });

  return startEndPairs;
}

function isFullyContained(
  assignment1: number[],
  assignment2: number[]
): boolean {
  const [start1, end1] = assignment1;
  const [start2, end2] = assignment2;

  if (start1 >= start2 && end1 <= end2) {
    return true;
  }

  if (start2 >= start1 && end2 <= end1) {
    return true;
  }

  return false;
}

export function getFullyContainedAssignmentsCount(data: string): number {
  let count = 0;
  const assignmentPairs = getAssignmentStartEndPairs(data);

  assignmentPairs.forEach((assignmentPair) => {
    const [assignment1, assignment2] = assignmentPair;
    if (isFullyContained(assignment1, assignment2)) {
      count += 1;
    }
  });

  return count;
}

function hasOverlap(assignmentPair: number[][]): boolean {
  const [assignment1, assignment2] = assignmentPair;
  const [start1, end1] = assignment1;
  const [start2, end2] = assignment2;

  if (start1 <= end2 && end1 >= start2) {
    return true;
  }

  if (start2 <= end1 && end2 >= start1) {
    return true;
  }

  return false;
}

export function getAssignmentOverlapCount(data: string): number {
  let count = 0;
  const assignments = getAssignmentStartEndPairs(data);

  assignments.forEach((assignment) => {
    if (hasOverlap(assignment)) {
      count += 1;
    }
  });

  return count;
}

console.log("part 1: ", getFullyContainedAssignmentsCount(input));
console.log("part 2: ", getAssignmentOverlapCount(input));
