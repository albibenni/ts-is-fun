import express from "express";

// Create an instance of Express
const app = express();

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Define a route for /about path
app.get("/about", (req, res) => {
  res.send("About us page");
});

// Define a route for handling 404 errors
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Set the port for the server to listen on
const port = 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
