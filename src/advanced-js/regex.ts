function extractNestedParenthesesContent(s: string): RegExpExecArray | [] {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(s);
  return matches ?? [];
}

console.log(extractNestedParenthesesContent("((a), (b, (c, d)), (e))"));
console.log(
  extractNestedParenthesesContent("I expect five hundred dollars ($500)."),
);
