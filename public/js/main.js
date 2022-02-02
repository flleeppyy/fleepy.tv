"use strict"

const logger = new Logger({
  useDefaultColoring: false
});

async function checkDev() {
  const checkDev = (await fetch("/dev")).text()
  
  if (checkDev) {
    let cssBlob = await (await fetch("/css/styles.css")).blob();
    const stylesheet = document.querySelector("link[id='stl']");
    stylesheet.href = URL.createObjectURL(cssBlob);
    let socket;
    let socketRetrys = 0;
    let maxSocketRetrys = 10;
    function initSocket() {
      socket = new WebSocket("ws://127.0.0.1:8081");
      let open = false;
      
      socket.onerror = function(ev) {
        logger.error(ev)
      }
      
      socket.onmessage = async function(ev) {
        if (!open && ev.data == "hihi") {
          open = true;
          logger.info("Socket connected");
          return;
        }
        try {
          const data = JSON.parse(ev.data);
          if (data.action === "refreshPage") {
            logger.info("Refreshing page");
            window.location.reload();
          } else if (data.action === "refreshCss") {
            logger.info("Refreshing css");
            stylesheet.href = window.URL.createObjectURL(await (await fetch("/css/styles.css")).blob());
          }
        } catch (e) {
          logger.error(e);
        }
      }
      socket.onclose = function(ev) {
        // if the page is reloading
        if (ev.code == 1001) {
          return;
        }
        if (socketRetrys > maxSocketRetrys) {
          logger.error("Socket closed. Reached max attempts (" + maxSocketRetrys + ")");
          return;
        }
        logger.warn("Socket closed. Reconnecting...");
        setTimeout(initSocket, 2000);
      }
    }
    initSocket();
  }
}
checkDev();