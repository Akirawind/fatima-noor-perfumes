import { copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const index = join(dist, "index.html");

if (existsSync(index)) {
  copyFileSync(index, join(dist, "404.html"));
  console.log("✔ 404.html copied for GitHub Pages SPA routing");
}
