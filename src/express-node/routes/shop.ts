import express, { Router } from "express";

const shopRoutes = Router();

shopRoutes.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express!</h1>");
});

// Define a route for handling 404 errors
shopRoutes.use((req, res) => {
  res.status(404).send("Page not found");
});

export default shopRoutes;
