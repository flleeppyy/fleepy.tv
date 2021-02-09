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