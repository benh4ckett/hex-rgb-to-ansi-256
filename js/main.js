class RGBColor {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static fromHex(hex) {
    const matches = hex.match(/^#?([a-fA-F\d]{6})$/);
    if (!matches) {
      return null;
    }
    let match = matches[0];
    if (match.startsWith("#")) {
      match = match.substring(1);
    }
    const r = parseInt(match.substring(0, 2), 16);
    const g = parseInt(match.substring(2, 4), 16);
    const b = parseInt(match.substring(4), 16);
    return new RGBColor(r, g, b);
  }

  setName(name) {
    this.name = name;
  }

  toHex() {
    const toHexComponent = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHexComponent(this.r) + toHexComponent(this.g) + toHexComponent(this.b);
  }

  distanceSquared(otherColor) {
    return (this.r - otherColor.r) ** 2 + (this.g - otherColor.g) ** 2 + (this.b - otherColor.b) ** 2;
  }
}

function bestMatch(colors, givenColor) {
  let bestDistance = Infinity;
  let bestMatch = null;
  for (const color of colors) {
    const distance = color.distanceSquared(givenColor);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = color;
    }
  }
  return bestMatch;
}

window.ANSI256Colors = []

function onChangedInput() {
  const input = document.getElementById("hex-color-input");
  let color = RGBColor.fromHex(input.value);
  if (!color) {
    document.getElementById("invalid-hex-color-warning").style.display = "block";
    return;
  }
  document.getElementById("invalid-hex-color-warning").style.display = "none";
  document.getElementById("input-color-preview").style.backgroundColor = color.toHex();

  window.ANSI256Colors.sort((a, b) => a.distanceSquared(color) - b.distanceSquared(color));

  const tbody = document.getElementById('ansi-candidates-tbody');
  tbody.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    let row = tbody.insertRow();
    let cell = row.insertCell(0);
    cell.innerText = (i+1).toString();
    cell = row.insertCell(1);
    cell.innerText = window.ANSI256Colors[i].name;
    cell = row.insertCell(2);
    cell.innerText = window.ANSI256Colors[i].toHex();
    cell = row.insertCell(3);
    cell.style.backgroundColor = window.ANSI256Colors[i].toHex();
    cell = row.insertCell(4);
    cell.style.backgroundColor = color.toHex();
  }

}

function onLoad() {
  for (let r = 0; r < 6; r++) {
    for (let g = 0; g < 6; g++) {
      for (let b = 0; b < 6; b++) {
        const red = (r > 0) ? r * 40 + 55 : 0;
        const green = (g > 0) ? g * 40 + 55 : 0;
        const blue = (b > 0) ? b * 40 + 55 : 0;
        const color = new RGBColor(red, green, blue);
        const ANSI_index = 16 + r * 36 + g * 6 + b;
        color.setName(ANSI_index)
        window.ANSI256Colors.push(color);
      }
    }
  }

  const input = document.getElementById("hex-color-input");
  input.addEventListener("change", onChangedInput);
  input.addEventListener("input", onChangedInput);
}

window.addEventListener('load', onLoad);
