import { describe, it, expect } from "vitest";
import { z } from "zod";
import type { ZodType } from "zod";

// Task type definition
type Task = {
  id: string;
  title: string;
  description: string;
};

// Task schema definition
const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
}) satisfies ZodType<Task>;

describe("Task Schema Validation", () => {
  describe("Valid Tasks", () => {
    it("should pass with all required fields", () => {
      const validTask = {
        id: "task-123",
        title: "Complete Zod validation",
        description: "Implement and test Zod schemas for task validation",
      };

      const result = taskSchema.parse(validTask);
      expect(result).toEqual(validTask);
    });

    it("should pass with minimal valid data", () => {
      const minimalTask = {
        id: "1",
        title: "Test",
        description: "A",
      };

      const result = taskSchema.parse(minimalTask);
      expect(result).toEqual(minimalTask);
    });

    it("should pass with special characters in strings", () => {
      const taskWithSpecialChars = {
        id: "task-!@#$%",
        title: "Title with émojis 🚀 and symbols!",
        description: "Description with newlines\nand special chars: <>[]{}()",
      };

      const result = taskSchema.parse(taskWithSpecialChars);
      expect(result).toEqual(taskWithSpecialChars);
    });
  });

  describe("Invalid Tasks - Missing Fields", () => {
    it("should fail when id is missing", () => {
      const taskWithoutId = {
        title: "Some title",
        description: "Some description",
      };

      expect(() => taskSchema.parse(taskWithoutId)).toThrow();
    });

    it("should fail when title is missing", () => {
      const taskWithoutTitle = {
        id: "task-456",
        description: "Some description",
      };

      expect(() => taskSchema.parse(taskWithoutTitle)).toThrow();
    });

    it("should fail when description is missing", () => {
      const taskWithoutDescription = {
        id: "task-789",
        title: "Some title",
      };

      expect(() => taskSchema.parse(taskWithoutDescription)).toThrow();
    });

    it("should fail when all fields are missing", () => {
      const emptyTask = {};

      expect(() => taskSchema.parse(emptyTask)).toThrow();
    });
  });

  describe("Invalid Tasks - Wrong Types", () => {
    it("should fail when id is not a string", () => {
      const taskWithNumberId = {
        id: 123,
        title: "Some title",
        description: "Some description",
      };

      expect(() => taskSchema.parse(taskWithNumberId)).toThrow();
    });

    it("should fail when title is not a string", () => {
      const taskWithNumberTitle = {
        id: "task-123",
        title: 456,
        description: "Some description",
      };

      expect(() => taskSchema.parse(taskWithNumberTitle)).toThrow();
    });

    it("should fail when description is not a string", () => {
      const taskWithBooleanDescription = {
        id: "task-123",
        title: "Some title",
        description: true,
      };

      expect(() => taskSchema.parse(taskWithBooleanDescription)).toThrow();
    });

    it("should fail when fields are null", () => {
      const taskWithNullFields = {
        id: null,
        title: null,
        description: null,
      };

      expect(() => taskSchema.parse(taskWithNullFields)).toThrow();
    });

    it("should fail when fields are undefined", () => {
      const taskWithUndefinedFields = {
        id: undefined,
        title: undefined,
        description: undefined,
      };

      expect(() => taskSchema.parse(taskWithUndefinedFields)).toThrow();
    });
  });

  describe("Edge Cases", () => {
    it("should fail when input is not an object", () => {
      expect(() => taskSchema.parse("not an object")).toThrow();
      expect(() => taskSchema.parse(123)).toThrow();
      expect(() => taskSchema.parse([])).toThrow();
      expect(() => taskSchema.parse(null)).toThrow();
    });

    it("should pass with empty strings (valid but not ideal)", () => {
      const taskWithEmptyStrings = {
        id: "",
        title: "",
        description: "",
      };

      // Empty strings are technically valid strings
      expect(() => taskSchema.parse(taskWithEmptyStrings)).not.toThrow();
    });

    it("should ignore extra fields", () => {
      const taskWithExtraFields = {
        id: "task-123",
        title: "Some title",
        description: "Some description",
        extraField: "should be ignored",
        anotherExtra: 999,
      };

      const result = taskSchema.parse(taskWithExtraFields);

      // Zod strips extra fields by default
      expect(result).toEqual({
        id: "task-123",
        title: "Some title",
        description: "Some description",
      });
      expect(result).not.toHaveProperty("extraField");
      expect(result).not.toHaveProperty("anotherExtra");
    });
  });

  describe("Type Inference", () => {
    it("should infer the correct TypeScript type", () => {
      const validTask = {
        id: "task-123",
        title: "Test Task",
        description: "Test Description",
      };

      const parsed = taskSchema.parse(validTask);

      // TypeScript should infer the correct type
      const taskId: string = parsed.id;
      const taskTitle: string = parsed.title;
      const taskDescription: string = parsed.description;

      expect(taskId).toBe("task-123");
      expect(taskTitle).toBe("Test Task");
      expect(taskDescription).toBe("Test Description");
    });
  });

  describe("safeParse vs parse", () => {
    it("should use safeParse for error handling without exceptions", () => {
      const invalidTask = {
        id: 123,
        title: "Some title",
        // missing description
      };

      const result = taskSchema.safeParse(invalidTask);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(result.error.issues).toHaveLength(2); // id type error + missing description
      }
    });

    it("should use safeParse for successful validation", () => {
      const validTask = {
        id: "task-123",
        title: "Valid Task",
        description: "Valid Description",
      };

      const result = taskSchema.safeParse(validTask);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validTask);
      }
    });
  });
});
