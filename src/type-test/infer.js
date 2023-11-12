"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str = exports.func = void 0;
const func = (check) => {
    return "123123123";
};
exports.func = func;
// type ReturnType<T extends (...args: any) => any> = T extends (
//   ...args: any
// ) => infer R
//   ? R
//   : any;
//String Example
const str = () => `hello_world-friend`.replace(/(_|-)/g, (item) => `${item}${item}${item}`);
exports.str = str;
const notMatching = {};
const myString = () => {
    return "hello_world-friend";
};
