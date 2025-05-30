import { observerMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }
  equals(other) {
    return this.text == other.text;
  }
}

export class TodoList {
  // Singleton
  // Data
  #data = new Set();

  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance() to access the list");
    }
  }

  get items() {
    return this.#data;
  }

  static instance = null;
  static {
    this.instance = new TodoList();
  }
  static getInstance() {
    return this.instance;
  }
  add(item) {
    const array = Array.from(this.#data);
    const todoExists = array.filter((t) => t.equals(item)).length > 0;
    if (!todoExists) {
      this.#data.add(item);
      this.notify();
    }
  }
  delete(todo_text) {
    const array = Array.from(this.#data);
    const todoDelete = array.filter((t) => t.text == todo_text)[0];
    this.#data.delete(todoDelete);
    this.notify();
  }
  find(todo_text) {
    const array = Array.from(this.#data);
    return array.find((t) => t.text == todo_text);
  }
  replaceList(list) {
    this.#data = list;
    this.notify();
  }
}

Object.assign(TodoList.prototype, observerMixin);
