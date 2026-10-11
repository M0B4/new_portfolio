/**
 * Builds a same-origin-relative asset URL from a possibly-root-relative path.
 * - empty/undefined → ""
 - absolute (http/https) → returned as-is
 - otherwise prefixed with BASE_URL (root-safe).
 */
export const assetUrl = (
	path: string | undefined,
	base: string = import.meta.env.BASE_URL,
): string =>
	!path ? "" : path.startsWith("http") ? path : `${base}${path.replace(/^\/+/, "")}`;
