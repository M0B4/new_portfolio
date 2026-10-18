import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import sharp from "sharp";
import { isSanityImage, type PortfolioImage } from "./projects";
import { sanityImageUrl } from "./sanity/client";

export type ResponsiveImage = {
  src: string;
  srcset: string;
  width: number;
  height: number;
  placeholder?: string;
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

/** True for cut-out artwork with see-through pixels, local or from Sanity. */
export const isTransparent = (image: PortfolioImage) =>
  isSanityImage(image) ? Promise.resolve(image.isOpaque === false) : hasTransparency(image);

/** Builds src/srcset/dimensions for local (Astro) and Sanity images alike. */
export const getResponsiveImage = async (
  image: PortfolioImage,
  widths: number[],
  { quality = 80 }: { quality?: number } = {},
): Promise<ResponsiveImage> => {
  if (isSanityImage(image)) {
    const sizes = usableWidths(widths, image.width);
    const largest = sizes[sizes.length - 1];
    const url = (width: number) => sanityImageUrl(image.assetId, width, undefined, quality);
    return {
      src: url(largest),
      srcset: sizes.map((width) => `${url(width)} ${width}w`).join(", "),
      width: largest,
      height: Math.round((image.height / image.width) * largest),
      // Sanity's blurred LQIP would show behind see-through pixels.
      placeholder: image.isOpaque === false ? undefined : image.lqip,
      transparent: image.isOpaque === false,
    };
  }

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

/** Single large rendition, e.g. for the lightbox or Open Graph. */
export const getImageUrl = async (image: PortfolioImage, width: number, format: "jpg" | "webp" = "webp") => {
  if (isSanityImage(image)) {
    return sanityImageUrl(image.assetId, Math.min(width, image.width), format === "jpg" ? "jpg" : undefined);
  }
  const result = await getImage({ src: image, width: Math.min(width, image.width), format });
  return result.src;
};

/** Absolute JPEG URL – social platforms handle JPEG most reliably. */
export const getAbsoluteImageUrl = async (image: PortfolioImage, origin: string | URL, width = 1200) =>
  new URL(await getImageUrl(image, width, "jpg"), origin).toString();
