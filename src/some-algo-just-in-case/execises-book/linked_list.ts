interface LinkedList<T> {
  get length(): number;
  insertAt(item: T, index: number): void;
  remove(item: T): T | undefined;
  removeAt(index: number): T | undefined;
  append(item: T): void;
  prepend(item: T): void;
  get(index: number): T | undefined;
}

export class Node<T> {
  val: T;
  next?: Node<T>;
  prev?: Node<T>;
  constructor(val: T, next?: Node<T>, prev?: Node<T>) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

export class SinglyLinkedList<T> implements LinkedList<T> {
  public length: number;
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor() {
    this.length = 0;
  }

  prepend(item: T): void {
    const node = new Node(item);
    if (this.head !== null) {
      node.next = this.head;
    } else {
      this.tail = node;
    }
    this.head = node;

    this.length++;
  }
  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) {
      throw new Error("Index out of bounds");
    }

    // If inserting at the beginning, use prepend
    if (idx === 0) {
      this.prepend(item);
      return;
    }

    // If inserting at the end, use append
    if (idx === this.length) {
      this.append(item);
      return;
    }

    // Create new node
    const node = new Node(item);

    // Find the node at position idx-1
    let current = this.head;
    if (current === null) {
      throw new Error("Head not found");
    }
    for (let i = 0; i < idx - 1; i++) {
      current = current.next!;
    }

    // Insert the new node
    node.next = current.next!;
    current.next = node;

    this.length++;
  }
  append(item: T): void {
    if (this.head === null) this.prepend(item);
    else {
      if (this.tail === null)
        throw new Error("Tail not found with head present");
      const node = new Node(item);
      this.tail.next = node;
      this.tail = node;
      this.length++;
    }
  }
  remove(item: T): T | undefined {
    if (this.head === null) return;
    let prev: Node<T> = this.head;
    let current: Node<T> | undefined = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current === undefined) throw new Error("Error with links");
      if (current.val === item) {
        if (i === 0) {
          this.head = current.next ?? null;
        } else if (current.next) {
          prev.next = current.next;
          current.next = undefined;
        } else {
          prev.next = undefined;
        }
        this.length--;
        return current.val;
      }
      prev = current;
      current = current.next;
    }
    return;
  }
  get(idx: number): T | undefined {
    if (this.head === null) {
      throw new Error("Head not found");
    }
    let current: Node<T> | undefined = this.head;
    for (let i = 0; i < idx; i++) {
      if (current === undefined) return;
      current = current.next;
    }
    return current?.val;
  }
  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Index out of bounds");
    }
    if (this.head === null) {
      throw new Error("Head not found");
    }
    let prev: Node<T> = this.head;
    let current: Node<T> | undefined = this.head;
    if (idx === 0) {
      this.head = current.next ?? null;
      this.length--;
      return current.val;
    }
    if (idx === this.length) {
      this.pop();
    }

    for (let i = 0; i < idx; i++) {
      if (current === undefined) throw Error("Error with the links");
      prev = current;
      current = current.next;
    }
    if (current) {
      prev.next = current.next;
      current.next = undefined;
    } else {
      prev.next = undefined;
    }
    this.length--;
    return current?.val;
  }
  pop(): T | undefined {
    if (!this.head) throw new Error("Head not found");
    if (!this.tail) throw new Error("Tail not found");

    const popped = this.tail;

    // If this is the last item, reset head and tail
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return popped.val;
    }

    // Otherwise, find the second-to-last node
    let current: Node<T> | undefined = this.head;
    for (let i = 0; i < this.length - 2; i++) {
      if (!current) return undefined;
      current = current.next;
    }

    if (!current) return undefined;
    current.next = undefined;
    this.tail = current;
    this.length--;
    return popped.val;
  }
}
