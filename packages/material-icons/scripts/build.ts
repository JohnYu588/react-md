import { transformFile } from "@swc/core";
import { glob } from "glob";
import { rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SRC_DIR = "src";

// clean -- about the same as `rm -f *Icon.d.ts *Icon.js`
const existing = await glob(["*Icon.d.ts", "*Icon.js"]);
await Promise.all(existing.map((fileName) => rm(fileName)));

if (process.argv.includes("--clean-only")) {
  process.exit(0);
}

const components = await glob("*.tsx", {
  cwd: SRC_DIR,
});

const promises = components.map(async (name) => {
  const { code } = await transformFile(join(SRC_DIR, name), {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
    env: {
      targets: ["defaults"],
    },
  });

  await writeFile(name.replace(".tsx", ".js"), code);
});

await Promise.all(promises);
