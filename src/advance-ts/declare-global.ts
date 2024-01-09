export {};
const bar = window.foo(); // Not present in the Window interface

declare global {
  type Whatever = string;
  interface Window {
    foo(): string; // Declaration Merging
  }
}

type CanBeAccessEveryWhere = Whatever;
