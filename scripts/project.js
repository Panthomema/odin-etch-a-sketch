export class Project
{
  #content;

  constructor(maxSide, gridLinesOn, bgColor) {
    this.maxSide = maxSide;
    this.#content = Array.from(
      { length: this.maxSide ** 2 },
      () => document.createElement('div')
    );
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('id', 'content-wrapper');

    if (gridLinesOn) this.toggleGridLines();
    
    this.updateBgColor(bgColor);
  }

  resize(sideLength) {
    const cutRatio = (this.maxSide - sideLength) / 2;
    let rows = this.splitInRows(this.content, this.maxSide);
    console.log();

    rows = rows.slice(cutRatio, rows.length - cutRatio);
    return rows.flatMap(row => row.slice(cutRatio, row.length - cutRatio));
  }

  splitInRows(array, rowSize) {
    const result = [];
    const step = Number(rowSize);

    for (let index = 0; index < array.length; index += step) {
      result.push(array.slice(index, index + step));
    }

    return result;
  }

  render(sideLength) {
    this.wrapper.innerHTML = '';

    const content = this.resize(sideLength);
    const pixelWidth = `${ 100 / sideLength }%`;

    content.forEach(pixel => {
      pixel.style.width = pixelWidth; 
      this.wrapper.appendChild(pixel);
    });

    return this.wrapper;
  }

  toggleGridLines() {
    this.wrapper.classList.toggle('grid-lines-on');
    this.content.forEach(pixel => {
      pixel.classList.toggle('grid-lines-on');
    });  
  }

  updateBgColor(color) {
    this.content.forEach(pixel => {
      pixel.style.backgroundColor = color;
    });
  }

  get content() {
    return this.#content;
  }
}