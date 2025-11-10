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
