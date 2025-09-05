import concat from "concat-stream";
import http from "http";
import querystring from "querystring";
import through from "through2";

const server = http.createServer((req, res) => {
  req.pipe(counter()).pipe(concat({ encoding: "string" }, onbody));
  function counter() {
    let size = 0;
    return through(function (
      buf: Buffer,
      enc: string,
      next: (err?: Error | null, chunk?: any) => void,
    ) {
      size += buf.length;
      if (size > 20) {
        console.log("too big");
        next(null, null);
      } else {
        next(null, buf);
      }
    });
  }

  function onbody(body: string) {
    const params = querystring.parse(body);
    console.log(params);
    res.end(`hello\n`);
  }
});

server.listen(3000);
console.log("listening on http://localhost:3000");
