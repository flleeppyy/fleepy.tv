"use strict"

const logger = new Logger({
  useDefaultColoring: false
});

async function checkDev() {
  const checkDev = await (await fetch("/dev")).text();

  if (checkDev == "1") {
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
          socket.send("hewo! how are you?")
          return;
        }

        if (ev.data.startsWith("I'm fine")) {
          socket.send("How's your day going?")
        }

        if (ev.data.startsWith("It's going pretty okay")) {
          socket.send("noice");
        }

        try {
          const data = JSON.parse(ev.data);
          if (data.action === "refreshpage") {
            logger.info("Refreshing page");
            window.location.reload();
          } else if (data.action === "refreshcss") {
            logger.info("Refreshing css");
            stylesheet.href = window.URL.createObjectURL(await (await fetch("/css/styles.css")).blob());
          } else if (data.action === "refreshimg") {
            data.relativePath;
            logger.info("Refreshing img");
            // get img that starts with relativePath
            const img = document.querySelector(`img[src^="${data.relativePath}"]`);
            // append some random parameter to the src to force a reload
            const url = new URL(img.src);
            url.searchParams.set("rand", Math.floor(Math.random() * 1800));

            
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