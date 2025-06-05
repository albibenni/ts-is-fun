import { initTRPC } from "@trpc/server";

import type { Context } from "./trpc-context.ts";
import { TaskListQuerySchema } from "src/zod/shared/schemas.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const taskRouter = router({
  getTask: publicProcedure
    .input(TaskListQuerySchema)
    .query(async ({ input, ctx }) => {
      const { tasks } = ctx;
      return tasks.getAllTasks({ completed: input.completed as boolean });
    }),
});
