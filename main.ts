import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One funny single-line excuse a developer gives when code breaks in
// production. The twist: the rollback rolled back the rollback, so the
// bug came back — and got rebranded as a legacy feature.
const EXCUSE =
  "The rollback rolled back the rollback, so the bug is back \u2014 and now it's a legacy feature.";

const MAX_CODE_POINTS = 200;

// Count Unicode code points (not UTF-16 code units), as the gate does.
const codePoints = [...EXCUSE].length;

if (codePoints < 1 || codePoints > MAX_CODE_POINTS) {
  throw new Error(
    `Excuse must be 1-${MAX_CODE_POINTS} code points, got ${codePoints}.`,
  );
}
if (EXCUSE.trim().length === 0) {
  throw new Error("Excuse must not be only whitespace.");
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("Excuse must be a single line.");
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
console.log(`Wrote ${codePoints} code points to /output/entry.txt`);
