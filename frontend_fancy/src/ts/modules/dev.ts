export default async (): Promise<void> => {
  const checkDev = await (await fetch("/dev")).text();

  if (checkDev === "1") {
    let cssBlob = await (await fetch("/css/styles.css")).blob();
    const stylesheet: HTMLLinkElement = document.querySelector("link[id='stl']");
    stylesheet.href = URL.createObjectURL(cssBlob);
    let socket;
    let socketRetrys = 0;
    let maxSocketRetrys = 10;
    // @ts-expect-error
    function initSocket() {
      socket = new WebSocket("ws://127.0.0.1:8081");
      let open = false;

      socket.onerror = function (ev) {
        console.error(ev);
      };

      socket.onmessage = async function (ev) {
        if (!open && ev.data == "hihi") {
          open = true;
          console.info("Socket connected");
          return;
        }
        try {
          const data = JSON.parse(ev.data);
          if (data.action === "refreshPage") {
            console.info("Refreshing page");
            window.location.reload();
          } else if (data.action === "refreshCss") {
            console.info("Refreshing css");
            stylesheet.href = window.URL.createObjectURL(await (await fetch("css/main.css")).blob());
          }
        } catch (e) {
          console.error(e);
        }
      };
      socket.onclose = function (ev) {
        // if the page is reloading
        if (ev.code == 1001) {
          return;
        }
        if (socketRetrys > maxSocketRetrys) {
          console.error("Socket closed. Reached max attempts (" + maxSocketRetrys + ")");
          return;
        }
        console.warn("Socket closed. Reconnecting...");
        setTimeout(initSocket, 2000);
      };
    }
    initSocket();
  }
};
