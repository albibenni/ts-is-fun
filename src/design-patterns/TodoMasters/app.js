import { TodoList, TodoItem } from "./comp/classes.js";
import { CommandExecutor, Command, Commands } from "./comp/command.js";
import { LocalStorage } from "./comp/storage.js";

globalThis.DOM = {}
const DOM = globalThis.DOM;



function renderList() {

    const todos = TodoList.getInstance();

    DOM.todoList.innerHTML = "";
    for (let todo of todos.items) {
        const listItem = document.createElement("li");
        listItem.className = "todo-item";
        listItem.innerHTML = `${todo.text}
        <button class="delete-btn">Delete</button>`;
        listItem.dataset.text = todo.text;
        DOM.todoList.appendChild(listItem);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    DOM.todoList = document.getElementById('todo-list');
    DOM.addBtn = document.getElementById('add-btn');
    DOM.todoInput = document.getElementById('todo-input');

    DOM.addBtn.addEventListener("click", () => {
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
    });
    DOM.todoList.addEventListener("click", event => {
        if (event.target.classList.contains("delete-btn")) {
            const todo = event.target.parentNode.dataset.text;
            const cmd = new Command(Commands.DELETE, [todo]);
            CommandExecutor.execute(cmd)
        }
    });
    renderList();
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
    }
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        const cmd = new Command(Commands.UNDO);
        CommandExecutor.execute(cmd);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    TodoList.getInstance().addObserver(renderList);
});
document.addEventListener("DOMContentLoaded", () => {
    LocalStorage.load();
});
