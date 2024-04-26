import { Control } from "./Control.js";

export class TogglableControl extends Control 
{
  constructor(selector, label) {
    super(selector, label);
    this.synchronize();
  }

  synchronize() {
    const [checkbox1, checkbox2] = this.inputNodes;

    checkbox1.addEventListener('change', () => {
      checkbox2.checked = checkbox1.checked;
    });

    checkbox2.addEventListener('change', () => {
      checkbox1.checked = checkbox2.checked;
    });
  }

  getCheckedState() {
    return this.inputNodes[0].checked;
  }
}
