export class Project
{
  #content;

  constructor(maxSide) {
    this.maxSide = maxSide;
    this.#content = Array.from(
      { length: this.maxSide ** 2 },
      () => document.createElement('div')
    );
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
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'content-wrapper');

    const content = this.resize(sideLength);

    const pixelWidth = `${ 100 / sideLength }%`;

    console.log(pixelWidth);
    content.forEach(pixel => {
      pixel.style.width = pixelWidth; 
      wrapper.appendChild(pixel);
    });

    return wrapper;
  }

  get content() {
    return this.#content;
  }
}