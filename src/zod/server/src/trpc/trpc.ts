import { initTRPC } from "@trpc/server";
import { z } from "zod/v4";

import type { Context } from "./trpc-context.ts";
import { TaskListQuerySchema, TaskListSchema } from "src/zod/shared/schemas.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const taskRouter = router({
  getTask: publicProcedure
    .input(TaskListQuerySchema)
    .query(async ({ input, ctx }) => {
      const { db } = ctx;
      const completed_tasks = await db.prepare(
        "SELECT * FROM tasks WHERE completed = 1",
      );
      const incompleted_tasks = await db.prepare(
        "SELECT * FROM tasks WHERE completed = 0",
      );
      const tasks = input.completed ? completed_tasks : incompleted_tasks;
      const rows = TaskListSchema.parse(await tasks.all());
      return rows;
    }),
});
