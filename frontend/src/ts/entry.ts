/* eslint-disable @typescript-eslint/ban-ts-comment */
import $ from "jquery";
import axios from "axios"
window.$ = $;

(async () => {
  const devFetch = await axios.get("/dev");
  console.log(devFetch);
  // @ts-ignore
  $.fn.randomize = function(selector){
    (selector ? this.find(selector) : this).parent().each(function(){
      // @ts-ignore
      $(this).children(selector).sort(function(){
        return Math.random() - 0.5;
      }).detach().appendTo(this);
    });
    
    return this;
  };

  $(() => {
    $("html").css("background","none");
    $("main").fadeIn(400);
  });
  if (devFetch.data.dev === true || (window.location.hostname === "127.0.0.1" || 
      window.location.hostname === "localhost" || 
      window.location.hostname === "0.0.0.0"))
  { 
    window.dev = true;
    (await import("./modules/dev")).default();
  } else {
    window.dev = false;
  }
  (await import("./modules/typingAnim")).default();
  (await import("./modules/bg")).default();
  (await import("./modules/bgClick")).default();
  (await import("./modules/arc")).default();
  (await import("./modules/links")).default();
  (await import("./modules/subtitles")).default();
  (await import("./modules/darkreader")).default();
})();