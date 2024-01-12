import { Router } from "express";

const adminRoutes = Router();

adminRoutes.get("/add-product", (req, res) => {
  res.send(
    '<form action="/admin/product" method="POST"><input type="text" name="product"><button type="submit">Send</button></form>',
  );
});

adminRoutes.post("/add-product", (req, res) => {
  const prodBody = req.body.product;
  console.log(prodBody);
  res.redirect("/");
});

export default adminRoutes;
