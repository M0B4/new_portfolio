import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import sharp from "sharp";

const transparencyCache = new Map<string, Promise<boolean>>();

/** True when a local image has see-through pixels; Astro keeps the source path on `fsPath`. */
const hasTransparency = (image: ImageMetadata) => {
  const file = (image as ImageMetadata & { fsPath?: string }).fsPath;
  if (!file) return Promise.resolve(false);
  if (!transparencyCache.has(file)) {
    transparencyCache.set(
      file,
      sharp(file)
        .stats()
        .then((stats) => !stats.isOpaque)
        .catch(() => false),
    );
  }
  return transparencyCache.get(file)!;
};

/** Builds src/srcset/dimensions for an Astro image. */
export const getResponsiveImage = async (image: ImageMetadata, widths: number[], { quality = 80 } = {}) => {
  const fitting = widths.filter((width) => width <= image.width);
  const sizes = fitting.length > 0 ? fitting : [image.width];
  const largest = sizes[sizes.length - 1];
  const result = await getImage({ src: image, widths: sizes, width: largest, format: "webp", quality });
  return {
    src: result.src,
    srcset: result.srcSet.attribute,
    width: largest,
    height: Math.round((image.height / image.width) * largest),
    /** Cut-out artwork (e.g. shirt mockups): shown free-standing instead of as a print. */
    transparent: await hasTransparency(image),
  };
};

/** Absolute JPEG URL of a single large rendition – social platforms handle JPEG most reliably. */
export const getAbsoluteImageUrl = async (image: ImageMetadata, origin: string | URL, width = 1200) => {
  const result = await getImage({ src: image, width: Math.min(width, image.width), format: "jpg" });
  return new URL(result.src, origin).toString();
};
