import $ from "jquery";
window.$ = $;

// Randomize children of a DOM element, and make sure their places are not the same
window.randomizeChildren = function (element: HTMLElement) {
  const children = Array.from(element.children);
  if (children.length === 0) {
    return;
  }

  const randomChildren = children.sort(() => Math.random() - 0.5);
  // if there is a child that has the same place as the previous one, move it to the end
  const lastChild = randomChildren.pop();
  if (lastChild && lastChild.compareDocumentPosition(randomChildren[0]) === 0) {
    randomChildren.push(lastChild);
  }
  randomChildren.forEach(child => element.appendChild(child));
};

(async () => {
  $(() => {
    $("html").css("background", "none");
    $("main").fadeIn(400);
  });
  (await import("./modules/typingAnim")).default();
  (await import("./modules/hue")).default();
  (await import("./modules/bg")).default();
  (await import("./modules/bgClick")).default();
  (await import("./modules/arc")).default();
  (await import("./modules/links")).default();
  (await import("./modules/subtitles")).default();
  (await import("./modules/dev")).default();
})();
