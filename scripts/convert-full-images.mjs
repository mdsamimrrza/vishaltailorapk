// one-off: copy+webp-convert full-size catalogue images from the web repo into the APK assets
import { readFileSync, mkdirSync, existsSync } from "fs";
import { execSync } from "child_process";
import { join, dirname } from "path";

const W = "C:/Users/samim_40uxmfb/Desktop/deplyed project/Tailor-Masterpiece";
const items = JSON.parse(readFileSync("src/data/catalogue.json", "utf8"));
const paths = [...new Set(items.map((i) => i.image))];

for (const p of paths) {
  const rel = p.replace(/^\/images\//, ""); // e.g. suit/c1.jpeg or catalogue/cp-01.jpg
  const base = join(W, "apps/nvt-stage/images", rel);
  const src = [base, base.replace(/\.jpe?g$/i, ".png"), base.replace(/\.jpe?g$/i, ".jpeg")].find((c) => existsSync(c));
  if (!src) { console.log("MISSING", p); continue; }
  const out = join("assets/images/nvt/full", rel.replace(/\.jpe?g$/i, ".webp").replace(/\.png$/i, ".webp"));
  mkdirSync(dirname(out), { recursive: true });
  execSync(`ffmpeg -y -loglevel error -i "${src}" -c:v libwebp -quality 80 "${out}"`);
}
console.log("done:", paths.length, "paths");
