import concat from "concat-stream";
import http from "http";
import querystring from "querystring";
import through from "through2";

const server = http.createServer((req, res) => {
  req.pipe(counter()).pipe(concat({ encoding: "string" }, onbody));
  function counter() {
    let size = 0;
    return through(function (buf, enc, next) {
      size += buf.length as number;
      if (size > 20) {
        next(null, null);
      } else {
        next(null, buf);
      }
    });
  }

  function onbody(body) {
    const params = querystring.parse(body);
    console.log(params);
    res.end(`hello ${params}\n`);
  }
});
