// Source of script: https://bashooka.com/coding/web-background-animation-effects/
// Heavily modified

import color from "color";

// Im making these functions because im fucking lazy
Number.prototype.toPrecisionFloat = function(num: number = 2) {
// @ts-ignore
  return parseFloat(this.valueOf().toPrecision(num))
}

// also theres probably a better way to do this but.. fuck u lol
Number.prototype.toInt = function() {
  // @ts-ignore
  return parseFloat(this.valueOf().toFixed())
}

export default (): void => {
  const background = document.getElementById("bgCanvas") as HTMLCanvasElement;
  const bgCtx = background.getContext("2d") as CanvasRenderingContext2D;
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  background.width = width;
  background.height = height;
  let entities: Array<Star> = [];
  // @ts-ignore
  window.entities = entities;
  // @ts-ignore
  window.bgCtx = bgCtx;
  
  bgCtx.fillStyle = "#1e1429";
  bgCtx.fillRect(0, 0, width, height);
  
  class Star {
    size: number;
    speed: number;
    x: number;
    y: number;
    color: string;
    
    constructor(options: { x: any; y: any; }) {
      this.size = (Math.random() * 2).toPrecisionFloat();
      this.speed = (Math.random()).toPrecisionFloat()
      this.x = options.x.toPrecisionFloat();
      this.y = options.y.toPrecisionFloat(3);
      this.color = color(`hsl(${Math.floor(Math.random() * 360)},100%,80%)`).string();
    }
    
    update = () => {
      this.x -= this.speed;
      // this.y += 0.1
      if (this.x < 0) { 
        this.reset();
      } else {
        // bgCtx.fillRect(this.x, this.y, this.size, this.size);
        // bgCtx.fillStyle = this.color;
        // fill circle
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        bgCtx.fillStyle = this.color;
        bgCtx.fill();
      }
    }
    
    reset = () => {
      this.size = (Math.random() * 2).toPrecisionFloat();
      this.speed = (Math.random() * 1).toPrecisionFloat();
      this.x = width.toPrecisionFloat();
      this.y = (Math.random() * height).toPrecisionFloat(2);
    }
  }
  
  
  class ShootingStar {
    x: number;
    y: number;
    len: number;
    speed: number;
    size: number;
    waitTime: number;
    active: boolean;
    
    constructor() {
      this.x = Math.random() * width;
      this.y = 0;
      this.len = (Math.random() * 80) + 20;
      this.speed = (Math.random() * 10) + 6;
      this.size = (Math.random() * 1) + 0.1;
      // this is used so the shooting stars arent constant
      this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
      this.active = false;
      this.reset();
    }
    
    reset = () => {
      this.x = Math.random() * width;
      this.y = 0;
      this.len = (Math.random() * 80) + 20;
      this.speed = (Math.random() * 10) + 6;
      this.size = (Math.random() * 1) + 0.1;
      this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
      this.active = false;
    }
    
    update = () => {
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
    bgCtx.fillStyle = "#1e1429";
    bgCtx.fillRect(0, 0, width, height);
    
    let entLen = entities.length;
    
    while (entLen--) {
      entities[entLen].update();
    }
    requestAnimationFrame(animate);
  };
  animate();
  
  window.addEventListener("resize", () => {
    height = window.innerHeight;
    width = window.innerWidth;
    background.width = width;
    background.height = height;
    bgCtx.fillRect(0, 0, width, height);
    

    // good enough but it wont really do.
    for (let i = 0; i < height; i++) {
      try {
        entities[i].x += (width - window.innerWidth) / 2;
        entities[i].y += (height - window.innerHeight) / 2;
      } catch(e) {}
    }  
  });
};