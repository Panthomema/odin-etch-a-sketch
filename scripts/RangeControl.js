import { Control } from "./Control.js";

export class RangeControl extends Control
{
  constructor(selector, label) {
    super(selector, label);
    this.synchronize();
  }

  // Synchronizes inputs so updating one updates the other one

  synchronize() {
    const [input1, input2] = this.inputNodes;

    input1.addEventListener('input', () => {
      input2.value = input1.value;
    });

    input2.addEventListener('input', () => {
      input1.value = input2.value;
    });
  }

  getMax() {
    return this.inputNodes[0].max;
  }

  getValue() {
    return this.inputNodes[0].value;
  }
}