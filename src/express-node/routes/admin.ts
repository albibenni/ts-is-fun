import { Router } from "express";
import path from "node:path";

const adminRoutes = Router();

adminRoutes.get("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});

adminRoutes.post("/add-product", (req, res) => {
  const prodBody = req.body.product;
  console.log(prodBody);
  res.redirect("/");
});

export default adminRoutes;
