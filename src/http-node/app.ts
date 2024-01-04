import { log } from "console";
import http from "http";

const requestListener: http.RequestListener = (req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></input></form></body>",
    );
    res.write("</head>");
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

// Start the server and listen on the specified port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
