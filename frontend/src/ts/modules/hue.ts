
class Hsl { // I honestly dont know why the fuck im doing this. probably to practice and memorize classes.
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

export function startHue(): void {
  
  const parentBox = $("#parentBox");
  const saturation = 100;
  const interval = 30;
  let hue = 0;
  setInterval(() => {
    (hue >= 360) ? hue = 0 : "";
    hue++;
    $("#chen").css("border", "0.3em solid " + new Hsl(hue, saturation, 90).toString());
    parentBox.css("border", ("0.3em solid " + new Hsl(hue, 100, 80).toString()));
    $("#name").css("color", new Hsl(hue, saturation, 90).toString());
  }, interval);
  return;
}