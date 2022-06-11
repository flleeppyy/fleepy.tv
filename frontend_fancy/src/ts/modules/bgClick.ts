export default () => {
  console.log(this);
  const parentBox = $("#parentBox");
  const bgNotice = $("#backgroundOnlyNotice");
  $("#chen").on("click", function (e) {
    if (e.ctrlKey) {
      bgNotice.fadeIn(400);
      setTimeout(() => {
        bgNotice.fadeOut(400);
      }, 1100);
      return parentBox.fadeOut(200);
    }
    //@ts-ignore
    // $("links").randomize("button");
    randomizeChildren(document.querySelector("links"));
  });

  // let isMouseDown = false
  // $("#chen").on("mousedown", (e) => {
  //   isMouseDown = true;
  //   setTimeout(() => {
  //     if (isMouseDown) {
  //       bgNotice.fadeIn(400)
  //       setTimeout(() => {
  //         bgNotice.fadeOut(400)
  //       },1100)
  //       return parentBox.fadeOut(200)
  //     }
  //   }, 1000)
  // })
  // $("#chen").on("mouseup", (e) => {
  //   isMouseDown = false
  // })

  document.querySelector("main").onmousedown = () => {
    if (parentBox.css("display") === "none") {
      parentBox.fadeIn(200);
    }
  };

  document.onkeydown = event => {
    // if the key is alphanumerical, or space, fadeIn

    if (event.key.match(/[a-zA-Z0-9 ]/) && parentBox.css("display") === "none") {
      parentBox.fadeIn(200);
    }
    //
  };
};
