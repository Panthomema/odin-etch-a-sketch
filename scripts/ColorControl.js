import { Control } from "./Control.js";
import { Color } from "./Color.js";

export class ColorControl extends Control
{
  constructor(selector, label) {
    super(selector, label);
    this.synchronize();
    this.addUpdateIconColorListeners();
  }

  // Synchronizes inputs so updating one updates the other one

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

  addUpdateIconColorListeners() {
    this.inputNodes.forEach(input => {
      input.addEventListener('input', event => {
        this.updateIconColor(event.currentTarget);
      });
    });
  }

  updateIconColor(colorInputNode) {
    const icon = colorInputNode.nextElementSibling;
    const luminance = new Color(colorInputNode.value).getLuminance();
  
    icon.style.color = (luminance > 0.5)
      ? 'var(--color-dark)'
      : 'var(--color-light)';
  }

  getValue() {
    return this.inputNodes[0].value;
  }

  setValue(value) {
    this.inputNodes.forEach(node => {
      node.value = value;
      this.updateIconColor(node);
    });
  }
}