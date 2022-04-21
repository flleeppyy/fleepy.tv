import net from "node:net";

const server = net.createServer();

server.on("connection", (connection) => {
  console.log("client connected");
  connection.on("data", (data) => {
    console.log(data.toString());
  });
  const data = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
  <HTML><HEAD>
  <META content="text/html; charset=windows-1252" http-equiv=Content-Type></HEAD>
  <BODY><h1>hiiii</h1></BODY></HTML>
  `
  connection.write(`HTTP/1.1 200 OK\nContent-Type: text/html\n\n${data}`, "utf8");
  connection.end();
})

server.listen(1337);

