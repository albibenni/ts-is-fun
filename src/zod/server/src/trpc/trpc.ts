import { initTRPC } from "@trpc/server";
import { z } from "zod/v4";

import type { Context } from "./trpc-context.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const taskRouter= router({})
