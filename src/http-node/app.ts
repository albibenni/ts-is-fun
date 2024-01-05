import { connect } from "node:net";
import http from "node:http";
import fs from "fs";

const requestListener: http.RequestListener = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></input></form></body>",
    );
    res.write("</head>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body: any[] = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const [_, message] = parsedBody.split("=");
      fs.writeFileSync("./src/http-node/message.txt", message);
    });
    // fs.writeFileSync("./src/http-node/message.txt", "DUMMY");
    res.writeHead(302, { Location: "/" });
    /**
     * 302: Redirect
     */
    /**
     * could also use:
     * res.statusCode = 302;
     * res.setHeader("Location", "/");
     */
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Node App</title></head>");
  res.write("<body><h1>Hello, Node!</h1></body>");
  res.write("</head>");
  res.end();
};

const server = http.createServer((req, res) => {
  requestListener(req, res);
});

server.on("connect", (req, clientSocket, head) => {
  // Connect to an origin server
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = connect(Number(port) || 80, hostname, () => {
    clientSocket.write(
      "HTTP/1.1 200 Connection Established\r\n" +
        "Proxy-agent: Node.js-Proxy\r\n" +
        "\r\n",
    );
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// Start the server and listen on the specified port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
