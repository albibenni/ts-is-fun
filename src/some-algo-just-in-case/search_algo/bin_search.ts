export default function binary_search(
  haystack: number[],
  needle: number,
  lo = 0,
  hi = haystack.length,
): boolean {
  if (lo >= hi) return false;
  const mid = Math.floor(lo + (hi - lo) / 2);
  const mid_v = haystack[mid]!;
  if (mid_v === needle) return true;
  if (mid_v > needle) return binary_search(haystack, needle, lo, mid);
  else return binary_search(haystack, needle, mid + 1, hi);
}
