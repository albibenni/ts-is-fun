import fs from "fs";
import type http from "node:http";

const requestHandler = (
  res: http.ServerResponse,
  req: http.IncomingMessage,
) => {
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
      fs.writeFile("./src/http-node/message.txt", message, (err) => {
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
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Node App</title></head>");
  res.write("<body><h1>Hello, Node!</h1></body>");
  res.write("</head>");
  res.end();
};

export default requestHandler;
