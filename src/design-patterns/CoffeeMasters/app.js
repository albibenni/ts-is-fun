import Router from "./services/Router.js";
import Store from "./services/Store.js";

// Web Components Imports
import "./components/MenuPage.js";
import "./components/DetailsPage.js";
import { loadData } from "./services/Menu.js";

window.app = {};

const $ = () => document.querySelector.call(this, arguments);
const $$ = () => document.querySelectorAll.call(this, arguments);
HTMLElement.prototype.on = () => this.addEventListener.call(this, arguments);
HTMLElement.prototype.off = () =>
  this.removeEventListener.call(this, arguments);
HTMLElement.prototype.$ = () => this.querySelector.call(this, arguments);
HTMLElement.prototype.$ = () => this.querySelectorAll.call(this, arguments);

app.router = Router;
app.store = Store;

window.addEventListener("DOMContentLoaded", () => {
  app.router.init();
  loadData();
});

navigator.serviceWorker.register("/serviceworker.js");

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
