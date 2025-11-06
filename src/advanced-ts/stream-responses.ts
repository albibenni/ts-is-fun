import Fastify from "fastify";
import { spawn } from "node:child_process";
import process from "node:process";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

// Declare a route
fastify.get("/", function handler(_request, _reply) {
  return { hello: "world" };
});

fastify.post(
  "/cmd",
  {
    schema: {
      body: z.object({
        command: z.string(),
      }),
    },
  },
  async function handler(request, reply) {
    const { command } = request.body;
    reply.header("content-type", "text/plain");
    const res = spawn(command, { shell: true });

    res.stdout.on("data", (chunk) => {
      reply.raw.write(chunk);
    });

    res.on("exit", (code) => {
      if (code === 0) {
        reply.statusCode = 200;
      } else reply.statusCode = 500;
      reply.raw.end();
    });
    return reply;
  },
);

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
