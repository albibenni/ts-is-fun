// Define a basic graph interface
interface Graph {
  [vertex: string]: string[];
}

/**
 * Perform depth-first search on a graph
 * @param graph - The graph represented as an adjacency list
 * @param startVertex - The vertex to start the search from
 * @returns Array of vertices in the order they were visited
 */
function depthFirstSearch(graph: Graph, startVertex: string): string[] {
  const visited: Set<string> = new Set();
  const result: string[] = [];

  // Inner recursive function
  function dfs(vertex: string): void {
    // Mark vertex as visited
    visited.add(vertex);
    // Add to result
    result.push(vertex);

    // Visit all adjacent vertices
    for (const neighbor of graph[vertex]!) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }

  // Start DFS from the given vertex
  dfs(startVertex);
  return result;
}

/**
 * Iterative implementation of depth-first search using a stack
 */
function depthFirstSearchIterative(
  graph: Graph,
  startVertex: string,
): string[] {
  const visited: Set<string> = new Set();
  const result: string[] = [];
  const stack: string[] = [startVertex];

  while (stack.length > 0) {
    // Pop the last vertex from the stack
    const currentVertex = stack.pop()!;

    // Skip if already visited
    if (visited.has(currentVertex)) {
      continue;
    }

    // Mark as visited and add to result
    visited.add(currentVertex);
    result.push(currentVertex);

    // Add all unvisited neighbors to the stack
    // We process them in reverse order to maintain the same visit order as the recursive version
    for (let i = graph[currentVertex]!.length - 1; i >= 0; i--) {
      const neighbor = graph[currentVertex]![i]!;
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}

// Example usage
const graph: Graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

// Test the recursive DFS
const recursiveResult = depthFirstSearch(graph, "A");
console.log("Recursive DFS result:", recursiveResult);

// Test the iterative DFS
const iterativeResult = depthFirstSearchIterative(graph, "A");
console.log("Iterative DFS result:", iterativeResult);
