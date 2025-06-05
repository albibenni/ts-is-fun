import { getDatabase } from "../database.ts";

export async function createContext() {
  const db = await getDatabase();
  return { db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
