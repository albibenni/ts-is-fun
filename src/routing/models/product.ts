import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod/v4";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.join(path.dirname(__dirname), "data", "products.json");

const getProductsFromFile = (cb: (products: Product[]) => void) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent.toString()) as Product[]);
    }
  });
};

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string().min(2).max(100),
  imageUrl: z.url(),
  description: z.string().min(5).max(500),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
});

export default class Product {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: string;

  constructor(
    title: string,
    imageUrl: string,
    description: string,
    price: string,
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = "0";
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products: Product[]) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb: (products: Product[]) => void) {
    getProductsFromFile(cb);
  }
}
