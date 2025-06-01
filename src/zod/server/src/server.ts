import cors from "cors";
import express, { Request, Response } from "express";
import type { Database } from "sqlite";
import { handleError } from "./handle-error.ts";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.get("/tasks", async (req: Request, res: Response): Promise<any> => {
    const { completed } = req.query;
    const query = completed === "true" ? completedTasks : incompleteTasks;

    try {
      const tasks = await query.all();
      return res.json(tasks);
    } catch (error) {
      return handleError(req, res, error);
    }
  });

  // Get a specific task
  app.get("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await getTask.get([id]);

      if (!task) return res.status(404).json({ message: "Task not found" });

      return res.json(task);
    } catch (error) {
      return handleError(req, res, error);
    }
  });

  type CreateTaskRequestBody = {
    title: string;
    description?: string;
  };
  type CreateTaskRequest = Request<
    object,
    { message: string },
    CreateTaskRequestBody
  >;
  app.post("/tasks", async (req: CreateTaskRequest, res): Promise<void> => {
    try {
      const task = req.body;
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
  app.put("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const previous = await getTask.get([id]);
      const updates = req.body;
      const task = { ...previous, ...updates };

      await updateTask.run([task.title, task.description, task.completed, id]);
      return res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      return handleError(req, res, error);
    }
  });

  // Delete a task
  app.delete("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await deleteTask.run([id]);
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      return handleError(req, res, error);
    }
  });

  return app;
}
