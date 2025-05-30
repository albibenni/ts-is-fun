let c1 = {
  x: 5,
  y: 10,
};
let c2 = {
  x: 15,
  y: 110,
};

function printCoordinates(this: any) {
  console.log(`${this.x}, ${this.y}`);
}

const c1_func = printCoordinates.bind(c1);
c1_func(); // 5, 10

const c2_func = printCoordinates.bind(c2);
c2_func(); // 15, 110
