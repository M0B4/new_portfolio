// Renders every icon file from public/favicon.svg (the M logo on a black tile).
// The logo's lightning and notch turn to mush at 16 px, so that size comes from a hand-made
// plain M (src/assets/brand/favicon-16.png). Run after changing either: npm run favicons
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile("public/favicon.svg", "utf8");
// Home screens round the corners themselves, so those icons are full-bleed squares
const square = svg.replace(/ rx="[\d.]+"/, "");
const render = (source, size) =>
  sharp(Buffer.from(source), { density: Math.ceil((size / 64) * 72 * 4) }).resize(size, size).png().toBuffer();

for (const [file, source, size] of [
  ["apple-touch-icon.png", square, 180],
  ["icon-192.png", square, 192],
  ["icon-512.png", square, 512],
]) {
  await writeFile(`public/${file}`, await render(source, size));
}

// favicon.ico holds all tab sizes: the plain M at 16 px, the logo at 32 and 48 px
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) => (size === 16 ? sharp("src/assets/brand/favicon-16.png").png().toBuffer() : render(svg, size))),
);
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(size, entry);
  header.writeUInt8(size, entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(images[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[i].length;
});
await writeFile("public/favicon.ico", Buffer.concat([header, ...images]));
console.log("Icons written to public/");
