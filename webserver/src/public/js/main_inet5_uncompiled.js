// Script that is compatible with Internet Explorer 5.0 + Polyfills

var logger = new Logger({
  useDefaultColoring: false
});

function checkDev() {
  // new XHR
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/dev", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText == "1") {
      var actions = {
        refreshpage: function() {
          logger.info("Refreshing page");
          window.location.reload();
        },
        refreshcss: function() {
          logger.info("Refreshing css");
          var stylesheets = document.querySelectorAll("link[id='stl']");
          // for (var i = 0; i < stylesheets.length; i++) {
          //   // To trigger a refetch, we're going to add some garbage to the url params

          //   // If there is already a ? in the url, we're going to add on to it
          //   if (stylesheets[i].href.indexOf("?") > -1) {
          //     stylesheets[i].href = stylesheets[i].href + Math.random();
          //   } else {
          //     stylesheets[i].href = stylesheets[i].href + "?garbage=" + Math.floor(Math.random() * 150);
          //   }
          // }
          // rewrite using es6
          stylesheets.forEach(stylesheet => {
            if (stylesheet.href.includes("?")) {
              stylesheet.href = stylesheet.href + Math.floor(Math.random() * 150);
            } else {
              stylesheet.href = stylesheet.href + "?garbage=" + Math.floor(Math.random() * 150);
            }
          });
        },
        refreshimg: function(img) {
          logger.info("Refreshing image");
          // search for image that starts with img
          var images = document.querySelectorAll("img[src^='" + img + "']");
          images.forEach(image => {
            // To trigger a refetch, we're going to add some garbage to the url params

            // If there is already a ? in the url, we're going to add on to it
            if (image.src.includes("?")) {
              image.src = image.src + Math.random();
            } else {
              image.src = image.src + "?garbage=" + Math.floor(Math.random() * 150);
            }
          })
        }
      }

      setInterval(function() {

      })
    }
  }
}