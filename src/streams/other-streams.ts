import fs from "node:fs";
import { Transform } from "node:stream";

function upperCase() {
  return new Transform({
    transform(chunk, encoding, callback) {
      // Transform the data here
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const transformed = chunk.toString().toUpperCase();
      callback(null, transformed);
    },
  });
}
function main() {
  const file = import.meta.dirname + "/small.txt";
  new Transform();
  const res = fs.createReadStream(file).pipe(upperCase()).pipe(process.stdout);
}
main();
