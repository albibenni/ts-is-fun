console.log("Start");

setTimeout(() => console.log("Timeout (macrotask)"), 0);

Promise.resolve().then(() => console.log("Promise (microtask)"));

console.log("End");
