import fs from "node:fs";

function main() {
  const file = import.meta.dirname + "/large.txt";
  const res = fs
    .createReadStream(file)
    .pipe(process.stdout)
    .pipe(process.stderr);
}
main();
