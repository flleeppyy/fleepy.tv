import type { FastifyInstance } from "fastify";

export default (app: FastifyInstance) => {
  app.get("/api/v1/ping", async (req, res) => {
    return res.send("pong");
  });

  app.post("/api/v1/ping", async (req, res) => {
    return res.send("pong");
  });
}