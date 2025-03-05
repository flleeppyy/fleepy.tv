import type { FastifyInstance } from "fastify";

export default (app: FastifyInstance) => {
  app.all("/api/v1/ping", async (req, res) => {
    return res.send("pong");
  });
};
