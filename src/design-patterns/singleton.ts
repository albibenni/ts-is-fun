import { z } from "zod/v4";
export class Logger {
  private static loggerInstance: Logger | undefined = undefined;
  private logs: TLog[];
  private constructor() {
    this.logs = [];
  }
  static log(message: string) {
    const instance = this.getInstance();
    const timestamp = new Date().toISOString();
    const log: TLog = { message, timestamp };
    instance.logs.push(log);
  }
  private static getInstance(): Logger {
    if (!this.loggerInstance) {
      this.loggerInstance = new Logger();
      return this.loggerInstance;
    } else return this.loggerInstance;
  }
}

export const LogSchema = z.object({
  message: z.string(),
  timestamp: z.string(),
});
type TLog = z.infer<typeof LogSchema>;
