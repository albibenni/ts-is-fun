import type { ZodType } from "zod/v4";
import { z } from "zod/v4";
type Task = {
  id: string;
  title: string;
  description: string;
};

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
}) satisfies ZodType<Task>;

// Example usage of the task schema
const validTask = {
  id: "task-123",
  title: "Complete Zod validation",
  description: "Implement and test Zod schemas for task validation",
};

const parsedTask = taskSchema.parse(validTask);
console.log("Parsed task:", parsedTask);

// This will throw an error - missing required fields
try {
  taskSchema.parse({
    id: "task-456",
    // missing title and description
  });
} catch (error) {
  console.error("Validation failed:", (error as Error).message);
}

// This will also throw an error - wrong type
try {
  taskSchema.parse({
    id: 123, // should be string
    title: "Some title",
    description: "Some description",
  });
} catch (error) {
  console.error("Validation failed:", (error as Error).message);
}
