// Copyright (C) 2022 Flleeppyy (Chen Jinkerson)
// https://github.com/flleeppyy/fleepy.tv/blob/master/LICENSE
import fastify from "fastify";
import fastifyStatic from "fastify-static";
import fastifyCors from "fastify-cors";
import fs from "fs";
import path from "path";
import ejs from "ejs";
import axios from "axios";
import ws from "ws";
import crypto from "crypto";
// import socketio from "socket.io";
import { randomSubtitle } from "./api/subtitles";
import {links} from "./api/links";
import { logger } from "./utils/logger";

const env = process.env.NODE_ENV;
const port = isNaN(NaN) ? Number(process.env.PORT) : 8001;

async function checkDev() {
  if (env === "development") {
    const wsPort = 8081;

    // const io = new socketio.Server(8081, {
    //   cors: {
    //     methods: ["GET", "POST"],
    //     origin: "*"
    //   }
    // })
    const io = new ws.Server({
      port: wsPort,
    });

    logger.info(`Socket listening at ws://127.0.0.1:${wsPort}`);
    io.once("listening", () => {
      const files = [
        {
          path: "../../frontend_fancy/src/index.html",
          action: "refreshPage"
        }, {
          path: "../../frontend_fancy/src/js/bundle.js",
          action: "refreshPage"
        }, {
          path: "../../frontend_fancy/src/css/main.css",
          action: "refreshCss"
        }, {
          path: "./index.ejs/",
          action: "refreshPage"
        }, {
          path: "../../public/js/main.js",
          action: "refreshPage"
        }, {
          path: "../../public/css/styles.css",
          action: "refreshCss"
        }, {
          path: "../../public/js/logger.js",
          action: "refreshPage"
        }
      ];
  
      files.forEach(file => {
        fs.watchFile(path.join(__dirname, file.path), {
          interval: 500
        }, () => {
          io.clients.forEach(socket => socket.send(JSON.stringify(file)));
        });
      });

      io.on("connection", (socket) => {
        socket.send("hihi");
      });
    });
  }
}

const app = fastify({
  trustProxy: true,
  logger: logger,
  disableRequestLogging: env === "development" ? false : true,
});

const fakeHash = crypto.randomBytes(8).toString("hex");

const init = async () => {
  app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST"]
  });

  app.get("/dev", (req, res) => {
    if (env === "development") {
      res.send(0x01);
    } else {
      res.send(0x00);
    }
  })
  
  app.addHook("onRequest", (req, res, next) => {
    if (env === "development") {
      res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.header("Expires", "-1");
      res.header("Pragma", "no-cache");
      res.header("x-dev", "true")
    }
    logger.info(`IP: ${req.headers["cf-connecting-ip"] || req.ip} Requested ${req.url}`);
    // Inject html into the response of every request with text/html
    next();
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, "../../public"),
    wildcard: true,
    prefix: "/",
  });
  
  app.register(fastifyStatic, {
    root: path.join(__dirname, "../../frontend_fancy/src"),
    wildcard: true,
    prefix: "/fancy",
    decorateReply: false // the reply decorator has been added by the first plugin registration
  });

  app.get("/fancy", (req, res) => {
    res.redirect("/fancy/");
  })

  // Fancy frontend @ ../frontend/index.html
  app.get("/", async (req, res) => {
    res.type("text/html");
    await res.send(await ejs.renderFile(path.join(__dirname, "index.ejs"), {
      subtitle: randomSubtitle(),
      links,
      fakeHash
    }));
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

  return;
}

const start = async () => {
  await checkDev();
  await init();
  await app.listen(port);
}

start();

process.on("uncaughtException", (err) => {
  logger.error(err);
})

process.on("unhandledRejection", (err) => {
  logger.error(err);
})