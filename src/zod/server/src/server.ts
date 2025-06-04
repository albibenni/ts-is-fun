import cors from "cors";
import express from "express";
import { handleError } from "./handle-error.ts";
import type { Request, Response } from "express";
import type { Database } from "sqlite";
import type { CreateTask, UpdateTask } from "../../shared/schemas.ts";
import {
  CreateTaskSchema,
  TaskSchema,
  UpdateTaskSchema,
} from "../../shared/schemas.ts";

export async function createServer(database: Database) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const incompleteTasks = await database.prepare(
    "SELECT * FROM tasks whERE completed = 0",
  );
  const completedTasks = await database.prepare(
    "SELECT * FROM tasks WHERE completed = 1",
  );
  const getTask = await database.prepare("SELECT * FROM tasks WHERE id = ?");
  const createTask = await database.prepare(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
  );
  const deleteTask = await database.prepare("DELETE FROM tasks WHERE id = ?");
  const updateTask = await database.prepare(
    `UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?`,
  );

  app.get("/tasks", async (req: Request, res: Response): Promise<void> => {
    const { completed } = req.query;
    const query = completed === "true" ? completedTasks : incompleteTasks;

    try {
      const tasks = await query.all();
      res.json(tasks);
      return;
    } catch (error) {
      handleError(req, res, error);
      return;
    }
  });

  // Get a specific task
  app.get("/tasks/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const task = await getTask.get([id]);

      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.json(task);
      return;
    } catch (error) {
      handleError(req, res, error);
      return;
    }
  });

  // type CreateTaskRequestBody = {
  //   title: string;
  //   description?: string;
  // };
  // type CreateTaskRequest = Request<
  //   object,
  //   { message: string },
  //   CreateTaskRequestBody
  // >;
  app.post("/tasks", async (req, res): Promise<void> => {
    try {
      const task: CreateTask = CreateTaskSchema.parse(req.body);
      if (!task.title) {
        res.status(400).json({ message: "Title is required" });
        return;
      }

      await createTask.run([task.title, task.description]);
      res.status(201).json({ message: "Task created successfully!" });
      return;
    } catch (error) {
      handleError(req, res, error);
      return;
    }
  });

  // Update a task
  app.put("/tasks/:id", async (req, res): Promise<void> => {
    try {
      const { id } = req.params;

      const previous = TaskSchema.parse(await getTask.get([id]));
      const updates: UpdateTask = UpdateTaskSchema.parse(req.body);
      const task = { ...previous, ...updates };

      await updateTask.run([task.title, task.description, task.completed, id]);
      res.status(200).json({ message: "Task updated successfully" });
      return;
    } catch (error) {
      handleError(req, res, error);
      return;
    }
  });

  // Delete a task
  app.delete("/tasks/:id", async (req, res): Promise<void> => {
    try {
      const { id } = req.params;
      await deleteTask.run([id]);
      res.status(200).json({ message: "Task deleted successfully" });
      return;
    } catch (error) {
      handleError(req, res, error);
      return;
    }
  });

  return app;
}
