import createClient from "openapi-fetch";
import type { paths } from "./api.types";

const { GET, POST, PUT, DELETE } = createClient<paths>({
  baseUrl: "http://localhost:4001",
});

void GET("/tasks", {
  query: {
    completed: true,
  },
});

void POST("/tasks", {
  body: {
    title: "New Task",
    description: "Task description",
    completed: false,
  },
});
