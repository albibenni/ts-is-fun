import type { Request, Response } from "express";
import Product, { ProductSchema } from "../models/product.js";

export const getAddProduct = (req: Request, res: Response) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

export const postAddProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description } = ProductSchema.parse(req.body);
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

export const getProducts = (req: Request, res: Response) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
