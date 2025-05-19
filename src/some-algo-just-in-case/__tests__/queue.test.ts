import { describe, it, expect, beforeEach } from "vitest";
import { Queue } from "../data_structures/queue.ts";

describe("Queue", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it("should initialize an empty queue", () => {
    expect(queue.length()).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  it("should enqueue elements to the queue", () => {
    queue.enqueue(1);
    expect(queue.length()).toBe(1);
    expect(queue.peek()).toBe(1);

    queue.enqueue(2);
    expect(queue.length()).toBe(2);
    expect(queue.peek()).toBe(1); // First element should still be at the front
  });

  it("should dequeue elements in FIFO order", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.length()).toBe(3);

    const first = queue.dequeue();
    expect(first?.value).toBe(1);
    expect(queue.length()).toBe(2);
    expect(queue.peek()).toBe(2);

    const second = queue.dequeue();
    expect(second?.value).toBe(2);
    expect(queue.length()).toBe(1);
    expect(queue.peek()).toBe(3);

    const third = queue.dequeue();
    expect(third?.value).toBe(3);
    expect(queue.length()).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  it("should return undefined when dequeueing from an empty queue", () => {
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.length()).toBe(0);
  });

  it("should handle interspersed enqueue and dequeue operations", () => {
    queue.enqueue(1);
    queue.enqueue(2);

    const first = queue.dequeue();
    expect(first?.value).toBe(1);

    queue.enqueue(3);
    queue.enqueue(4);

    const second = queue.dequeue();
    expect(second?.value).toBe(2);

    const third = queue.dequeue();
    expect(third?.value).toBe(3);

    queue.enqueue(5);

    const fourth = queue.dequeue();
    expect(fourth?.value).toBe(4);

    const fifth = queue.dequeue();
    expect(fifth?.value).toBe(5);

    expect(queue.length()).toBe(0);
    expect(queue.dequeue()).toBeUndefined();
  });

  it("should maintain FIFO order with many elements", () => {
    const elements = Array.from({ length: 100 }, (_, i) => i);

    // Enqueue all elements
    elements.forEach((e) => queue.enqueue(e));
    expect(queue.length()).toBe(elements.length);

    // Dequeue and verify order
    elements.forEach((e) => {
      const node = queue.dequeue();
      expect(node?.value).toBe(e);
    });

    expect(queue.length()).toBe(0);
  });

  it("should detach nodes after dequeue", () => {
    queue.enqueue(1);
    queue.enqueue(2);

    const node = queue.dequeue();
    expect(node?.value).toBe(1);
    expect(node?.next).toBeUndefined();
  });
});
