import { Utils } from "./Utils.js";

export class Project
{
  #content;

  constructor(maxSideLength, contentListener) {
    this.maxSideLength = maxSideLength;
    this.contentListener = contentListener;

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('id', 'content-wrapper');

    this.initContent();
  }

  initContent() {
    this.content = Array.from(
      { length: this.maxSideLength ** 2 },
      () => {
        const pixel = document.createElement('div');
        pixel.setAttribute('data-painted', '');
        pixel.addEventListener('mouseover', this.contentListener);
        pixel.addEventListener('mousedown', this.contentListener);
        return pixel;
      }
    );
  }

  render(sideLength) {
    this.wrapper.innerHTML = '';

    const rows = this.formatContent(sideLength);

    rows.forEach(row => {
      const rowContainer = document.createElement('div');
      rowContainer.classList.add('row');
      row.forEach(pixel => { rowContainer.appendChild(pixel) });
      this.wrapper.appendChild(rowContainer); 
    });

    return this.wrapper;
  }

  formatContent(sideLength) {
    const cutRatio = (this.maxSideLength - sideLength) / 2;
    let rows = Utils.splitInRows(this.content, this.maxSideLength);

    return rows
      .slice(cutRatio, rows.length - cutRatio)
      .map(row => row.slice(cutRatio, row.length - cutRatio));
  }

  resetContent() {
    let gridLinesOn = this.content[0].classList.contains('grid-lines-on');
    const bgColor = this.content[0].style.background;
    
    this.initContent();

    if (gridLinesOn) this.toggleContentClass('grid-lines-on');
    this.setContentBackground(bgColor);
  }

  toggleContentClass(className) {
    this.content.forEach(pixel => {
      pixel.classList.toggle(className);
    });  
  }

  setContentBackground(color) {
    this.content.forEach(pixel => {
      if (!pixel.dataset.painted) pixel.style.background = color;
    });
  }

  get content() {
    return this.#content;
  }

  set content(value) {
    this.#content = value;
  }
}