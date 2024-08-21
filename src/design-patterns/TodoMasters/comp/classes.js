import { observerMixin } from "./mixin.js";
class TodoItem {
    constructor(text) {
        this.text = text;
    }
    equals(other) {
        return this.text == other.text;
    }
}

class TodoList { // Singleton
    // Data
    #data = new Set();

    constructor() {
        if (TodoList.instance) {
            throw new Error("Use TodoList.getInstance() to access the list");
        }
    }

    get items() { return this.#data }

    static instance = null;
    static {
        this.instance = new TodoList();
    }
    static getInstance() {
        return this.instance;
    }
}

Object.assign(TodoList.prototype, observerMixin);
