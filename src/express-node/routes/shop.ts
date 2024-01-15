import { Router } from "express";
import path from "node:path";
import { products } from "./admin";

const shopRoutes = Router();

shopRoutes.use("/", (req, res, next) => {
  console.log(products);
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
});

export default shopRoutes;
