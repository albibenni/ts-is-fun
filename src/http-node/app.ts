import http from "http";

const requestListener: http.RequestListener = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, Node!");
};

const server = http.createServer((req, res) => {
  requestListener(req, res);
});

// Start the server and listen on the specified port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
