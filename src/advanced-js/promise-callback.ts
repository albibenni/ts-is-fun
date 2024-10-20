function display(data: any) {
  console.log(data);
}
function blockForloop() {
  for (let x = 0; x < 1000; x++) {}
  console.log("blockForloop");
}

function printHello() {
  console.log("hello print");
}

setTimeout(printHello, 0);

const futureData = fetch(
  "https://x.com/ThePrimeagen/status/1847997426814108016"
);
futureData.then(display);

blockForloop();
console.log("actually I'm first");
