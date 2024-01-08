import { log } from "console";

function extractNestedParenthesesContent(s: string): RegExpExecArray | null {
  const regExp = /\(([^)]+)\)/g;
  const matches = regExp.exec(s);
  return matches;
}

log(extractNestedParenthesesContent("((a), (b, (c, d)), (e))"));
log(extractNestedParenthesesContent("I expect five hundred dollars ($500)."));

const extractNestedParenthesesContentOneLine = (
  str: string,
): RegExpMatchArray | null => {
  return str.match(/\(([^)]+)\)/g);
};

log(extractNestedParenthesesContentOneLine("((a), (b, (c, d)), (e))"));
