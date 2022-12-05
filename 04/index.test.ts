import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  getAssignmentOverlapCount,
  getFullyContainedAssignmentsCount,
} from "./index.ts";

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

Deno.test("counts number of assignments fully containing another", () => {
  assertEquals(getFullyContainedAssignmentsCount(input), 2);
});

Deno.test("counts number of assignments with an overlap", () => {
  assertEquals(getAssignmentOverlapCount(input), 4);
});
