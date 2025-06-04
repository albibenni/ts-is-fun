import { z } from "zod/v4";

export const TaskSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.coerce.boolean().default(false),
});

export const Test = z.array(z.string());

export const CreateTaskSchema = TaskSchema.omit({ id: true });
export const TaskParamsSchema = TaskSchema.partial();
export const UpdateTaskSchema = TaskSchema.partial().omit({ id: true });
export const TaskListSchema = z.array(TaskSchema);

export type Task = z.infer<typeof TaskSchema>;
export type TaskList = z.infer<typeof TaskListSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

export {};
