/** Pinned up like flyers on a wall: each print hangs a little crooked at its own, random-looking angle.
 *  Derived from the title, so a project keeps its angle on every page and in every build. */
export const tiltFor = (title: string): number => {
  let hash = 2166136261;
  for (const char of title) hash = Math.imul(hash ^ char.codePointAt(0)!, 16777619) >>> 0;
  const lean = 0.5 + (((hash >>> 8) % 1000) / 1000) * 1.8; // 0.5 to 2.3 degrees
  return hash & 1 ? lean : -lean;
};

/** Never let a whole row of three lean the same way: if it would, the middle print tips the other way.
 *  Also run in the browser after filtering, since the rows change then. */
export const balanceRows = (tilts: number[]): number[] =>
  tilts.map((tilt, index) => {
    const start = index - (index % 3);
    const row = tilts.slice(start, start + 3);
    const sameWay = row.length === 3 && row.every((other) => Math.sign(other) === Math.sign(row[0]));
    return sameWay && index === start + 1 ? -tilt : tilt;
  });
