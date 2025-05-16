import { describe, test, expect, beforeEach } from "vitest";
import Stack from "./stack.js";

describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test("should initialize an empty stack", () => {
    expect(stack.length).toBe(0);
    expect(stack.peek()).toBeUndefined();
  });

  test("should push items to the stack", () => {
    stack.push(1);
    expect(stack.length).toBe(1);
    expect(stack.peek()).toBe(1);

    stack.push(2);
    expect(stack.length).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  test("should pop items from the stack in LIFO order", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.length).toBe(2);

    expect(stack.pop()).toBe(2);
    expect(stack.length).toBe(1);

    expect(stack.pop()).toBe(1);
    expect(stack.length).toBe(0);
  });

  test("should handle popping from an empty stack", () => {
    expect(stack.pop()).toBeUndefined();
    expect(stack.length).toBe(0);
  });

  test("should handle peeking at an empty stack", () => {
    expect(stack.peek()).toBeUndefined();
  });

  test("should maintain correct length when pushing and popping", () => {
    for (let i = 0; i < 10; i++) {
      stack.push(i);
    }
    expect(stack.length).toBe(10);

    for (let i = 0; i < 5; i++) {
      stack.pop();
    }
    expect(stack.length).toBe(5);

    for (let i = 0; i < 10; i++) {
      stack.push(i);
    }
    expect(stack.length).toBe(15);
  });
});
