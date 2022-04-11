import ws from "ws";
import fs from "fs";
import path from "path";
import { logger } from "./logger";
import http from "http";

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
    logger.info(`Dev socket listening at http://::1:${wsPort}`);
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
            const filePath = path.join(__dirname, folder, file);
            const fileInfo = {
              relativePath: path.join(folder, file),
              lastModified: Date.now(),
              action: item.action
            }
            files.push();
            fs.watchFile(filePath, {
              interval: 500
            }, () => {
              if (item.action == "refreshimg") {

                // The path to the image, most likely /img
                const relativePath = path.join(folder, file);

                io.emit(`refreshimg<${relativePath}>`);
                return;
              }


              io.emit(item.action);
            });
          });
        });
      });
    });

    io.on("connection", (socket) => {
      socket.send("hihi");
    });

  });

  // Now for the http server


  httpServer.on("request", (req, res) => {
    if (req.url == "/updates") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(watchingFiles));
    }
  });



  httpServer.listen(wsPort);
}
