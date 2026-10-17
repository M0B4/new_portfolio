/** Base path that always ends with a slash ("/" or "/repo/"). */
export const basePath = import.meta.env.BASE_URL.replace(/\/?$/, "/");

/**
 * Builds a base-aware asset URL from a possibly root-relative path.
 * - empty/undefined → ""
 * - absolute (http/https) → returned as-is
 * - otherwise prefixed with the base path.
 */
export const assetUrl = (path: string | undefined, base: string = basePath): string =>
  !path ? "" : path.startsWith("http") ? path : `${base.replace(/\/?$/, "/")}${path.replace(/^\/+/, "")}`;
