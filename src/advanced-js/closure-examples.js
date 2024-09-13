for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(`i: ${i}`);
  }, i * 1000);
}
// i: 4
// i: 4
// i: 4
//

//************
//example of fix
//

for (var i = 1; i <= 3; i++) {
  let j = i;
  setTimeout(function () {
    console.log(`j: ${j}`);
  }, i * 1000);
}
// j: 1
// j: 2
// j: 3

// or
//

for (let i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(`i: ${i}`);
  }, i * 1000);
}
// i: 1
// i: 2
// i: 3
