import { TodoItem, TodoList } from "./classes.js";

class Command {
    name;
    args;
    constructor(name, args) {
        this.args = args;
        this.name = name;
    }
}

const Commands = {
    ADD: "add",
    DELETE: "delete",
}

const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();
        switch (command.name) {
            case Commands.ADD:
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                const itemInLIst = todoList.find(todoText);

                if (todoText != "" && !itemInLIst) {
                    todoInput.value = "";
                    todoInput.add(new TodoItem(todoText));
                }
                break;
            case Commands.DELETE:
                const [textTodDelete] = command.args;
                todoList.delete(textTodDelete);
                break;

        }
    }
}
