import type { FastifyInstance } from "fastify";
import fs from "fs/promises";
import path from "path";

export default async (app: FastifyInstance) => {
  const apis = {
    v1: [] as string[],
    v2: [] as string[],
  };

  for (let v of Object.keys(apis)) {
    app.get("/api/" + v, async (req, res) => {
      return res.send(apis[v]);
    });

    const files = await fs.readdir(path.join(__dirname, v));
    for (const api of files) {
      if (api.endsWith("d.ts")) return;
      await (await import(path.join(__dirname, v, api.split(".ts")[0]))).default(app);
      apis[v].push(api.split(".")[0]);
    }
  }

  app.get("/api", async (req, res) => {
    return res.send(apis);
  });
};
