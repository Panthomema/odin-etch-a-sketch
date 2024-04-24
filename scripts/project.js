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
    this.addWrapperListeners();
    
    if (gridLinesOn) this.toggleGridLines();
    this.updateBgColor(bgColor);

  }

  initContent() {
    return Array.from(
      { length: this.maxSide ** 2 },
      () => {
        const pixel = document.createElement('div');
        pixel.setAttribute('data-painted', '');
        pixel.addEventListener('mouseover', this.callMarkerFunction.bind(this));
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
      },
      eraser: event => {
        if(event.currentTarget.dataset.painted === 'true') {
          event.currentTarget.dataset.painted = '';
          const color = document.querySelector('.bg-color').value;
          event.currentTarget.style.background = color;
        }
      },
      'color-picker': event => {
        const markerInput = document.querySelector('.marker-color');
        const color = event.currentTarget.style.background;
        markerInput.value = hexToRgb(color);
      }
    }
  }

  addWrapperListeners() {
    this.wrapper.addEventListener('mousedown', event => {
      event.preventDefault();
      this.mouseIsDown = true;
    });
    this.wrapper.addEventListener('mouseup', () => { 
      this.mouseIsDown = false 
    });
    this.wrapper.addEventListener('mouseout', event => {
      if (!this.wrapper.contains(event.relatedTarget)) {
        this.mouseIsDown = false;
      }
    });
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
    if (event.type === 'mouseover' && !this.mouseIsDown) return;
    const markerOptions = document.querySelectorAll('[name=marker-options]');
    const checkedOption = ([...markerOptions].find(node => node.checked));
    if (checkedOption) this.markerFunctions[checkedOption.classList[0]](event);
  }

  get content() {
    return this.#content;
  }
}