import z from "zod/v4";

const API_URL = "http://localhost:4001";

export const TaskSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.coerce.boolean().default(false),
});

export const CreateTaskSchema = TaskSchema.omit({ id: true });
export const UpdateTaskSchema = TaskSchema.partial().omit({ id: true });
export const TaskListSchema = z.array(TaskSchema);

type TaskList = z.infer<typeof TaskListSchema>;

export const fetchTasks = async (showCompleted: boolean): Promise<TaskList> => {
  const url = new URL(`/tasks`, API_URL);

  if (showCompleted) {
    url.searchParams.set("completed", "true");
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const task = TaskListSchema.parse(await response.json());
  return task;
};

export const getTask = async (id: string): Promise<Task> => {
  const url = new URL(`/tasks/${id}`, API_URL);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
};

export const createTask = async (task: PartialTask): Promise<void> => {
  const url = new URL("/tasks", API_URL);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }
};

export const updateTask = async (
  id: string,
  task: PartialTask,
): Promise<void> => {
  const url = new URL(`/tasks/${id}`, API_URL);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const url = new URL(`/tasks/${id}`, API_URL);

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};
