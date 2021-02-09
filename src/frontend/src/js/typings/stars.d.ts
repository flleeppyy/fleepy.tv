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