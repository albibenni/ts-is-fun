export {};
const bar = window.bar; // Not present in the Window interface
type Bar = {};

declare const window: {
  bar: string;
};
