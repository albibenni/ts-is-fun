import express from "express";

// Create an instance of Express
const app = express();
// Set the port for the server to listen on
const port = 3000;

app.use((req, res, next) => {
  console.log("In the middleware");
  next();
});
app.use((req, res, next) => {
  console.log("In the second middleware");
  res.send("<h1>Hello from Express!</h1>");
});

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Define a route for /user path
app.get("/user", (req, res) => {
  res.send("User page");
});

// Define a route for handling 404 errors
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
