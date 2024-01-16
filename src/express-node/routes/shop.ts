import { Router } from "express";
import path from "node:path";
import { products } from "./admin";

const shopRoutes = Router();

shopRoutes.get("/", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "shop.pug"));
  res.render("shop");
});

export default shopRoutes;
