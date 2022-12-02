import { resolve } from "https://deno.land/std@0.167.0/path/mod.ts";

export async function getInput(dir: string): Promise<string> {
  return await Deno.readTextFile(resolve(dir, "./input.txt"));
}

export function getKeyValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
