globalThis.DOM = {}
const DOM = globalThis.DOM;




document.addEventListener("DOMContentLoaded", () => {
    DOM.list = document.getElementById();
    DOM.addButton = document.getElementById();
    DOM.todoInput = document.getElementById();

    DOM.addButton.addEventListener("click", event => {
        //todo
    });
    DOM.list.addEventListener("click", event => {
        if (event.target.classList.contains("delete-btn")) {
            //todo
        }
    });
});
