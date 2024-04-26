import { Control } from "./Control.js";
import { Utils } from "./Utils.js";

export class ColorControl extends Control
{
  constructor(selector, label) {
    super(selector, label);
    this.synchronize();
    this.addUpdateIconColorListeners();
  }

  synchronize() {
    const [input1, input2] = this.inputNodes;

    input1.addEventListener('change', () => {
      input2.value = input1.value;
      this.updateIconColor(input2);
    });

    input2.addEventListener('change', () => {
      input1.value = input2.value;
      this.updateIconColor(input1);
    });
  }

  updateIconColor(colorInputNode) {
    const icon = colorInputNode.nextElementSibling;
    const rgbValue = Utils.hexToRgb(colorInputNode.value)
    const luminance = Utils.calculateLuminance(rgbValue);
  
    icon.style.color = (luminance > 0.5)
      ? 'var(--color-dark)'
      : 'var(--color-light)';
  }

  addUpdateIconColorListeners() {
    this.inputNodes.forEach(input => {
      input.addEventListener('input', event => {
        this.updateIconColor(event.currentTarget);
      });
    });
  }

  getValue() {
    return this.inputNodes[0].value;
  }
}