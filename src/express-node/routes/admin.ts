import { Router } from "express";

const adminRoutes = Router();

adminRoutes.get("/add-product", (req, res) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="product"><button type="submit">Send</button></form>',
  );
});

adminRoutes.post("/product", (req, res) => {
  const prodBody = req.body.product;
  console.log(prodBody);
  res.redirect("/");
});

export default adminRoutes;
