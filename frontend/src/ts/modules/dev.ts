import io from "socket.io-client";

export default (): void => {
  const socket = io("http://127.0.0.1:8081");
  const style = $("<style></style>").appendTo("head");
  
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