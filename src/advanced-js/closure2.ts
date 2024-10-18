function createFunction() {
  function multiplyBy2(num: number) {
    return num * 2;
  }
  return multiplyBy2;
}

const generatedFunc = createFunction();
const result = generatedFunc(3);
console.log(result);

function outer() {
  let counter = 0;
  function increment() {
    counter++;
    console.log(counter);
  }
  return increment;
}

const myFunc = outer();
myFunc();
myFunc();
myFunc();
