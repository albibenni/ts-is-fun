import { Router } from "express";
import path from "node:path";
export type Product = { title: string };

const adminRoutes = Router();
export const products: Product[] = [];

adminRoutes.get("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});

adminRoutes.post("/add-product", (req, res) => {
  const prodBody = req.body.title;
  products.push({ title: prodBody });
  res.redirect("/shop");
});

export default adminRoutes;
