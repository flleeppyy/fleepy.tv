/* w3color.js ver.1.18 by w3schools.com (Do not remove this line)*/
/* Originally made by w3schools https://www.w3schools.com/lib/w3color.js
completely broken down to do just hsl to hex cause im fucking lazy to make my own*/
(function () {
function w3color(color, elmnt) {
  if (!(this instanceof w3color)) { return new w3color(color, elmnt); }
  if (typeof color == "object") {return color; }
  this.attachValues(toColorObject(color));
  if (elmnt) {elmnt.style.backgroundColor = this.toRgbString();}
}
w3color.prototype = {
  toHexString : function () {
    var r = toHex(this.red);
    var g = toHex(this.green);
    var b = toHex(this.blue);
    return "#" +  r + g + b;
  },
  attachValues : function(color) {
    this.red = color.red;
    this.green = color.green;
    this.blue = color.blue;
    this.hue = color.hue;
    this.sat = color.sat;
    this.lightness = color.lightness;
    this.whiteness = color.whiteness;
    this.opacity = color.opacity;
    this.valid = color.valid;
  }
};
function toColorObject(c) {
  var x, y, typ, arr = [], arrlength, i, opacity, match, a, hue, sat, rgb, colornames = [], colorhexs = [];
  c = w3trim(c.toLowerCase());
  x = c.substr(0,1).toUpperCase();
  y = c.substr(1);
  a = 1;
  if ((x == "R" || x == "Y" || x == "G" || x == "C" || x == "B" || x == "M" || x == "W") && !isNaN(y)) {
    if (c.length == 6 && c.indexOf(",") == -1) {
    } else {
      c = "ncol(" + c + ")";
    }
  }
  if (c.length != 3 && c.length != 6 && !isNaN(c)) {c = "ncol(" + c + ")";}
  if (c.indexOf(",") > 0 && c.indexOf("(") == -1) {c = "ncol(" + c + ")";}  
  if (c.substr(0, 3) == "rgb" || c.substr(0, 3) == "hsl" || c.substr(0, 3) == "hwb" || c.substr(0, 4) == "ncol" || c.substr(0, 4) == "cmyk") {
    if (c.substr(0, 4) == "ncol") {
      if (c.split(",").length == 4 && c.indexOf("ncola") == -1) {
        c = c.replace("ncol", "ncola");
      }
      typ = "ncol";
      c = c.substr(4);
    } else if (c.substr(0, 4) == "cmyk") {
      typ = "cmyk";
      c = c.substr(4);
    } else {
      typ = c.substr(0, 3);
      c = c.substr(3);
    }
    arrlength = 3;
    opacity = false;
    if (c.substr(0, 1).toLowerCase() == "a") {
      arrlength = 4;
      opacity = true;
      c = c.substr(1);
    } else if (typ == "cmyk") {
      arrlength = 4;
      if (c.split(",").length == 5) {
        arrlength = 5;
        opacity = true;
      }
    }
    c = c.replace("(", "");
    c = c.replace(")", "");
    arr = c.split(",");
    if (typ == "rgb") {
      if (arr.length != arrlength) {
        return emptyObject();
      }
      for (i = 0; i < arrlength; i++) {
        if (arr[i] == "" || arr[i] == " ") {arr[i] = "0"; }
        if (arr[i].indexOf("%") > -1) {
          arr[i] = arr[i].replace("%", "");
          arr[i] = Number(arr[i] / 100);
          if (i < 3 ) {arr[i] = Math.round(arr[i] * 255);}
        }
        if (isNaN(arr[i])) {return emptyObject(); }
        if (parseInt(arr[i]) > 255) {arr[i] = 255; }
        if (i < 3) {arr[i] = parseInt(arr[i]);}
        if (i == 3 && Number(arr[i]) > 1) {arr[i] = 1;}
      }
      rgb = {r : arr[0], g : arr[1], b : arr[2]};
      if (opacity == true) {a = Number(arr[3]);}
    }
    if (typ == "hsl" || typ == "hwb" || typ == "ncol") {
      while (arr.length < arrlength) {arr.push("0"); }
      if (typ == "hsl" || typ == "hwb") {
        if (parseInt(arr[0]) >= 360) {arr[0] = 0; }
      }
      for (i = 1; i < arrlength; i++) {
        if (arr[i].indexOf("%") > -1) {
          arr[i] = arr[i].replace("%", "");
          arr[i] = Number(arr[i]);
          if (isNaN(arr[i])) {return emptyObject(); }
          arr[i] = arr[i] / 100;
        } else {
          arr[i] = Number(arr[i]);
        }
        if (Number(arr[i]) > 1) {arr[i] = 1;}
        if (Number(arr[i]) < 0) {arr[i] = 0;}
      }
      if (typ == "hsl") {rgb = hslToRgb(arr[0], arr[1], arr[2]); hue = Number(arr[0]); sat = Number(arr[1]);}
      if (typ == "hwb") {rgb = hwbToRgb(arr[0], arr[1], arr[2]);}
      if (typ == "ncol") {rgb = ncolToRgb(arr[0], arr[1], arr[2]);}
      if (opacity == true) {a = Number(arr[3]);}
    }
    if (typ == "cmyk") {
      while (arr.length < arrlength) {arr.push("0"); }
      for (i = 0; i < arrlength; i++) {
        if (arr[i].indexOf("%") > -1) {
          arr[i] = arr[i].replace("%", "");
          arr[i] = Number(arr[i]);
          if (isNaN(arr[i])) {return emptyObject(); }
          arr[i] = arr[i] / 100;
        } else {
          arr[i] = Number(arr[i]);
        }
        if (Number(arr[i]) > 1) {arr[i] = 1;}
        if (Number(arr[i]) < 0) {arr[i] = 0;}
      }
      rgb = cmykToRgb(arr[0], arr[1], arr[2], arr[3]);
      if (opacity == true) {a = Number(arr[4]);}
    }
  } else if (c.substr(0, 3) == "ncs") {
    rgb = ncsToRgb(c);
  } else {
    match = false;
    colornames = getColorArr('names');
    for (i = 0; i < colornames.length; i++) {
      if (c.toLowerCase() == colornames[i].toLowerCase()) {
        colorhexs = getColorArr('hexs');
        match = true;
        rgb = {
          r : parseInt(colorhexs[i].substr(0,2), 16),
          g : parseInt(colorhexs[i].substr(2,2), 16),
          b : parseInt(colorhexs[i].substr(4,2), 16)
        };
        break;
      }
    }
    if (match == false) {
      c = c.replace("#", "");
      if (c.length == 3) {c = c.substr(0,1) + c.substr(0,1) + c.substr(1,1) + c.substr(1,1) + c.substr(2,1) + c.substr(2,1);}
      for (i = 0; i < c.length; i++) {
        if (!isHex(c.substr(i, 1))) {return emptyObject(); }
      }
      arr[0] = parseInt(c.substr(0,2), 16);
      arr[1] = parseInt(c.substr(2,2), 16);
      arr[2] = parseInt(c.substr(4,2), 16);
      for (i = 0; i < 3; i++) {
        if (isNaN(arr[i])) {return emptyObject(); }
      }
      rgb = {
        r : arr[0],
        g : arr[1],
        b : arr[2]
      };
    }
  }
  return colorObject(rgb, a, hue, sat);
}
function colorObject(rgb, a, h, s) {
  var hsl, hwb, cmyk, ncol, color, hue, sat;
  if (!rgb) {return emptyObject();}
  if (a === null) {a = 1;}
  hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hue = (h || hsl.h);
  sat = (s || hsl.s);   
  color = {
    red : rgb.r,
    green : rgb.g,
    blue : rgb.b,
    hue : hue,
    sat : sat,
    lightness : hsl.l,
    opacity : a,
    valid : true
  };
  color = roundDecimals(color);
  return color;
}
function emptyObject() {
  return {
    red : 0,
    green : 0,
    blue : 0,
    hue : 0,
    sat : 0,
    lightness : 0,
    opacity : 1,
    valid : false
  };
}
function roundDecimals(c) {
  c.red = Number(c.red.toFixed(0));
  c.green = Number(c.green.toFixed(0));
  c.blue = Number(c.blue.toFixed(0));
  c.hue = Number(c.hue.toFixed(0));
  c.sat = Number(c.sat.toFixed(2));
  c.lightness = Number(c.lightness.toFixed(2));
  c.opacity = Number(c.opacity.toFixed(2));
  return c;
}
function hslToRgb(hue, sat, light) {
  var t1, t2, r, g, b;
  hue = hue / 60;
  if ( light <= 0.5 ) {
    t2 = light * (sat + 1);
  } else {
    t2 = light + sat - (light * sat);
  }
  t1 = light * 2 - t2;
  r = hueToRgb(t1, t2, hue + 2) * 255;
  g = hueToRgb(t1, t2, hue) * 255;
  b = hueToRgb(t1, t2, hue - 2) * 255;
  return {r : r, g : g, b : b};
}
function hueToRgb(t1, t2, hue) {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;
  if (hue < 1) return (t2 - t1) * hue + t1;
  else if(hue < 3) return t2;
  else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
}
function rgbToHsl(r, g, b) {
  var min, max, i, l, s, maxcolor, h, rgb = [];
  rgb[0] = r / 255;
  rgb[1] = g / 255;
  rgb[2] = b / 255;
  min = rgb[0];
  max = rgb[0];
  maxcolor = 0;
  for (i = 0; i < rgb.length - 1; i++) {
    if (rgb[i + 1] <= min) {min = rgb[i + 1];}
    if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
  }
  if (maxcolor == 0) {
    h = (rgb[1] - rgb[2]) / (max - min);
  }
  if (maxcolor == 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min);
  }
  if (maxcolor == 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min);
  }
  if (isNaN(h)) {h = 0;}
  h = h * 60;
  if (h < 0) {h = h + 360; }
  l = (min + max) / 2;
  if (min == max) {
    s = 0;
  } else {
    if (l < 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2 - max - min);
    }
  }
  s = s;
  return {h : h, s : s, l : l};
}
function toHex(n) {
  var hex = n.toString(16);
  while (hex.length < 2) {hex = "0" + hex; }
  return hex;
}
function cl(x) {
  console.log(x);
}
function w3trim(x) {
  return x.replace(/^\s+|\s+$/g, '');
}
function isHex(x) {
  return ('0123456789ABCDEFabcdef'.indexOf(x) > -1);
}
window.w3color = w3color;

})();

function w3SetColorsByAttribute() {
  var z, i, att;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    att = z[i].getAttribute("data-w3-color");
    if (att) {
      z[i].style.backgroundColor = w3color(att).toRgbString();      
    }
  }
}