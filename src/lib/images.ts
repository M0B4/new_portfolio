import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import sharp from "sharp";
import type { PortfolioImage } from "./projects";

export type ResponsiveImage = {
  src: string;
  srcset: string;
  width: number;
  height: number;
  /** Cut-out artwork (e.g. shirt mockups): shown free-standing instead of as a print. */
  transparent: boolean;
};

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

const usableWidths = (widths: number[], max: number) => {
  const fitting = widths.filter((width) => width <= max);
  return fitting.length > 0 ? fitting : [max];
};

/** True for cut-out artwork with see-through pixels. */
export const isTransparent = (image: PortfolioImage) => hasTransparency(image);

/** Builds src/srcset/dimensions for an Astro image. */
export const getResponsiveImage = async (
  image: PortfolioImage,
  widths: number[],
  { quality = 80 }: { quality?: number } = {},
): Promise<ResponsiveImage> => {
  const sizes = usableWidths(widths, image.width);
  const largest = sizes[sizes.length - 1];
  const result = await getImage({ src: image, widths: sizes, width: largest, format: "webp", quality });
  return {
    src: result.src,
    srcset: result.srcSet.attribute,
    width: largest,
    height: Math.round((image.height / image.width) * largest),
    transparent: await hasTransparency(image),
  };
};

/** Single large rendition, e.g. for Open Graph. */
export const getImageUrl = async (image: PortfolioImage, width: number, format: "jpg" | "webp" = "webp") => {
  const result = await getImage({ src: image, width: Math.min(width, image.width), format });
  return result.src;
};

/** Absolute JPEG URL – social platforms handle JPEG most reliably. */
export const getAbsoluteImageUrl = async (image: PortfolioImage, origin: string | URL, width = 1200) =>
  new URL(await getImageUrl(image, width, "jpg"), origin).toString();
