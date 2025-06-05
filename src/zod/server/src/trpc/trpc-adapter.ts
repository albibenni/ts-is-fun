import { Router } from "express";
import { createContext } from "./trpc-context.ts";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { taskRouter } from "./trpc.ts";

export function createTRPCAdapter() {
  const router = Router();
  router.use(
    "/trpc",
    createExpressMiddleware({ router: taskRouter, createContext }),
    (req, res, next) => {},
  );
  return router;
}
