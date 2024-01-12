import { Router } from "express";
import path from "node:path";

const shopRoutes = Router();

shopRoutes.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
});

export default shopRoutes;
