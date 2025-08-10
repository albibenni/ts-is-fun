import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(req.method, req.url, req.headers);

  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      body += chunk.toString();
    });
    req.on("end", () => {
      const params = new URLSearchParams(body);
      const parsedParams = Object.fromEntries(params);
      console.log(parsedParams);
      res.end("ok\n");
    });
  } else {
    res.end("ok\n");
  }
});

server.listen(8080);
