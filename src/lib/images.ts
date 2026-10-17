import { getImage } from "astro:assets";
import { isSanityImage, type PortfolioImage } from "./projects";
import { sanityImageUrl } from "./sanity/client";

export type ResponsiveImage = {
  src: string;
  srcset: string;
  width: number;
  height: number;
  placeholder?: string;
};

const usableWidths = (widths: number[], max: number) => {
  const fitting = widths.filter((width) => width <= max);
  return fitting.length > 0 ? fitting : [max];
};

/** Builds src/srcset/dimensions for local (Astro) and Sanity images alike. */
export const getResponsiveImage = async (image: PortfolioImage, widths: number[]): Promise<ResponsiveImage> => {
  if (isSanityImage(image)) {
    const sizes = usableWidths(widths, image.width);
    const largest = sizes[sizes.length - 1];
    return {
      src: sanityImageUrl(image.assetId, largest),
      srcset: sizes.map((width) => `${sanityImageUrl(image.assetId, width)} ${width}w`).join(", "),
      width: largest,
      height: Math.round((image.height / image.width) * largest),
      placeholder: image.lqip,
    };
  }

  const sizes = usableWidths(widths, image.width);
  const largest = sizes[sizes.length - 1];
  const result = await getImage({ src: image, widths: sizes, width: largest, format: "webp" });
  return {
    src: result.src,
    srcset: result.srcSet.attribute,
    width: largest,
    height: Math.round((image.height / image.width) * largest),
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
