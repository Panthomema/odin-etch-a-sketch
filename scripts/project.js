export class Project
{
  #content;

  constructor(maxSide, gridLinesOn, bgColor) {
    this.maxSide = maxSide;

    this.#content = this.initContent();
    this.markerFunctions = this.initMarkerFunctions();

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('id', 'content-wrapper');

    this.mouseIsDown = false;
    //document.body.addEventListener('mousedown', () => this.mouseIsDown = true);
    //document.body.addEventListener('mouseup', () => this.mouseIsDown = false);

    if (gridLinesOn) this.toggleGridLines();
    this.updateBgColor(bgColor);
  }

  initContent() {
    return Array.from(
      { length: this.maxSide ** 2 },
      () => {
        const pixel = document.createElement('div');
        pixel.setAttribute('data-painted', '');
        pixel.addEventListener('mousedown', this.callMarkerFunction.bind(this));
        return pixel;
      }
    );
  }

  initMarkerFunctions() {
    return {
      marker: event => {
        event.currentTarget.dataset.painted = 'true';
        const color = document.querySelector('.marker-color').value;
        event.currentTarget.style.background = color;
      }
    }
  }

  formatContent(sideLength) {
    const cutRatio = (this.maxSide - sideLength) / 2;
    let rows = this.splitInRows(this.content, this.maxSide);

    return rows
      .slice(cutRatio, rows.length - cutRatio)
      .map(row => row.slice(cutRatio, row.length - cutRatio));
  }

  splitInRows(array, rowSize) {
    const rows = [];
    const step = Number(rowSize);

    for (let index = 0; index < array.length; index += step) {
      rows.push(array.slice(index, index + step));
    }

    return rows;
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

  toggleGridLines() {
    this.wrapper.classList.toggle('grid-lines-on');
    this.content.forEach(pixel => {
      pixel.classList.toggle('grid-lines-on');
    });  
  }

  updateBgColor(color) {
    this.content.forEach(pixel => {
      if (!pixel.dataset.painted) pixel.style.background = color;
    }); 
  }

  callMarkerFunction(event) {
    //if (!this.mouseIsDown) return;
    const markerOptions = document.querySelectorAll('[name=marker-options]');
    const checkedOption = ([...markerOptions].find(node => node.checked));
    if (checkedOption) this.markerFunctions[checkedOption.classList[0]](event);
  }

  get content() {
    return this.#content;
  }
}