export type Node<T> = {
  value: T;
  prev?: Node<T>;
  next?: Node<T>;
};

export interface LinkedList<T> {
  push(value: T): Node<T>;
  pop(): Node<T>;
  delete(idx: number): Node<T> | undefined; // 1.3.20
  find(value: T): boolean; //1.3.21
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

  push(value: T): Node<T> {
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
    return node;
  }

  pop(): Node<T> {
    throw new Error("Method not implemented.");
  }
  delete(idx: number): Node<T> | undefined {
    throw new Error("Method not implemented.");
  }
  find(value: T): boolean {
    throw new Error("Method not implemented.");
  }

  length() {
    return this.#length;
  }
}
