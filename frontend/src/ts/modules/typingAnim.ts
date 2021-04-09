import {startHue as startHue} from "./hue";
import Typed from "typed.js";

export default (): void => {
  const main = $("main");
  const parentBox = $("#parentBox");
  let paused = false;
  let pausedCount = 0;
  let fallback = false;
  new Typed("#typeThis", {
    strings: ["^200yarn start^100\r^200\n<strong>`yarn run v1.22.5`</strong>\r\n`$ tsc &amp;&amp; PORT=8001 ts-node .`\r\n^400 `listening at https://fleepy.tv\r\n`"],
    typeSpeed: 40,
    shuffle: true,
    onStringTyped: () => {
      main.fadeIn(400);
      $("#loadingContainer").fadeOut(400);
      parentBox.fadeIn(400);
      setTimeout(() => { // Avatar and text hue rotate
        if (fallback !== true) {
          startHue();
        }
        fallback = true;
        parentBox.css("max-width", "100%");
        // https://stackoverflow.com/questions/18143899/jquery-run-function-after-css-transition-is-done#18144024
        parentBox.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(event){ 
          parentBox.css("max-height", "100%");
          $(this).off(event);
        });
      }, 400);
    },
    onTypingPaused: () => {
      pausedCount++;
      console.log(pausedCount);

      if (paused !== true && pausedCount === 2) {
        $("#process").html("yarn*");
        // console.log('set to yarn typing paused')
        paused = true;
      }
    }
  });
  
  
  $(document).on("keydown", e => {
    if (e.key === " ") {
      if (fallback === true) return;
      fallback = true;
      startHue();
      parentBox.css("transition", "none");
      $("#loadingContainer").fadeOut(100);
      main.fadeIn(100);
      parentBox.css("max-width", "100%");
      parentBox.css("max-height", "100%");
    }
  });
  return;
};