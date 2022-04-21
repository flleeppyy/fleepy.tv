import fastify from "fastify";
import fastifyStatic from "fastify-static";
import fastifyCors from "fastify-cors";
import fs from "fs";
import path from "path";
import * as eta from "eta";
import crypto from "crypto";
import { randomSubtitle } from "./api/subtitles";
import {links} from "./api/links";
import { logger } from "./utils/logger";
import devWebSocket from "utils/devSocket";

const env = process.env.NODE_ENV;
const port = isNaN(Number(process.env.PORT)) ? 3000 : Number(process.env.PORT);

const app = fastify({
  trustProxy: true,
  // logger: logger,
  disableRequestLogging: env === "development" ? false : true,
});
console.log(__dirname);

const fakeHash = crypto.randomBytes(8).toString("hex");

const init = async () => {
  app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST"]
  });

  // logger.info(Object.keys(eta));
  // eta.config.root = __dirname;
  // eta.config.views = "./views";

  eta.configure({
    root: __dirname,
    views: "./views",
    globalConstants: {
      fakeHash: fakeHash,
      isDev: env === "development",
      randomSubtitle,
      links,
    },
  });

  // Catch fastify errors
  app.setErrorHandler((error, request, reply) => {
    reply.type("application/json");
    if (error.statusCode === 404) {
      reply.send(JSON.stringify({
        error: "Not found"
      }));
      return;
    }
    if (error.code === "FST_ERR_CTP_INVALID_MEDIA_TYPE") {
      reply.send(JSON.stringify({
        error: "Invalid media type"
      }));
      return;
    }

    reply.send(JSON.stringify({
      error: "Internal server error"
    }));
    logger.error(error);
  });

  app.get("/dev", (req, res) =>
    {env === "development" ? res.send(1) : res.send(0)}
  );

  app.addHook("onRequest", (req, res, next) => {
    if (env === "development") {
      res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.header("Expires", "-1");
      res.header("Pragma", "no-cache");
      res.header("x-dev", "true")
    }
    logger.info(`${req.method} ${req.headers["cf-connecting-ip"] || req.ip} - ${req.url}`);
    // Inject html into the response of every request with text/html
    next();
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    wildcard: true,
    prefix: "/",
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, "../../frontend_fancy/src"),
    wildcard: true,
    prefix: "/fancy",
    decorateReply: false // the reply decorator has been added by the first plugin registration
  });

  // Fancy frontend @ ../frontend/index.html
  app.get("/fancy", (req, res) => {
    res.redirect("/fancy/");
  })

  // app.get("/", async (req, res) => {
  //   res.type("text/html");

  //   await res.send(await eta.renderFile("/views/index.ejs", {
  //     links
  //   }));
  // });

  // Go through views and create a route for each one
  fs.readdirSync(path.join(__dirname, "/views")).filter(e => e.endsWith("ejs")).forEach(async (file) => {
    const route = file.replace(".ejs", "");
    if (file.indexOf(".ejs") !== -1) {
      if (route === "index") {
        app.get("/", async (req, res) => {
          res.type("text/html");
          await res.send(await eta.renderFile(`/views/${route}.ejs`, {}));
        });
        return
      } 

      app.get("/" + route, async (req, res) => {
        res.type("text/html");
        await res.send(await eta.renderFile(`/views/${file}`, {}));
      });
    }
  });


  // for .well-known paths, set mime type to text/plain
  app.addHook("onRequest", (req, res, next) => {
    if (req.url.startsWith("/.well-known")) {
      res.type("text/plain");
    }
    next();
  });

  (await import("./api/links")).default(app);
  (await import("./api/subtitles")).default(app);

  app.setNotFoundHandler((req, res) => {
    res.type("text/html");
    return res.status(404).send(fs.readFileSync(path.join(__dirname, "errors/404.html")));
  });
}

const start = async () => {
  if (env === "development") {
    devWebSocket();
  }
  await init();
  await app.listen(port);
  logger.info("Server listening on port " + port);
  
}

start();

process.on("uncaughtException", (err) => {
  logger.error(err);
})

process.on("unhandledRejection", (err) => {
  logger.error(err);
})