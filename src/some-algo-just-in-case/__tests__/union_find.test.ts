import { describe, it, expect } from "vitest";
import { UnionFind } from "../search_algo/union_find.ts";

describe("UnionFind", () => {
  it("should initialize with n disjoint sets", () => {
    const uf = new UnionFind(5);
    expect(uf.getCount()).toBe(5);

    // Each element should be in its own set initially
    for (let i = 0; i < 4; i++) {
      expect(uf.connected(i, i + 1)).toBe(false);
    }
  });

  it("should connect elements with union operation", () => {
    const uf = new UnionFind(5);

    // Connect 0 and 1
    expect(uf.union(0, 1)).toBe(true);
    expect(uf.connected(0, 1)).toBe(true);
    expect(uf.getCount()).toBe(4);

    // Connect 2 and 3
    expect(uf.union(2, 3)).toBe(true);
    expect(uf.connected(2, 3)).toBe(true);
    expect(uf.getCount()).toBe(3);

    // 0-1 and 2-3 should still be separate
    expect(uf.connected(1, 2)).toBe(false);
  });

  it("should return false when unioning already connected elements", () => {
    const uf = new UnionFind(5);

    // Connect 0 and 1
    expect(uf.union(0, 1)).toBe(true);

    // Try to connect them again
    expect(uf.union(0, 1)).toBe(false);
    expect(uf.union(1, 0)).toBe(false);
    expect(uf.getCount()).toBe(4); // Count should remain unchanged
  });

  it("should handle transitive connections", () => {
    const uf = new UnionFind(5);

    // Create connections: 0-1, 1-2, 2-3, 3-4
    uf.union(0, 1);
    uf.union(1, 2);
    uf.union(2, 3);
    uf.union(3, 4);

    // All elements should be connected
    expect(uf.connected(0, 4)).toBe(true);
    expect(uf.connected(1, 3)).toBe(true);
    expect(uf.getCount()).toBe(1);
  });

  it("should handle path compression", () => {
    const uf = new UnionFind(5);

    // Create a line: 0-1-2-3-4
    uf.union(0, 1);
    uf.union(1, 2);
    uf.union(2, 3);
    uf.union(3, 4);

    // This should compress the path
    uf.find(0);
    uf.find(4);

    // All elements should be connected
    expect(uf.connected(0, 4)).toBe(true);
  });

  it("should handle union by rank", () => {
    const uf = new UnionFind(7);

    // Create two separate trees
    // Tree 1: 0-1-2
    uf.union(0, 1);
    uf.union(1, 2);

    // Tree 2: 3-4-5-6
    uf.union(3, 4);
    uf.union(4, 5);
    uf.union(5, 6);

    // Union the two trees
    uf.union(0, 3);

    // All elements should be connected
    for (let i = 0; i < 6; i++) {
      expect(uf.connected(i, i + 1)).toBe(true);
    }
    expect(uf.getCount()).toBe(1);
  });

  it("should handle large number of operations efficiently", () => {
    const n = 1000;
    const uf = new UnionFind(n);

    // Connect all even numbers together
    for (let i = 0; i < n - 2; i += 2) {
      uf.union(i, i + 2);
    }

    // Connect all odd numbers together
    for (let i = 1; i < n - 2; i += 2) {
      uf.union(i, i + 2);
    }

    // All even numbers should be connected
    for (let i = 0; i < n - 2; i += 2) {
      expect(uf.connected(0, i)).toBe(true);
    }

    // All odd numbers should be connected
    for (let i = 1; i < n - 2; i += 2) {
      expect(uf.connected(1, i)).toBe(true);
    }

    // But even and odd shouldn't be connected
    expect(uf.connected(0, 1)).toBe(false);
    expect(uf.getCount()).toBe(2);

    // Finally connect even and odd sets
    uf.union(0, 1);
    expect(uf.getCount()).toBe(1);

    // Now everything should be connected
    expect(uf.connected(0, n - 1)).toBe(true);
  });
});
