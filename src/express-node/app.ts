import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import path from "node:path";

// Create an instance of Express
const app = express();
// Set the port for the server to listen on
const port = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); // default

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

//404
app.use((_, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
