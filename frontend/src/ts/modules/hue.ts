export class Hsl {
  hue: number;
  saturation: number;
  lightness: number;
  
  constructor(hue:number, saturation:number, lightness:number) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    if (this.hue > 360) {
      throw new Error("Hue must be less than or equal to 360.");
    }
    if (this.saturation > 100) {
      throw new Error("Saturation must be less than or equal to 100.");
    }
    if (this.lightness > 100) {
      throw new Error("Lightness must be less than or equal to 100.");
    }
  }
  
  toString() {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
  }
  
  toHSLA(alpha?:number) {
    alpha = alpha || 100;
    if (alpha > 100) {
      throw new Error("Alpha cannot be greater than 100%");
    }
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}, ${alpha})`;
  }
}

export default (): void => {
  const parentBox = document.getElementById("parentBox")
  const name = document.getElementById("name")
  const saturation = 100;
  const interval = 30;
  let hue = 0;

  window.disableHue = false;
  setInterval(() => {
    if (window.disableHue == false) {
      (hue >= 360) ? hue = 0 : "";
      hue++;
      parentBox.style.border = "0.3em solid " + new Hsl(hue, 100, 80).toString()
      name.style.color = new Hsl(hue, saturation, 90).toString()
    }
  }, interval);
  return;
}