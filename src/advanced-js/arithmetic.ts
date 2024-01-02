import { log } from "console";

const myExponentiation = 2 ** 3;
// ^?
const myExponentiation2 = Math.pow(2, 3);
log(
  "exponentiation - es2016 ** and math.pow:",
  myExponentiation,
  myExponentiation2,
);

const ceiling = Math.ceil(1.4);
const floor = Math.floor(1.4);
const round = Math.round(1.4);
// ^?
log("Ceiling, floor and Round: ", ceiling, floor, round);
