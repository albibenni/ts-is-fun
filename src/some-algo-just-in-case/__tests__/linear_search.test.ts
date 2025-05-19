import { describe, it, expect } from "vitest";
import linear_search from "../search_algo/linear_search.ts";

describe("linear_search", () => {
  it("should return true when needle is found in haystack", () => {
    const haystack = [1, 2, 3, 4, 5];
    expect(linear_search(haystack, 3)).toBe(true);
  });

  it("should return false when needle is not found in haystack", () => {
    const haystack = [1, 2, 3, 4, 5];
    expect(linear_search(haystack, 6)).toBe(false);
  });

  it("should work with empty array", () => {
    const haystack: number[] = [];
    expect(linear_search(haystack, 1)).toBe(false);
  });

  it("should work with array containing duplicate values", () => {
    const haystack = [1, 2, 2, 3, 4];
    expect(linear_search(haystack, 2)).toBe(true);
  });

  it("should work with array containing negative numbers", () => {
    const haystack = [-3, -2, -1, 0, 1];
    expect(linear_search(haystack, -2)).toBe(true);
    expect(linear_search(haystack, 2)).toBe(false);
  });
});
