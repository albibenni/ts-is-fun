import { describe, test, expect } from "vitest";
import { DoublyLinkedList } from "../data_structures/doubly_linked_lists.ts";

describe("DoublyLinkedList", () => {
  test("should initialize with length 0", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.length()).toBe(0);
  });

  describe("push and pop operations", () => {
    test("should push values to the end of the list", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.length()).toBe(3);
    });

    test("should pop values from the end of the list", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.pop()).toBe(3);
      expect(list.pop()).toBe(2);
      expect(list.pop()).toBe(1);
      expect(list.pop()).toBeUndefined();
      expect(list.length()).toBe(0);
    });
  });

  describe("enqueue and deque operations", () => {
    test("should enqueue values to the beginning of the list", () => {
      const list = new DoublyLinkedList<number>();
      list.enqueue(1);
      list.enqueue(2);
      list.enqueue(3);
      expect(list.length()).toBe(3);
    });

    test("should deque values from the beginning of the list", () => {
      const list = new DoublyLinkedList<number>();
      list.enqueue(1);
      list.enqueue(2);
      list.enqueue(3);

      expect(list.deque()).toBe(3);
      expect(list.deque()).toBe(2);
      expect(list.deque()).toBe(1);
      expect(list.deque()).toBeUndefined();
      expect(list.length()).toBe(0);
    });
  });

  describe("delete operation", () => {
    test("should delete a value at a specific index", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      expect(list.delete(1)).toBe(2);
      expect(list.length()).toBe(3);

      // After deleting index 1, the list should be [1, 3, 4]
      expect(list.delete(1)).toBe(3);
      expect(list.length()).toBe(2);
    });

    test("should return undefined for invalid indices", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      list.push(2);

      expect(list.delete(-1)).toBeUndefined();
      expect(list.delete(2)).toBeUndefined();
      expect(list.length()).toBe(2);
    });

    test("should handle deleting at the beginning and end", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      // Delete from beginning (should use deque)
      expect(list.delete(0)).toBe(1);

      // Delete from end (should use pop)
      expect(list.delete(1)).toBe(3);

      expect(list.length()).toBe(1);
      expect(list.pop()).toBe(2);
    });
  });

  describe("find operation", () => {
    test("should find values that exist in the list", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.find(1)).toBe(true);
      expect(list.find(2)).toBe(true);
      expect(list.find(3)).toBe(true);
    });

    test("should not find values that do not exist in the list", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.find(4)).toBe(false);
      expect(list.find(0)).toBe(false);
    });
  });

  describe("mixed operations", () => {
    test("should handle a mix of operations correctly", () => {
      const list = new DoublyLinkedList<number>();

      list.push(1);
      list.push(2);
      list.enqueue(0);

      // List should be [0, 1, 2]
      expect(list.length()).toBe(3);

      list.delete(1); // Delete the 1
      // List should be [0, 2]

      expect(list.find(1)).toBe(false);
      expect(list.find(0)).toBe(true);
      expect(list.find(2)).toBe(true);

      expect(list.pop()).toBe(2);
      expect(list.deque()).toBe(0);
      expect(list.length()).toBe(0);
    });
  });
});
