import { Worker } from "node:worker_threads";
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("HOME");
  } else if (req.url == "/single-thread") {
    let j = 0;
    for (let i = 0; i < 6000000000; i++) {
      j++;
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Slow Page ${j}`);
  } else if (req.url == "/worker") {
    const worker = new Worker("./src/advanced-js/worker/worker-thread.js");
    worker.on("message", (j) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Diffenrent thread ${j}`);
    });
  }
});

server.listen(3000, () => console.log("server is running on port 3000"));
