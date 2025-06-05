import { initTRPC } from "@trpc/server";

import type { Context } from "./trpc-context.ts";
import {
  CreateTaskSchema,
  TaskListQuerySchema,
  UpdateSchema,
} from "src/zod/shared/schemas.ts";
import z from "zod/v4";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const taskRouter = router({
  getTasks: publicProcedure
    .input(TaskListQuerySchema)
    .query(async ({ input, ctx }) => {
      const { tasks } = ctx;
      return tasks.getAllTasks({ completed: input.completed as boolean });
    }),
  createTask: publicProcedure
    .input(CreateTaskSchema)
    .mutation(async ({ input, ctx }) => {
      const { tasks } = ctx;
      return tasks.createTask(input);
    }),

  updateTask: publicProcedure
    .input(UpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { tasks } = ctx;
      return tasks.updateTask(input.id, input.task);
    }),
  deleteTask: publicProcedure
    .input(z.coerce.number())
    .mutation(async ({ input, ctx }) => {
      const { tasks } = ctx;
      return tasks.deleteTask(input);
    }),
});
