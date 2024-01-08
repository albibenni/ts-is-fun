import http from "node:http";
import { requestHandler, requestUserHandler } from "./routes-app";

const server = http.createServer(requestHandler);
const server2 = http.createServer(requestUserHandler);

// Start the server and listen on the specified port
const port = 3000;
server2.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
