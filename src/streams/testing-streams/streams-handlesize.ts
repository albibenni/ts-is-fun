import concat from "concat-stream";
import http from "http";
import querystring from "querystring";
import through from "through2";

/**
 * HTTP server that reads request bodies with a size limit of 20 bytes.
 * If the body exceeds this limit, it stops processing further data.
 *
 * @example
 * // Use curl to test the server:
 * // curl -d "name=yourname" http://localhost:3000
 *
 * @description The server uses a transform stream to count bytes and reject
 * requests that exceed the 20-byte limit, then parses the body as query parameters.
 */
const server = http.createServer((req, res) => {
  req.pipe(counter()).pipe(concat({ encoding: "string" }, onbody));

  /**
   * Creates a transform stream that counts bytes and limits data flow to 20 bytes.
   * @returns {NodeJS.ReadWriteStream} Transform stream that enforces size limit
   */
  function counter(): NodeJS.ReadWriteStream {
    let size = 0;
    return through(function (
      buf: Buffer,
      _: string,
      next: (err?: Error | null, chunk?: any) => void,
    ) {
      size += buf.length;
      if (size > 20) {
        console.log("too big");
        res.end(`too biggy\n`);
        //next(null, null); //could also do this to stop the stream
      } else {
        next(null, buf); //pass the chunk along
      }
    });
  }

  /**
   * Processes the request body after it's been collected and size-limited.
   * Parses the body as query parameters and sends a response.
   * @param {string} body - The collected request body as a string
   */
  function onbody(body: string) {
    const params = querystring.parse(body);
    console.log(params);
  }
});

server.listen(3000);
console.log("listening on http://localhost:3000");
