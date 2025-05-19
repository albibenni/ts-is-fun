import { describe, it, expect, beforeEach } from "vitest";
import { SinglyLinkedList } from "../data_structures/linked_list.ts";

describe("SinglyLinkedList", () => {
  let list: SinglyLinkedList<number>;

  beforeEach(() => {
    list = new SinglyLinkedList<number>();
  });

  describe("constructor", () => {
    it("should initialize an empty list with length 0", () => {
      expect(list.length).toBe(0);
    });
  });

  describe("prepend", () => {
    it("should add an item to the beginning of the list", () => {
      list.prepend(1);
      expect(list.length).toBe(1);
      expect(list.get(0)).toBe(1);

      list.prepend(2);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(2);
      expect(list.get(1)).toBe(1);
    });
  });

  describe("append", () => {
    it("should add an item to the end of the list", () => {
      list.append(1);
      expect(list.length).toBe(1);
      expect(list.get(0)).toBe(1);

      list.append(2);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
    });

    it("should call prepend if list is empty", () => {
      list.append(1);
      expect(list.length).toBe(1);
      expect(list.get(0)).toBe(1);
    });
  });

  describe("insertAt", () => {
    it("should insert an item at the specified index", () => {
      list.append(1);
      list.append(3);
      list.insertAt(2, 1);

      expect(list.length).toBe(3);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
    });

    it("should call prepend when inserting at index 0", () => {
      list.append(2);
      list.insertAt(1, 0);

      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
    });

    it("should call append when inserting at the end", () => {
      list.append(1);
      list.insertAt(2, 1);

      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
    });

    it("should throw an error when index is out of bounds", () => {
      expect(() => list.insertAt(1, -1)).toThrow("Index out of bounds");
      expect(() => list.insertAt(1, 1)).toThrow("Index out of bounds");
    });
  });

  describe("get", () => {
    it("should return the value at the specified index", () => {
      list.append(1);
      list.append(2);
      list.append(3);

      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
    });

    it("should return undefined when index is out of bounds", () => {
      list.append(1);

      expect(list.get(1)).toBeUndefined();
    });

    it("should throw an error when list is empty", () => {
      expect(() => list.get(0)).toThrow("Head not found");
    });
  });

  describe("remove", () => {
    it("should remove the first occurrence of the specified item", () => {
      list.append(1);
      list.append(2);
      list.append(3);

      const removed = list.remove(2);

      expect(removed).toBe(2);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(3);
    });

    it("should remove the head when it matches the item", () => {
      list.append(1);
      list.append(2);

      const removed = list.remove(1);

      expect(removed).toBe(1);
      expect(list.length).toBe(1);
      expect(list.get(0)).toBe(2);
    });

    it("should return undefined when item is not found", () => {
      list.append(1);
      list.append(2);

      const removed = list.remove(3);

      expect(removed).toBeUndefined();
      expect(list.length).toBe(2);
    });

    it("should return undefined when list is empty", () => {
      const removed = list.remove(1);

      expect(removed).toBeUndefined();
      expect(list.length).toBe(0);
    });
  });

  describe("removeAt", () => {
    it("should remove the item at the specified index", () => {
      list.append(1);
      list.append(2);
      list.append(3);

      const removed = list.removeAt(1);

      expect(removed).toBe(2);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(3);
    });

    it("should remove the head when index is 0", () => {
      list.append(1);
      list.append(2);

      const removed = list.removeAt(0);

      expect(removed).toBe(1);
      expect(list.length).toBe(1);
      expect(list.get(0)).toBe(2);
    });

    it("should throw an error when index is out of bounds", () => {
      list.append(1);

      expect(() => list.removeAt(-1)).toThrow("Index out of bounds");
      expect(() => list.removeAt(1)).toThrow("Index out of bounds");
    });

    it("should throw an error when list is empty", () => {
      expect(() => list.removeAt(0)).toThrow("Index out of bounds");
    });
  });

  describe("pop", () => {
    it("should remove and return the last item", () => {
      list.append(1);
      list.append(2);
      list.append(3);

      const popped = list.pop();

      expect(popped).toBe(3);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
    });

    it("should handle popping the last item", () => {
      list.append(1);

      const popped = list.pop();

      expect(popped).toBe(1);
      expect(list.length).toBe(0);
    });

    it("should throw an error when list is empty", () => {
      expect(() => list.pop()).toThrow("Head not found");
    });
  });

  describe("complex operations", () => {
    it("should handle a series of operations", () => {
      // Build a list: [10, 20, 30, 40]
      list.append(10);
      list.append(30);
      list.append(40);
      list.insertAt(20, 1);

      expect(list.length).toBe(4);
      expect(list.get(0)).toBe(10);
      expect(list.get(1)).toBe(20);
      expect(list.get(2)).toBe(30);
      expect(list.get(3)).toBe(40);

      // Remove items
      const removed1 = list.remove(20);
      expect(removed1).toBe(20);
      expect(list.length).toBe(3);
      expect(list.get(0)).toBe(10);
      expect(list.get(1)).toBe(30);
      expect(list.get(2)).toBe(40);

      const removed2 = list.removeAt(0);
      expect(removed2).toBe(10);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(30);
      expect(list.get(1)).toBe(40);

      // Add more items
      list.prepend(5);
      expect(list.length).toBe(3);
      expect(list.get(0)).toBe(5);
      expect(list.get(1)).toBe(30);
      expect(list.get(2)).toBe(40);

      // Pop the last item
      const popped = list.pop();
      expect(popped).toBe(40);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(5);
      expect(list.get(1)).toBe(30);
    });
  });
});
