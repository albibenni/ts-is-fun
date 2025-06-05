import { getDatabase } from "../database.ts";
import { TaskClient } from "../client.ts";

export async function createContext() {
  const db = await getDatabase();
  const tasks = new TaskClient(db);
  return { tasks };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
