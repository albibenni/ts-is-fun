import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";

// Create an instance of Express
const app = express();
// Set the port for the server to listen on
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

//404
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
