/* eslint-disable @typescript-eslint/ban-ts-comment */
import $ from "jquery";

window.$ = $;

(async () => {

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
  // (await import ("./dev")).default();
  (await import("./modules/typingAnim")).default();
  (await import("./modules/bg")).default();
  (await import("./modules/bgClick")).default();
  (await import("./modules/arc")).default();
  (await import("./modules/links")).default();
  (await import("./modules/subtitles")).default();
  (await import("./modules/darkreader")).default();
})();