import { Router } from "express";
import { createContext } from "./trpc-context.ts";
import {createExpressMiddleware} from "@trpc/server/adapters/express";

export function createTRPCAdapter() {
    const router = Router();
    router.use("/trpc",createExpressMiddleware({router: null, createContext}),(req, res, next) => {
        req.context = createContext();
        next();
    }
}

