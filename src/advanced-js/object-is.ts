if (!Object.is) {
  Object.is = function ObjectIs(x: number, y: number) {
    let xNegZero = isItNegZero(x);
    let yNegZero = isItNegZero(y);

    if (xNegZero || yNegZero) {
      return xNegZero && yNegZero;
    } else if (isItNaN(x) && isItNaN(y)) {
      return true;
    } else if (x === y) {
      return true;
    }
    return false;

    function isItNegZero(value: number) {
      return value == 0 && 1 / value == -Infinity;
    }

    function isItNaN(value: number) {
      return value !== value; // like NaN
    }
  };
}

console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
