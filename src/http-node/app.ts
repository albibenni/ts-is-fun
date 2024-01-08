import http from "node:http";
import requestHandler from "./routes-app";

const server = http.createServer((req, res) => {
  requestHandler(res, req);
});

// Start the server and listen on the specified port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
