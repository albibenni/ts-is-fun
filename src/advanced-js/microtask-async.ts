console.log("Start");

async function asyncTask() {
  console.log("Inside async function");
  await Promise.resolve();
  console.log("After await");
}

asyncTask();

console.log("End");
