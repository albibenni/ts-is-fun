import { log } from "console";

const negInfinity = Number.NEGATIVE_INFINITY;
const posInfinity = Number.POSITIVE_INFINITY;
log("Positive Infinity - Negative Infinity: ", posInfinity, negInfinity);

const max = Number.MAX_VALUE * 2;
const min = Number.MIN_VALUE / 2;
log("Max - Min: ", max, min);

const minNeg = -Number.MIN_VALUE / 2;
log("Min negative: ", minNeg);

const isNumber = Number.isFinite(12);
const isNan = Number.isNaN(NaN);
log("isFinite - isNaN: ", isNumber, isNan);

const isSafeInteger = Number.isSafeInteger(9007199254740991);
log("isSafeInteger: ", isSafeInteger);

const negativeZero = -0;
log("Negative zero: ", negativeZero);
