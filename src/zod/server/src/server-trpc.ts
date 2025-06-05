import cors from "cors";
import type { Request, RequestHandler, Response } from "express";
import express from "express";
import type { Database } from "sqlite";
import { type ZodObject, type ZodRawShape } from "zod/v4";
import type { UpdateTask } from "../../shared/schemas.ts";
import {
  CreateTaskSchema,
  TaskParamsSchema,
  TaskSchema,
  UpdateTaskSchema,
} from "../../shared/schemas.ts";
import { handleError } from "./handle-error.ts";
import { TaskClient } from "./client.ts";
import { createTRPCAdapter } from "./trpc/trpc-adapter.ts";

export async function createServer(database: Database) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", createTRPCAdapter());

  const getTask = await database.prepare("SELECT * FROM tasks WHERE id = ?");
  const createTask = await database.prepare(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
  );
  const deleteTask = await database.prepare("DELETE FROM tasks WHERE id = ?");
  const updateTask = await database.prepare(
    `UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?`,
  );

  const validateBody =
    <T extends ZodRawShape>(
      schema: ZodObject<T>,
    ): RequestHandler<object, unknown, T> =>
    (req, res, next) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        handleError(req, res, error);
      }
    };
  const validateParamMiddleware =
    <T extends ZodRawShape>(schema: ZodObject<T>): RequestHandler<T> =>
    (req, res, next) => {
      try {
        schema.parse(req.params);
        //req.params = params;
        next();
      } catch (error) {
        handleError(req, res, error);
        return; // Important: prevent further execution
      }
    };
  const validateQuery =
    <T extends ZodRawShape>(
      schema: ZodObject<T>,
    ): RequestHandler<object, unknown, unknown, Request["query"] & T> =>
    (request, response, next): void => {
      try {
        //request.query = schema.parse(request.query) as Request["query"];
        schema.parse(request.query) as Request["query"];
        next();
      } catch (error) {
        handleError(request, response, error);
        return;
      }
    };

  // TRPC

  const client = new TaskClient(database);

  app.get(
    "/tasks",
    validateQuery(TaskSchema.pick({ completed: true })),
    async (req: Request, res: Response): Promise<void> => {
      const { completed } = req.query;
      //const query = completed === "true" ? completedTasks : incompleteTasks;

      try {
        //const tasks = await query.all();
        const tasks = await client.getAllTasks({
          completed: completed === "true",
        });
        res.json(tasks);
        return;
      } catch (error) {
        handleError(req, res, error);
        return;
      }
    },
  );

  // Get a specific task
  app.get(
    "/tasks/:id",
    validateParamMiddleware(TaskParamsSchema),
    async (req, res): Promise<void> => {
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
    },
  );

  // type CreateTaskRequestBody = {
  //   title: string;
  //   description?: string;
  // };
  // type CreateTaskRequest = Request<
  //   object,
  //   { message: string },
  //   CreateTaskRequestBody
  // >;
  app.post(
    "/tasks",
    // validate({
    //   body: TaskListSchema,
    // }),
    // validateCreateTask,
    validateBody(CreateTaskSchema),
    async (req, res): Promise<void> => {
      try {
        const task = req.body; // the middleware does the validation for us
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
    },
  );

  // Update a task
  app.put(
    "/tasks/:id",
    validateParamMiddleware(TaskSchema.pick({ id: true })),
    async (req, res): Promise<void> => {
      try {
        const { id } = req.params;

        const previous = TaskSchema.parse(await getTask.get([id]));
        const updates: UpdateTask = UpdateTaskSchema.parse(req.body);
        const task = { ...previous, ...updates };

        await updateTask.run([
          task.title,
          task.description,
          task.completed,
          id,
        ]);
        res.status(200).json({ message: "Task updated successfully" });
        return;
      } catch (error) {
        handleError(req, res, error);
        return;
      }
    },
  );

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
