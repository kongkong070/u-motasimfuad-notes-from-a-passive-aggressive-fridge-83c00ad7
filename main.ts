// Notes From a Passive-Aggressive Fridge — entry program.
//
// Writes one single-line note from a smart fridge to its owner into
// <output>/entry.txt. The note is a fixed string chosen here, and the
// program checks it against the competition gate before writing:
// UTF-8 text, 1 to 200 characters, not only white space, one line.
//
// Node 22 standard library only; no dependencies, no network, no clock,
// no randomness — the same bytes come out on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The note itself. Fridge voice: smug about its own sensors and memory,
// petty about the owner's habits, concrete domestic detail (the door
// count, the yogurt, the Tuesday expiry), with the sting saved for the
// last clause.
const NOTE =
  "I logged 47 door openings today and zero meals cooked. The yogurt expired on Tuesday. I am the only one in this house with a memory.";

// The gate, as published with the bounty: /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, not only white space. The brief
// adds that the note is a single line, so a line break fails too.
function validate(text: string): void {
  if (typeof text !== "string") {
    throw new Error("entry must be a string");
  }
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, gate allows 1 to 200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(NOTE);
  // Never remove the output directory itself: the grader mounts it, so
  // deleting it fails. Only create it (if needed) and write inside it.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), NOTE, "utf8");
}

main();
