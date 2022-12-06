import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getStartOfPacketMarker, getStartOfMessageMarker } from "./index.ts";

Deno.test("find correct start of packet marker", () => {
  assertEquals(getStartOfPacketMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
  assertEquals(getStartOfPacketMarker("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
  assertEquals(getStartOfPacketMarker("nppdvjthqldpwncqszvftbrmjlhg"), 6);
  assertEquals(getStartOfPacketMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
  assertEquals(getStartOfPacketMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
});

Deno.test("find correct start of message marker", () => {
  assertEquals(getStartOfMessageMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
  assertEquals(getStartOfMessageMarker("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23);
  assertEquals(getStartOfMessageMarker("nppdvjthqldpwncqszvftbrmjlhg"), 23);
  assertEquals(
    getStartOfMessageMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"),
    29
  );
  assertEquals(getStartOfMessageMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26);
});
