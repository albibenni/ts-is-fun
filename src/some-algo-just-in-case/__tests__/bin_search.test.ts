import { describe, it, expect } from "vitest";
import binary_search from "./bin_search.js";

describe("binary_search", () => {
  it("should find an element in a sorted array", () => {
    const arr = [1, 3, 5, 7, 9, 11];
    expect(binary_search(arr, 5)).toBe(true);
    expect(binary_search(arr, 11)).toBe(true);
    expect(binary_search(arr, 1)).toBe(true);
  });

  it("should return false when element is not in array", () => {
    const arr = [1, 3, 5, 7, 9, 11];
    expect(binary_search(arr, 2)).toBe(false);
    expect(binary_search(arr, 10)).toBe(false);
    expect(binary_search(arr, 0)).toBe(false);
    expect(binary_search(arr, 12)).toBe(false);
  });

  it("should work with empty arrays", () => {
    const arr: number[] = [];
    expect(binary_search(arr, 5)).toBe(false);
  });

  it("should work with single element arrays", () => {
    const arr = [7];
    expect(binary_search(arr, 7)).toBe(true);
    expect(binary_search(arr, 5)).toBe(false);
  });

  it("should handle duplicate elements", () => {
    const arr = [1, 3, 3, 5, 7, 7, 9];
    expect(binary_search(arr, 3)).toBe(true);
    expect(binary_search(arr, 7)).toBe(true);
  });

  it("should work with custom low and high bounds", () => {
    const arr = [1, 3, 5, 7, 9, 11];
    // Search only in first half
    expect(binary_search(arr, 3, 0, 3)).toBe(true);
    expect(binary_search(arr, 7, 0, 3)).toBe(false);

    // Search only in second half
    expect(binary_search(arr, 9, 3, arr.length)).toBe(true);
    expect(binary_search(arr, 3, 3, arr.length)).toBe(false);
  });
});
