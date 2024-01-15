import express from "express";
import bodyParser from "body-parser";
import path from "node:path";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "user.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "base.html"));
});

//404
app.use((_, res) => {
  res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
