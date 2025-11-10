/**
 * Demonstrates different ways to set the 'this' context in TypeScript/JavaScript.
 */

/**
 * Using call to set 'this' context temporarily
 * if we want to set the this context only for a single function call, we can use call.
 */
function permThisBind() {
  const ctx = {
    name: "al",
    test: function test(text: string) {
      console.log(`Test-bind: ${text}, name: ${this.name}`);
    },
  };

  // set this context permanently
  const t = ctx.test.bind(ctx);
  t("my bind");
}
permThisBind();
console.log("-----");
function tempThisCall() {
  const ctx = {
    name: "al",
    test: function test(text: string) {
      console.log(`Test-call: ${text}, name: ${this.name}`);
    },
  };

  // set this context temporarily
  ctx.test.call(ctx, "my call");
}

tempThisCall();
console.log("-----");

/**
 * Using apply to set 'this' context temporarily with arguments as an array
 * if we want to set the this context only for a single function call, we can use apply.
 */
function tempThisApply() {
  const ctx = {
    name: "al",
    test: function test(text: string, age: number) {
      console.log(`Test-apply: ${text}, name: ${this.name}, age: ${age}`);
    },
  };

  // set this context temporarily with arguments as an array
  ctx.test.apply(ctx, ["my apply", 30]);
}

tempThisApply();

// const person = {
//   name: "Max",
//   greet: () => {
//     console.log(this); // NOT the person object!
//     console.log(this.name);
//   },
// };
//
// const admin = { age: 30 };
// admin.greet = person.greet;
// admin.greet();
//
// What Happens
//
// Arrow functions DON'T have their own this - they inherit this from the surrounding lexical scope (where they were defined).
//
// In this case:
// - Line 59: this will be the global object (or undefined in strict mode), NOT the person object
// - Line 60: this.name will be undefined because the global object doesn't have a name property
//
// Even when you copy the arrow function to admin (line 66) and call it (line 67), this STILL refers to the global scope, not admin.
//
// Comparison
//
// // Regular function - 'this' depends on HOW it's called
// const person1 = {
//   name: "Max",
//   greet: function() {
//     console.log(this.name); // "Max" when called as person1.greet()
//   }
// };
//
// // Arrow function - 'this' is LOCKED to where it was defined
// const person2 = {
//   name: "Max",
//   greet: () => {
//     console.log(this.name); // undefined - 'this' is the global scope
//   }
// };
//

// -- Another Example with Destructuring

const person = {
  name: "Max",
  greet() {
    console.log(this); // ???
    console.log(this.name);
  },
};
//
// const { greet } = person;
// greet();

// When you destructure { greet }, you're extracting the function from the object. When you call greet() directly (not as person.greet()), there's no
//  object before the dot, so this becomes undefined (in strict mode) or the global object.

// Solutions:

// 1.
const { greet } = person;
greet.call(person);

// 2.
(() => {
  const boundGreet = person.greet.bind(person);
  boundGreet();
})();

(() => {
  const arrowGreet = () => person.greet();
  arrowGreet();
})();
