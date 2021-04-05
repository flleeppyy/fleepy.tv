export default (): void => {
  const darkReader = `<div id="anti-darkreader" style="display: none;">
  <div class="infobox" style="width: 24em">
  <h2>Hey!</h2>
  My site doesn't show well with dark reader, so if you want to see the nice colors and stuff, you should turn it off for this website then reload the page.
  <button onclick="$('#anti-darkreader').fadeOut(200)">Alright</button>
  </div>
  </div>`;
  const darkReaderCss = `<style>
  #anti-darkreader {
    display: flex; 
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 100000;
    background: black;
    .infobox {
      color: white;
      border-radius: 8px;
      button {
        padding: 4px;
      }
    }
  }</style>`;
  $(darkReader).prependTo($("body"));
  $(darkReaderCss).prependTo($("body"));
  
  let darkreaderint = 0;
  const darkreader = setInterval(() => {
    darkreaderint++;
    if (darkreaderint > 50) clearInterval(darkreader);
    if ($(".darkreader").length > 0) {
      $("#anti-darkreader").fadeIn(200);
      clearInterval(darkreader);
    }
  }, 200);
  
};