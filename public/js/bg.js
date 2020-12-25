(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1 / 60);
  };
  window.requestAnimationFrame = requestAnimationFrame;
})();

// Terrain stuff.
var background = document.getElementById("bgCanvas"),
  bgCtx = background.getContext("2d"),
  width = window.innerWidth,
  height = window.innerHeight;

// (height < 400) ? height = 400 : height;

background.width = width;
background.height = height;

// Second canvas used for the stars
bgCtx.fillStyle = '#1e1429';
bgCtx.fillRect(0, 0, width, height);

// stars
function Star(options) {
  this.size = Math.random() * 2;
  this.speed = Math.random() * 1;
  this.x = options.x;
  this.y = options.y;
  this.color = w3color(`hsl(${Math.floor(Math.random() * 360)},100%,80%)`).toHexString()
}

Star.prototype.reset = function() {
  this.size = Math.random() * 2;
  this.speed = Math.random() * 1;
  this.x = width;
  this.y = Math.random() * height;
}

Star.prototype.update = function() {
  this.x -= this.speed;
  // this.y += 0.1
  if (this.x < 0) {
    this.reset();
  } else {
    bgCtx.fillRect(this.x, this.y, this.size, this.size);
    bgCtx.fillStyle = this.color
  }
}

function ShootingStar() {
  this.reset();
}

ShootingStar.prototype.reset = function() {
  this.x = Math.random() * width;
  this.y = 0;
  this.len = (Math.random() * 80) + 20;
  this.speed = (Math.random() * 10) + 6;
  this.size = (Math.random() * 1) + 0.1;
  // this is used so the shooting stars arent constant
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
  
}

ShootingStar.prototype.update = function() {
  if (this.active) {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.x < 0 || this.y >= height) {
      this.reset();
    } else {
      bgCtx.lineWidth = this.size;
      bgCtx.beginPath();
      bgCtx.moveTo(this.x, this.y);
      bgCtx.lineTo(this.x + this.len, this.y - this.len);
      bgCtx.stroke();
    }
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
}

var entities = [];

// init the stars
for (var i = 0; i < height; i++) {
  entities.push(new Star({
    x: Math.random() * width,
    y: Math.random() * height
  }));
}

// Add 2 shooting stars that just cycle.
// entities.push(new ShootingStar());
// entities.push(new ShootingStar());

//animate background
function animate() {
  bgCtx.fillStyle = '#1e1429';
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';
  
  var entLen = entities.length;

  while (entLen--) {
    entities[entLen].update();
  }
  requestAnimationFrame(animate);
}
animate()

$(window).resize(() => {
  height = window.innerHeight;
  width = window.innerWidth;
  background.width = width
  background.height = height
  bgCtx.fillRect(0, 0, width, height);
  entities = [];
  // entities.push(new ShootingStar());
  // entities.push(new ShootingStar());

  for (var i = 0; i < height; i++) {
    entities.push(new Star({
      x: Math.random() * width,
      y: Math.random() * height
    }));
  }
  // animate()
})