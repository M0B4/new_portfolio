// Renders every icon file from public/favicon.svg (the M logo on a black tile).
// Run after changing the SVG: npm run favicons
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

// favicon.ico for old browsers and crawlers: 16, 32 and 48 px PNGs in one ICO container
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) => render(svg, size)));
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
