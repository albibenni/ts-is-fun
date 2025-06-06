import { TodoItem, TodoList } from "./classes.js";
import { TodoHistory } from "./memento.js";

export class Command {
  name;
  args;
  constructor(name, args) {
    this.args = args;
    this.name = name;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
  UNDO: "undo",
};

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value.trim();
        const itemInLIst = todoList.find(todoText);

        if (todoText !== "" && !itemInLIst) {
          todoInput.value = "";
          todoList.add(new TodoItem(todoText));
        }
        break;
      case Commands.DELETE:
        const [textTodDelete] = command.args;
        todoList.delete(textTodDelete);
        break;
      case Commands.UNDO:
        const previousList = TodoHistory.pop();
        if (previousList) {
          todoList.replaceList(previousList);
        }
        break;
    }
  },
};
