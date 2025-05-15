export type Node<T> = {
  value: T;
  prev?: Node<T>;
  next?: Node<T>;
};

export interface LinkedList<T> {
  push(value: T): T;
  pop(): T | undefined;
  enqueue(value: T): T;
  delete(idx: number): T | undefined; // 1.3.20
  find(value: T): boolean; //1.3.21
  deque(): T | undefined;
}

export class DoublyLinkedList<T> implements LinkedList<T> {
  #length: number;
  #head: Node<T> | null;
  #tail: Node<T> | null;

  constructor() {
    this.#length = 0;
    this.#head = null;
    this.#tail = null;
  }

  enqueue(value: T): T {
    const node: Node<T> = {
      value,
    };
    if (this.#head === null) {
      this.#head = node;
      this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head.prev = node;
      this.#head = node;
    }
    this.#length++;
    return node.value;
  }

  deque(): T | undefined {
    if (this.#head === null) return undefined;
    if (this.#tail === null)
      throw new Error("Tail can't be null with tail not null");
    const node = this.#head;
    this.#length--;

    if (this.#length === 0) {
      this.#head = null;
      this.#tail = null;
      return node.value;
    }

    if (this.#head.next === undefined) throw new Error("WTF");
    this.#head = this.#head.next;
    this.#head.prev = undefined;
    return node.value;
  }

  push(value: T): T {
    const node: Node<T> = {
      value,
    };
    if (this.#head === null) {
      this.#head = node;
      this.#tail = node;
      this.#length++;
    } else {
      if (this.#tail === null) throw new Error("Tail null");

      this.#tail.next = node;
      node.prev = this.#tail;
      this.#tail = node;

      this.#length++;
    }
    return node.value;
  }

  pop(): T | undefined {
    if (this.#tail === null) return undefined;
    const node = this.#tail;
    this.#length--;

    if (this.#length === 0) {
      this.#head = null;
      this.#tail = null;
      return node.value;
    }

    if (this.#tail.prev === undefined) throw new Error("WTF");
    this.#tail = this.#tail.prev;
    this.#tail.next = undefined;

    return node.value;
  }

  delete(idx: number): T | undefined {
    if (idx < 0 || idx >= this.#length) return undefined;

    if (idx === 0) return this.deque();
  }

  find(value: T): boolean {
    throw new Error("Method not implemented.");
  }

  length() {
    return this.#length;
  }
}
