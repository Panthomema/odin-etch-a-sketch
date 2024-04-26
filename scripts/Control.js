import { Utils } from "./Utils.js";

export class Control
{
  constructor(selector, label) {
    this.inputNodes = [...document.querySelectorAll(selector)];
    this.inputNodes.forEach(node => { 
      Utils.addTooltip(node.parentNode, label);
    });
  }

  addListener(event, callback) {
    this.inputNodes.forEach(node => {
      node.addEventListener(event, callback);
    })
  } 
}