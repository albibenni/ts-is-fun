import { log } from "console";

/**
 * Strings and string methods
 */
log("\xA9"); // ©
log("\u03c0"); // π
log("\u{1f600}"); // 😀

const love = "\ud83d\udc96";
log(love, "length: ", love.length);

const text = 'name = "John"';
log(text);

const oneLineIn3Lines =
  "This is \
one line \
in three lines";
log(oneLineIn3Lines);

const threeLinesIn1Line = "This is \n 3 lines \n in one line";
log(threeLinesIn1Line);

const twoLinesBacktick = `This is
two lines`;
log(twoLinesBacktick);
/**
 * String methods
 */
