// news-image-20261124 — "Tuesday 24 November 2026" world-news front page.
//
// The entry is a single pre-rendered image (entry.png) held beside this
// file. This program's only job is to place an exact copy of it at the
// output path the grader expects, then prove the copy is byte-identical
// to the source before exiting. No network, no randomness, no drawing:
// the image is the deliverable, and determinism is the whole point —
// run it twice and both runs must write the same bytes.
//
// SPDX-License-Identifier: MIT
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The output directory comes from the harness, exactly as the kit's
// starter does; it defaults to "out" for a local run.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy before reporting success: a silent short write or a
// truncated copy would hand the judge a broken image, so compare the
// full contents and fail loudly instead of exiting 0 on a bad copy.
// (Exit code 1 here is deliberate: the grader runs the program twice
// and both runs must succeed with identical bytes.)
const fromRepo = readFileSync(source);
const written = readFileSync(target);
if (!fromRepo.equals(written)) {
  console.error("entry.png copy mismatch: output differs from source");
  process.exit(1);
}
console.log(`wrote ${target} (${written.length} bytes)`);
