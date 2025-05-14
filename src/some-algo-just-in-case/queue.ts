export type Node<T> = {
  value: T;
  next?: Node<T>;
};

interface IQueue<T> {
  enqueue(value: T): void;
  dequeue(): Node<T> | undefined;
  peek(): T | undefined;
  length(): number;
}

export class Queue<T> implements IQueue<T> {
  #length: number;
  #head?: Node<T>;
  #tail?: Node<T>;
  constructor() {
    this.#length = 0;
    this.#head = undefined;
    this.#tail = undefined;
  }
  peek(): T | undefined {
    return this.#head?.value;
  }
  enqueue(value: T): void {
    const node: Node<T> = { value };
    this.#length++;
    if (!this.#tail) {
      if (this.#head !== undefined)
        throw new Error("Cannot have tail null and head not null");
      this.#tail = this.#head = node;
      return;
    }

    this.#tail.next = node;
    this.#tail = node;
  }
  dequeue(): Node<T> | undefined {
    if (!this.#head) return undefined;

    this.#length--;
    const head = this.#head;
    this.#head = this.#head.next; // case length === 1 after -- -> this is undefined too so ok!

    // If queue becomes empty
    if (!this.#head) {
      this.#tail = undefined;
    }

    head.next = undefined;
    return head;
  }
  length(): number {
    return this.#length;
  }
}
