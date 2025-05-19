export class UnionFind {
  private parent: number[];
  private rank: number[];
  private count: number; // Number of components/sets

  /**
   * Initialize Union-Find data structure with n elements
   * Initially, each element is in its own set
   */
  constructor(n: number) {
    this.parent = Array(n)
      .fill(0)
      .map((_, i) => i); // Each element is its own parent
    this.rank = Array(n).fill(0) as number[]; // Rank is used for union by rank optimization
    this.count = n; // Initially, n disjoint sets
  }

  /**
   * Find which set the element belongs to (with path compression)
   * @param x Element to find
   * @returns The root/representative of the set containing x
   */
  find(x: number): number {
    // Path compression: make every examined node point directly to the root
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x] as number);
    }
    return this.parent[x];
  }

  /**
   * Union two sets (with union by rank)
   * @param x First element
   * @param y Second element
   * @returns true if x and y were in different sets, false if they were already in the same set
   */
  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    // If x and y are already in the same set
    if (rootX === rootY) {
      return false;
    }

    // Union by rank: attach smaller rank tree under root of higher rank tree
    if (this.rank[rootX]! < this.rank[rootY]!) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX]! > this.rank[rootY]!) {
      this.parent[rootY] = rootX;
    } else {
      // If ranks are the same, make one the parent and increment its rank
      this.parent[rootY] = rootX;
      this.rank[rootX]!++;
    }

    // Decrease the number of components/sets
    this.count--;
    return true;
  }

  /**
   * Check if two elements are in the same set
   * @param x First element
   * @param y Second element
   * @returns true if x and y are in the same set
   */
  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }

  /**
   * Get the number of disjoint sets
   * @returns The count of disjoint sets
   */
  getCount(): number {
    return this.count;
  }
}

// Example usage:

// Initialize a Union-Find with 10 elements (0-9)
const uf = new UnionFind(10);

// Create some connections
console.log(uf.union(0, 1)); // true - 0 and 1 are now connected
console.log(uf.union(2, 3)); // true - 2 and 3 are now connected
console.log(uf.union(4, 5)); // true - 4 and 5 are now connected
console.log(uf.union(6, 7)); // true - 6 and 7 are now connected
console.log(uf.union(8, 9)); // true - 8 and 9 are now connected

console.log(uf.union(0, 2)); // true - connects the set {0,1} with {2,3}
console.log(uf.union(4, 6)); // true - connects the set {4,5} with {6,7}
console.log(uf.union(0, 4)); // true - connects the set {0,1,2,3} with {4,5,6,7}

// Let's check some connections
console.log(uf.connected(1, 7)); // true - they are now part of the same component
console.log(uf.connected(1, 9)); // false - 9 is still in its own component with 8

// How many disjoint sets do we have now?
console.log(`Number of disjoint sets: ${uf.getCount()}`); // Should be 2

// Let's connect the final sets
console.log(uf.union(0, 8)); // true - connects all elements into one set
console.log(`Number of disjoint sets: ${uf.getCount()}`); // Should be 1

// Now all elements should be connected
console.log(uf.connected(3, 9)); // true - all elements are now connected
