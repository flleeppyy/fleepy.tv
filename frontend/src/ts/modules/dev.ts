import io from "socket.io-client";

export default async (): Promise<void> => {
  const devFetch = parseInt(await (await fetch("/dev")).text()); 
  if (devFetch) { 
    window.dev = true;
    console.info("INFO | Dev enabled")
    const socketLocation = `http://${window.location.hostname}:8081`
    const socket = io(socketLocation);
    const style = $("<style></style>").appendTo("head");
    console.info("INFO | Socket location: " + socketLocation)

    let fetchCss = async () => {
      // $.get("/css/main.css", (data) => {
      //   style.html(data);
      // });
      const data = await (await fetch("/css/main.css")).text();
      style.html(data)
    }
    fetchCss();
    socket.on("connect", () => {
      console.log("Connected!");
    });
    
    socket.on("message", (msg: string) => {
      if (msg === "refreshpage") {
        window.location.reload();
      }
      if (msg === "refreshcss") {
        fetchCss();
      }
    });
  } else {
    window.dev = false;
  }
};