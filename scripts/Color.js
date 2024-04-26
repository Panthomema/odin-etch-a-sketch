export class Color
{
  constructor(codeString) {
    if (/^#/.test(codeString)) {
      this.r = parseInt(codeString.substring(1, 3), 16);
      this.g = parseInt(codeString.substring(3, 5), 16);
      this.b = parseInt(codeString.substring(5, 7), 16);
    }

    if (/^rgb/.test(codeString)) {
      [this.r, this.g, this.b] = codeString
        .match(/[\d]+/g)
        .map(hexValue => Number(hexValue));
    }

    if(!codeString) {
      [this.r, this.g, this.b] = Array.from({ length: 3}, () => Math.floor(Math.random() * 256));
    }
  }

  formatToRGB() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  formatToHex() {
    const [hexR, hexG, hexB] = [this.r, this.g, this.b]
      .map(value => value.toString(16).padStart(2, '0'));

    return `#${hexR}${hexG}${hexB}`;
  }

  getLuminance() {
    return (0.299 * this.r + 0.587 * this.g + 0.114 * this.b) / 255;
  }

}