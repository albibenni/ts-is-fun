// mixin implementing Observer Pattern
//

const observerMixin = {
    observers: new Set(),
    addObserver(obs) { this.observers.add(obs); },
    removeObserver(obs) { this.observers.delete(obs); },
    notify() { this.observers.forEach(ob => ob()); }
}
