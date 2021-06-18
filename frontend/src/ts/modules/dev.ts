import io from "socket.io-client";

export default (): void => {
  console.warn("INFO | Dev enabled")
  const socketLocation = `http://${window.location.hostname}:8081`
  const socket = io(socketLocation);
  const style = $("<style></style>").appendTo("head");
  console.log("INFO | socket location: " + socketLocation)
  fetchCss();
  function fetchCss() {
    $.get("/css/main.css", (data) => {
      style.html(data);
    });
  }
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
};