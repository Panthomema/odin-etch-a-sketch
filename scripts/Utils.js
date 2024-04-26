export class Utils
{
  static calculateLuminance(color) {
    const { r, g, b } = color;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  
  static hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return { r, g, b };
  }

  static addTooltip(elem, text) {
    elem.classList.add('tooltip-container');
  
    const label = document.createElement('div');
    label.classList.add('tooltip-text');
    label.textContent = text;
  
    elem.appendChild(label);
  }

  static splitInRows(array, rowSize) {
    const rows = [];
    const step = Number(rowSize);

    for (let index = 0; index < array.length; index += step) {
      rows.push(array.slice(index, index + step));
    }

    return rows;
  }

  static changeContentWithTransition(content, parent) {
    const toRemove = parent.firstElementChild;
    toRemove.classList.add('hidden');

    toRemove.addEventListener('transitionend', function handler(event) {
      Utils.removeAfterTransition(event, 'opacity', handler);
      content.classList.add('hidden');
      parent.appendChild(content);
      setTimeout(() => { content.classList.remove('hidden') }, 0);
    });
  }

  static removeAfterTransition(event, propertyName, callback) {
    if (event.propertyName === propertyName) {
      event.currentTarget.removeEventListener('transitionend', callback);
      event.currentTarget.remove();
    }
  }


}