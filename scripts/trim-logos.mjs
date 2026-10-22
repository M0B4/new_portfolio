// Crops the transparent margin around client logos (src/assets/logos/<slug>/logo.*), so every
// logo sticker can hug its logo. Run after adding a logo in Keystatic: npm run logos
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = "src/assets/logos";

for (const slug of await readdir(root)) {
  for (const file of await readdir(join(root, slug))) {
    const path = join(root, slug, file);
    const input = await readFile(path);
    const { width, height } = await sharp(input).metadata();
    const { data, info } = await sharp(input).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
    if (info.width === width && info.height === height) continue;
    await writeFile(path, await sharp(data).toFormat(file.split(".").pop() === "png" ? "png" : "webp", { lossless: true }).toBuffer());
    console.log(`${path}: ${width}×${height} → ${info.width}×${info.height}`);
  }
}
