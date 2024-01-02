import { log } from "console";

const myExponentiation = 2 ** 3;
// ^?
const myExponentiation2 = Math.pow(2, 3);
log(
  "exponentiation - es2016 ** and math.pow:",
  myExponentiation,
  myExponentiation2,
);

log("exponentiation - cube root: ", Math.pow(9, 1 / 3));

const ceiling = Math.ceil(1.4);
const floor = Math.floor(1.4);
const round = Math.round(1.4);
// ^?
log("Ceiling, floor and Round: ", ceiling, floor, round);

const random = Math.random();
log("Random number: ", random);
const myRandom = Math.floor(Math.random() * 10);
log("Random number between 0 and 10: ", myRandom);

const sign = Math.sign(-10);
log("Sign: ", sign);
