// Copyright (C) 2021 Flleeppyy (Chen Jinkerson)
// https://github.com/flleeppyy/fleepy.tv/blob/master/LICENSE
import fastify from "fastify";
import fastifyStatic from "fastify-static";
import * as fs from "fs";
import path from "path";

const env = process.env.NODE_ENV;
const envPort = Number(process.env.PORT);
const port = (isNaN(NaN)) ? envPort : 8001;

const dev = (env === "development") ? true : false;

(async () => {
  if (dev) {
    const io = await import("socket.io").then(e => {
      return new e.Server(8081, {
        cors: {
          methods: ["GET", "POST"],
          origin: ["http://127.0.0.1:8080", "http://fumo.cirnosystems.xyz:8080"]
        }
      });
    });
    
    // const files = []]\
    //   "index.html",
    //   "js/bundle.js"
    // ];
    // files.forEach(file => {
    //   fs.watchFile(path.join(__dirname, "../../frontend/src/", file), {
    //     interval: 500
    //   }, () => {
    //     io.send("refresh");
    //   });
    // });
    
    fs.watchFile(path.join(__dirname, "../../frontend/src/index.html"), {
      interval: 500
    }, () => {
      io.send("refreshpage");
    });
    fs.watchFile(path.join(__dirname, "../../frontend/src/js/bundle.js"), {
      interval: 500
    }, () => {
      io.send("refreshpage");
    });
    fs.watchFile(path.join(__dirname, "../../frontend/src/css/main.css"), {
      interval: 500
    }, () => {
      io.send("refreshcss");
    });
    
  }
})();

const app = fastify({
  trustProxy: true,
});


app.get("/dev", (req, res) => {
  if (dev) {
    res.send({dev: true});
  } else {
    res.send({dev: false});
  }
})


app.addHook("onRequest", (req, res, next) => {
  if (env === "development") {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.header("x-dev", "true")
  }
  console.log(`IP: ${req.headers["cf-connecting-ip"] || req.ip} Requested ${req.url}`);
  next();
});

app.register(fastifyStatic, {
  root: path.join(__dirname, "../../frontend/src"),
  wildcard: true,
});

app.setNotFoundHandler((req, res) => {
  res.header("Content-Type", "text/html");
  res.type("text/html");
  return res.status(404).send(fs.readFileSync(path.join(__dirname, "errors/404.html")));
});
app.listen(port, "0.0.0.0", () => console.log(`listening at http://localhost:${port}`));
 