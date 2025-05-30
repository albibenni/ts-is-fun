import chalk from "chalk";
import "dotenv/config";

import { getDatabase } from "./database.ts";
import { createServer } from "./server.ts";

const database = await getDatabase();
const server = await createServer(database);

const PORT = 4001;

server.listen(PORT, () => {
  const url = chalk.blue(`http://localhost:${PORT}`);
  console.log(chalk.green(`Server is running on ${url}.`));
});
