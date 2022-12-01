import { resolve } from "https://deno.land/std@0.167.0/path/mod.ts";

export async function getInput(dir: string): Promise<string> {
  return await Deno.readTextFile(resolve(dir, "./input.txt"));
}
