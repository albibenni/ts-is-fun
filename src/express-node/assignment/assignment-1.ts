import express from "express";

const app = express();
const port = 3000;

app.use("/user", (req, res, next) => {
  console.log("In the 'user' middleware");
  res.send("<h1>Hello from User!</h1>");
});
app.use("/", (req, res, next) => {
  console.log("In the second middleware");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
