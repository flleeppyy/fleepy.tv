import type { FastifyInstance } from "fastify";

export default (app: FastifyInstance) => {
  app.get("/api", async (req, res) => {
    return res.send({
      paths: ["/api/links", "/api/subtitles", "/api/modpacks"],
      apiVersion: -1,
    });
  });
};
