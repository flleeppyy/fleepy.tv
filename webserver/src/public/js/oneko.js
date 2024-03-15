const b64toBlob = (base64, type = "application/octet-stream") =>
  fetch(`data:${type};base64,${base64}`).then(res => res.blob());
(function oneko() {
  const nekoEl = document.createElement("div");

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;

  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) {
    return;
  }

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  // Custom stuff
  let nekoSpeed = 10;
  let defaultNekoSpeed = 10;
  let idleTripped = false;
  let treats = []; // Array of divs representing treats
  let treatsEaten = 0;
  let treatBlobUrl;
  let showingAffection = false;

  const nekoSites = [
    "adryd.com",
    "localhost",
    "c7.pm",
    "fade.nya.rest",
    "fleepy.tv",
    "maia.crimew.gay",
    "spookyghost.zone",
    "noelle.df1.dev",
    "www.kibty.town",
    "kibty.town",
    "avasilver.dev",
    "tris.fyi", 
    "breq.dev",
    "oon.nz"
  ];

  try {
    const searchParams = location.search
      .replace("?", "")
      .split("&")
      .map((keyvaluepair) => keyvaluepair.split("="));
    // This is so much repeated code, I don't like it
    tmp = searchParams.find((a) => a[0] == "catx");
    if (tmp && tmp[1]) nekoPosX = parseInt(tmp[1]);
    tmp = searchParams.find((a) => a[0] == "caty");
    if (tmp && tmp[1]) nekoPosY = parseInt(tmp[1]);
    tmp = searchParams.find((a) => a[0] == "catdx");
    if (tmp && tmp[1]) mousePosX = parseInt(tmp[1]);
    tmp = searchParams.find((a) => a[0] == "catdy");
    if (tmp && tmp[1]) mousePosY = parseInt(tmp[1]);
  } catch (e) {
    console.error("oneko.js: failed to parse query params.");
    console.error(e);
  }

  function onClick(event) {
    let target;
    if (event.target.tagName === "A" && event.target.getAttribute("href")) {
      target = event.target;
    } else if (
      event.target.tagName == "IMG" &&
      event.target.parentElement.tagName === "A" &&
      event.target.parentElement.getAttribute("href")
    ) {
      target = event.target.parentElement;
    } else {
      return;
    }
    let newLocation;
    try {
      newLocation = new URL(target.href);
    } catch (e) {;
      return;
    }
    if (!nekoSites.includes(newLocation.host) || newLocation.pathname != "/")
      return;
    newLocation.searchParams.append("catx", Math.floor(nekoPosX));
    newLocation.searchParams.append("caty", Math.floor(nekoPosY));
    newLocation.searchParams.append("catdx", Math.floor(mousePosX));
    newLocation.searchParams.append("catdy", Math.floor(mousePosY));
    event.preventDefault();
    window.location.href = newLocation.toString();
  }
  document.addEventListener("click", onClick);


  fetch(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoUlEQVQ4T42TLQ6AMAyFN0eC5RRguBoeiedqGDgFlgQ3UtGlK6/d6rbuff1dDA22T0Nazjuip/BSPiQxnxHEBZB47t/MO54uaIgJ0GKmaAgEWGIE+QG0eL1S2MZ/HM6k8NQiy+YSgCwDvMgoiyIDLzKJyWQZspGR5yzH5e0WnEJr7e4e1CBIXDSRDq3LI0us7oEVmSHmJnofyM2And4XloAPYApt3qtwL7wAAAAASUVORK5CYII=",
  ).then(res => {
    res.blob().then(blob => {
      treatBlobUrl = window.URL.createObjectURL(blob);
    });
  });

  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function create() {
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.backgroundImage = "url('../img/oneko.gif')";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = Number.MAX_VALUE;

    document.body.appendChild(nekoEl);

    document.onmousemove = event => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    let resetMouseMovementsTimeout;
    const resetMouseMovements = () => {
      mousemovements.length = 0;
      clearTimeout(resetMouseMovementsTimeout);
    };

    const mousemovements = [];
    nekoEl.onmousemove = function (ev) {
      const { x, y } = getOffset(ev);
      if (showingAffection) {
        return;
      }
      mousemovements.push([x, y]);
      clearTimeout(resetMouseMovementsTimeout);
      resetMouseMovementsTimeout = setTimeout(resetMouseMovements, 1000);
      if (mousemovements.length > 64) {
        // Calculate if the x coordinates in the array are very vigerous

        showAffection();
        mousemovements.length = 0;
      }
    };

    const speedValue = 1000 / nekoSpeed;

    window.onekoInterval = setInterval(frame, speedValue);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  window.setOnekoSpeed = function (speed) {
    nekoSpeed = speed;
    if (!idleTripped) {
      clearInterval(window.onekoInterval);
      window.onekoInterval = setInterval(frame, 1000 / speed);
    }
  };

  function getOffset(evt) {
    var el = evt.target,
      x = 0,
      y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }

    x = evt.clientX - x;
    y = evt.clientY - y;

    return { x: x, y: y };
  }

  let affectionAnimationFrame = 0;
  let affectionIdle = 0;
  // Creates a new heart element to thje top right of the neko
  function showAffection() {
    if (showingAffection) {
      return;
    }
    showingAffection = true;
    // Create a new div element inside nekoEl
    const nekoAffectionEl = document.createElement("div");
    nekoAffectionEl.style.position = "absolute";
    nekoAffectionEl.style.top = "-4px";
    nekoAffectionEl.style.left = "24px";
    nekoAffectionEl.style.width = "24px";
    nekoAffectionEl.style.height = "24px";
    // background is a spritesheet, all one row, 12 frames.
    nekoAffectionEl.style.backgroundImage =
      " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAAYCAMAAABtA9DGAAAAD1BMVEUAAAAAAAD/ExP/yMi7ExMAQYTfAAAAAXRSTlMAQObYZgAAARVJREFUWMPtWMsOwzAIw+T/Pzllh2VTWuGtVV574ENVWS0mhAKNSCAQGAh8gL6V6xl+OjRy5DMyyM8I7Hh7yy/IrEkBQrUwawgQsfNVAYKY4FhRUDHPlUGwe/IRCsYzO1x3bQ2CG14UTK8VVBdNaaCNHjmsAOVbqMA+iF4802V+jg/Q3SFHeVVbtot+dgyQKn1TmUGlMkosn7lndqgu95OuK+agWV0Mfq9F2kRE86HFJNnKhuRdm6/4XZv3eWaH6nI/xxdpM1VH17K6fg4vQUyX+DljDiJTB5I4+yhJtmM+dOSZ7gs/x/+LkX2xnJd0MqrbNHPPG+ggydv3bvwPHHf4qX49EFh9BDL/L+EaH+dBgUDgb3ADb7yGY51HfjMAAAAASUVORK5CYII=')";
    nekoAffectionEl.style.imageRendering = "pixelated";

    // Heart animation
    const interval = setInterval(() => {
      if (affectionIdle > 0) {
        affectionIdle -= 1;
        return;
      }
      nekoAffectionEl.style.backgroundPosition = `${affectionAnimationFrame * 24}px 0px`;
      affectionAnimationFrame += 1;
      if (affectionAnimationFrame > 11) {
        affectionAnimationFrame = 0;
        nekoAffectionEl.style.backgroundPosition = "0px 0px";
        clearInterval(interval);
        showingAffection = false;
      }

      if (affectionAnimationFrame == 8) {
        affectionIdle = 5;
      }
    }, 100);
    nekoEl.appendChild(nekoAffectionEl);
  }

  function frame() {
    frameCount += 1;
    let toTreat = false;
    let posX;
    let posY;
    // Before checking where the mouse is, check if there are any treats
    if (treats.length > 0) {
      toTreat = true;
      // Get the first treat
      const treat = treats[0];
      // Get the position of the treat
      const treatPos = [treat.style.left.slice(0, -2), treat.style.top.slice(0, -2)];
      posX = treatPos[0];
      posY = treatPos[1];
    } else {
      posX = mousePosX;
      posY = mousePosY;
    }

    const diffX = nekoPosX - posX;
    const diffY = nekoPosY - posY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || (toTreat ? distance < 12 : distance < 48)) {
      if (treats.length > 0) {
        const treat = treats[0];
        treat.remove();
        treats.splice(0, 1);
        treatsEaten += 1;
        // document.getElementById("eaten").innerHTML = eaten;
      }
      idle();
      // If the idleTime is greater than 0
      if (idleTime > 1 && !idleTripped) {
        idleTripped = true;
        clearInterval(window.onekoInterval);
        window.onekoInterval = setInterval(frame, 1000 / defaultNekoSpeed);
      }

      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }
    //   If we are no longer idling, set the interval back to nekoSpeed
    if (idleTripped) {
      idleTripped = false;
      clearInterval(window.onekoInterval);
      window.onekoInterval = setInterval(frame, 1000 / nekoSpeed);
    }

    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    // nekoPosX -= (diffX / distance) * nekoSpeed;
    // nekoPosY -= (diffY / distance) * nekoSpeed;

    // If the neko's scale is bigger, we must adjust the speed
    // to make sure it moves at the correct speed.
    const scale = parseFloat(nekoEl.style.transform.substring(6, nekoEl.style.transform.length - 1)) || 1;
    nekoPosX -= (diffX / distance) * (nekoSpeed * scale);
    nekoPosY -= (diffY / distance) * (nekoSpeed * scale);

    // nekoPosX -= (diffX / distance) * (nekoSpeed * 0.75);
    // nekoPosY -= (diffY / distance) * (nekoSpeed * 0.75);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  function placeTreat(x, y) {
    const treat = document.createElement("div");
    treat.className = "oneko-treat";
    treat.style.left = `${x}px`;
    treat.style.top = `${y}px`;
    treat.style.backgroundImage = `url(${treatBlobUrl})`;
    document.body.appendChild(treat);
    treats.push(treat);
  }

  function resize(num) {
    const scaleFactor = 0.2;
    const scale = num * scaleFactor - scaleFactor + 1;

    nekoEl.style.transform = `scale(${scale})`;
    treats.forEach(treat => {
      treat.style.transform = `scale(${scale})`;
    });
  }

  create();

  document.addEventListener("keyup", event => {
    // if the key is "t"
    if (event.key === "t") {
      placeTreat(mousePosX, mousePosY);
    }
  });

  const body = document.querySelector(".body");

  const hrefElement = document.createElement("a");
  hrefElement.href = "javascript:void(0)";
  hrefElement.innerText = "just let me play with the cat";
  hrefElement.classList.add("link");
  hrefElement.addEventListener("click", () => {
    body.classList.toggle("hidden");
  });

  const div = document.createElement("div");
  div.appendChild(hrefElement);
  div.classList.add("topmargin");
  div.style.textAlign = "center";
  body.appendChild(div);

  // Create a new number tick box and append it to a div called "onekoSettings"
  // The number tick box will be called "nekoSpeed" and will be set to the value of the global variable "nekoSpeed"

  const onekoSettings = document.createElement("div");
  onekoSettings.classList.add("onekoSettings");
  onekoSettings.style.textAlign = "center";

  const onekoHeader = document.createElement("h2");
  onekoHeader.innerText = "Oneko Settings";

  // Create a subtitle that says "Oneko port by Adryd", with an anchor link
  const adrydLink = document.createElement("a");
  adrydLink.href = "https://github.com/adryd325/oneko.js/";
  adrydLink.innerText = "Oneko port by Adryd";
  adrydLink.classList.add("link");

  const speedInput = document.createElement("input");
  speedInput.type = "number";
  speedInput.min = "1";
  speedInput.max = "100";
  speedInput.step = "1";
  speedInput.id = "nekoSpeed";
  speedInput.onchange = () => {
    setOnekoSpeed(Number(speedInput.value));
  };
  speedInput.value = nekoSpeed.toString();

  // Prepend labels before the input
  const speedLabel = document.createElement("label");
  speedLabel.innerText = "Neko Speed";
  speedLabel.htmlFor = "nekoSpeed";

  const sizeInput = document.createElement("input");
  sizeInput.type = "number";
  sizeInput.min = "1";
  sizeInput.max = "64";
  sizeInput.step = "1";
  sizeInput.value = "1";
  sizeInput.id = "nekoSize";
  sizeInput.onchange = () => {
    resize(Number(sizeInput.value));
  };

  // Resets neko settings
  const resetNeko = document.createElement("button");
  resetNeko.innerText = "Reset\nNeko";
  resetNeko.onclick = () => {
    setOnekoSpeed(defaultNekoSpeed);
    resize(1);

    sizeInput.value = "1";
    speedInput.value = defaultNekoSpeed;
  };

  // Prepend labels before the input
  const sizeLabel = document.createElement("label");
  sizeLabel.innerText = "Neko Size";
  sizeLabel.htmlFor = "nekoSize";

  const unhidePage = document.createElement("button");
  unhidePage.innerText = "Unhide Page";
  unhidePage.onclick = () => {
    body.classList.remove("hidden");
    onekoSettings.classList.add("hidden");
  };

  const placeTreatButton = document.createElement("button");
  placeTreatButton.innerText = "Place Treats";
  placeTreatButton.mode = false;
  const placeTreatButtonMouseUp = () => {
    // if the element that the mouse is hovering over is a button

    if (placeTreatButton.mode && placeTreatButton.tripped == false) {
      placeTreat(mousePosX, mousePosY);
    }
  };

  placeTreatButton.onmousedown = e => {
    e.preventDefault();
    placeTreatButton.tripped = true;

    if (placeTreatButton.mode) {
      placeTreatButton.innerText = "Place Treats";
      placeTreatButton.mode = false;
      document.removeEventListener("mouseup", placeTreatButtonMouseUp);
    } else {
      placeTreatButton.innerText = "Stop Placing treats";
      document.addEventListener("mouseup", placeTreatButtonMouseUp);
      placeTreatButton.mode = true;
    }
    setTimeout(() => (placeTreatButton.tripped = false), 200);
  };

  const br = () => document.createElement("br");
  const children = [
    onekoHeader,
    adrydLink,
    br(),

    speedLabel,
    speedInput,
    br(),
    sizeLabel,
    sizeInput,
    br(),
    resetNeko,
    placeTreatButton,
    unhidePage,
  ];

  children.forEach(child => onekoSettings.appendChild(child));

  onekoSettings.classList.add("hidden");

  // When the "hidden" class is added to the body, remove "hidden" from onekoSettings
  // Use mutaitonobserver
  const mut = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.target.classList.contains("hidden")) {
        onekoSettings.classList.remove("hidden");
      } else {
        onekoSettings.classList.add("hidden");
      }
    });
  });

  mut.observe(body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  document.body.appendChild(onekoSettings);
})();
