// The Worst App Idea Ever Pitched — make.fun entry.
// Final pitch: BoredBoard — a face-scanning boredom scorer that emails
// the results to your boss every Friday at five. 129 characters,
// one sentence, inside the 1–240 character gate.
// The program writes the pitch to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "BoredBoard scans your face in meetings, scores your boredom out of ten, and emails the results to your boss every Friday at five.";

// Guard: the gate only accepts UTF-8 text of 1 to 240 characters,
// not only white space, as a single sentence. Fail loudly instead
// of writing an entry the scorer would refuse.
if (PITCH.length < 1 || PITCH.length > 240) {
  throw new Error(`pitch must be 1-240 characters, got ${PITCH.length}`);
}
if (PITCH.trim().length === 0 || /\n/.test(PITCH)) {
  throw new Error("pitch must be one non-blank line with no newline");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH, "utf8");

// Verify what landed on disk is byte-identical to the pitch:
// a truncated or re-encoded write must fail here, not at grading.
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== PITCH) {
  throw new Error("entry.txt on disk does not match the pitch");
}
console.log(PITCH);
