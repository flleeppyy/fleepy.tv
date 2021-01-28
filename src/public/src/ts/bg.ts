// Source of script: https://bashooka.com/coding/web-background-animation-effects/
// Heavily modified

let background = <HTMLCanvasElement>document.getElementById("bgCanvas"),
bgCtx = <CanvasRenderingContext2D>background.getContext("2d"),
width = window.innerWidth,
height = window.innerHeight;

background.width = width;
background.height = height;
let entities: any = [];

bgCtx.fillStyle = '#1e1429';
bgCtx.fillRect(0, 0, width, height);

class Star {
  size: number;
  speed: number;
  x: number;
  y: number;
  color: string;
  
  constructor(options: any) {
    this.size = Math.random() * 2;
    this.speed = Math.random() * 1;
    this.x = options.x;
    this.y = options.y;
    // @ts-ignore
    this.color = w3color(`hsl(${Math.floor(Math.random() * 360)},100%,80%)`).toHexString()    
  }
  
  update: Function = () => {
    this.x -= this.speed;
    // this.y += 0.1
    if (this.x < 0) {
      this.reset();
    } else {
      bgCtx.fillRect(this.x, this.y, this.size, this.size);
      bgCtx.fillStyle = this.color
    }
  }
  
  reset: Function = () => {
    this.size = Math.random() * 2;
    this.speed = Math.random() * 1;
    this.x = width;
    this.y = Math.random() * height;
  }
}


class ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  size: number;
  waitTime: number;
  active: Boolean;

  constructor() {
    this.x = Math.random() * width;
    this.y = 0;
    this.len = (Math.random() * 80) + 20;
    this.speed = (Math.random() * 10) + 6;
    this.size = (Math.random() * 1) + 0.1;
    // this is used so the shooting stars arent constant
    this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
    this.active = false;
    this.reset()
  }

  reset: Function = () => {
    this.x = Math.random() * width;
    this.y = 0;
    this.len = (Math.random() * 80) + 20;
    this.speed = (Math.random() * 10) + 6;
    this.size = (Math.random() * 1) + 0.1;
    this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
    this.active = false;
  }

  update: Function = () => {
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
}

// init the stars
for (let i = 0; i < height; i++) {
  entities.push(new Star({
    x: Math.random() * width,
    y: Math.random() * height
  }));
}

// Add 2 shooting stars that just cycle.
// entities.push(new ShootingStar());
// entities.push(new ShootingStar());

//animate background
const animate = () => {
  bgCtx.fillStyle = '#1e1429';
  bgCtx.fillRect(0, 0, width, height);
  
  let entLen = entities.length;
  
  while (entLen--) {
    entities[entLen].update();
  }
  requestAnimationFrame(animate);
}
animate()

$(window).on('resize', () => {
  height = window.innerHeight;
  width = window.innerWidth;
  background.width = width
  background.height = height
  bgCtx.fillRect(0, 0, width, height);
  entities = [];
  // entities.push(new ShootingStar());
  // entities.push(new ShootingStar());
  
  for (let i = 0; i < height; i++) {
    entities.push(new Star({
      x: Math.random() * width,
      y: Math.random() * height
    }));
  }
  // animate()
})