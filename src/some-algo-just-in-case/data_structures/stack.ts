type Node<T> = {
  value: T;
  prev?: Node<T>;
};

interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
}
export default class Stack<T> implements IStack<T> {
  public length: number;
  private head?: Node<T>;
  constructor() {
    this.head = undefined;
    this.length = 0;
  }
  push(item: T): void {
    const node: Node<T> = { value: item };
    this.length++;
    if (this.head === undefined) {
      this.head = node;
      return;
    }
    node.prev = this.head;
    this.head = node;
  }
  pop(): T | undefined {
    this.length = Math.max(0, this.length - 1);
    const head_ref = this.head?.value;
    if (this.length === 0) {
      this.head = undefined;
      return head_ref;
    }
    this.head = this.head!.prev;
    return head_ref;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
