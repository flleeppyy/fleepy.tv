import ws from "ws";
import fs from "fs";
import path from "path";
import { logger } from "./logger";
import http from "http";
import { randomUUID } from "crypto";

// export default () => {
//   const wsPort = 8081;
//   const io = new ws.Server({
//     port: wsPort,
//   });

//   logger.info(`Dev socket listening at ws://127.0.0.1:${wsPort}`);
//   io.once("listening", () => {
//     const files = [
//       {
//         path: "../frontend_fancy/src/index.html",
//         action: "refreshpage"
//       }, {
//         path: "../frontend_fancy/src/js/bundle.js",
//         action: "refreshpage"
//       }, {
//         path: "../frontend_fancy/src/css/main.css",
//         action: "refreshcss"
//       }, {
//         path: "../views/index.eta",
//         action: "refreshpage"
//       }, {
//         path: "../public/js/main.js",
//         action: "refreshpage"
//       }, {
//         path: "../public/css/styles.css",
//         action: "refreshcss"
//       }, {
//         path: "../public/js/logger.js",
//         action: "refreshpage"
//       }
//     ];

//     files.forEach(file => {
//       fs.watchFile(path.join(__dirname, file.path), {
//         interval: 500
//       }, () => {
//         io.clients.forEach(socket => socket.send(JSON.stringify(file)));
//       });
//     });

//     io.on("connection", (socket) => {
//       socket.send("hihi");
//     });
//   });
// }

// We will be creating an http server that can upgrade to a websocket connection, but http is for legacy reasons

export default function() {
  const wsPort = 8081;
  const httpServer = http.createServer();
  const io = new ws.Server({
    server: httpServer,
  });

  const watchingFiles: {
    id: string;
    relativePath: string;
    lastModified?: number;
    action: string;
  }[] = [];

  const items = [
    {
      folder: ["../public/js", "../views", "../layouts", "../partials"],
      action: "refreshpage"
    },
    {
      folder: ["../public/css", "../public/fonts"],
      action: "refreshcss"
    },
    {
      folder: "../public/img",
      action: "refreshimg",
    },
  ];

  io.once("listening", () => {
    logger.info(`Devsocket ws listening at ws://::1:${wsPort}`);
    items.forEach(item => {
      let folders = [];
      if (Array.isArray(item.folder)) {
        folders = item.folder;
      } else {
        folders = [item.folder];
      }

      folders.forEach(folder => {
        // for each file in the folder
        fs.readdir(path.join(__dirname, folder), (err, files) => {
          if (err) {
            logger.error(err);
            return;
          }
          files.forEach((file) => {
            // if the path is in public, we need to set the relative path to /
            // Ex: "..\public\js\example.js" => "/js/example.js"
            const relativePath = path.join(folder, file).replace(/\.\.\\public\\/g, "/").replace(/\\/g, "/");

            const fileInfo = {
              id: randomUUID(),
              relativePath,
              lastModified: Date.now(),
              action: item.action
            }
            watchingFiles.push(fileInfo);
            const filePath = path.join(folder, file);
            console.log(filePath)
            fs.watchFile(path.join(__dirname, filePath), {
              interval: 500
            }, () => {
              console.log(item);
              if (item.action == "refreshimg") {

                // The path to the image, most likely /img
                const relativePath = fileInfo.relativePath;

                // io.emit(`refreshimg<${relativePath}>`);
                io.clients.forEach(s => s.send(JSON.stringify({
                  action: "refreshimg",
                  relativePath
                })));
                return;
              }


              io.clients.forEach(s => s.send(JSON.stringify(item)));
            });
          });
        });
      });
    });

    io.on("connection", (socket) => {
      socket.send("hihi");
      socket.on("message", (data) => {
        const convertedData = data.toString();
        if (convertedData.startsWith("hewo! how are you?")) {
          socket.send("I'm fine, thanks!");
        }

        if (convertedData === "How's your day going?") {
          socket.send("It's going pretty okay, just kinda vibing");
        }
      })
    });

    
  });

  httpServer.on("request", (req, res) => {
    console.log(req.read(512));
    if (req.url == "/updates") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(watchingFiles));
      return;
    }

    res.writeHead(404);
    res.end();
  });
  httpServer.listen(wsPort, () => {
    logger.info(`Devsocket http listening at http://::1:${wsPort}`);
  });

}
