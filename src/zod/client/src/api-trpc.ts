import type { CreateTask, Task, UpdateTask } from "@shared/schemas";
import type { taskRouter } from "@server/src/trpc/trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

const API_URL = "http://localhost:4001";

const client = createTRPCClient<typeof taskRouter>({
  links: [
    httpBatchLink({
      url: `${API_URL}/api/trpc`,
    }),
  ],
});

export const fetchTasks = async (showCompleted: boolean): Promise<Task[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await client.getTasks.query({ completed: showCompleted });
};

export const createTask = async (task: CreateTask): Promise<void> => {
  return await client.createTask.mutate(task);
};

export const updateTask = async (
  id: string,
  task: UpdateTask,
): Promise<void> => {
  return await client.updateTask.mutate({ id: Number(id), task });
};

export const deleteTask = async (id: string): Promise<void> => {
  return await client.deleteTask.mutate(Number(id));
};
