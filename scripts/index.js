import { Utils } from "./Utils.js";
import { Color } from "./Color.js";
import { Control } from "./Control.js";
import { TogglableControl } from "./TogglableControl.js";
import { RangeControl } from "./RangeControl.js";
import { ColorControl } from "./ColorControl.js";
import { Project } from "./Project.js";

document.addEventListener('DOMContentLoaded', () => {

 
  // Create controls tracking object

  const controls = {
    clear: new Control('.clear', 'clear'),
    toggleGrid: new TogglableControl('.grid-toggler', 'toggle grid lines'),
    zoom: new RangeControl('.zoom', 'zoom'),
    bgColor: new ColorControl('.bg-color', 'background color'),
    markerColor: new ColorControl('.marker-color', 'marker color'),
    markerOptions: {
      marker: new TogglableControl('.marker', 'marker'),
      eraser: new TogglableControl('.eraser', 'eraser'),
      randomizer: new TogglableControl('.randomizer', 'color randomizer'),
      colorPicker: new TogglableControl('.color-picker', 'color picker'),
      opacityAdder: new TogglableControl('.opacity-adder', 'opacity adder'),
      opacityRemover: new TogglableControl('.opacity-remover', 'opacity remover'),
    },
  }

  Object.values(controls.markerOptions)
    .reduce((nodes, control) => nodes.concat(control.inputNodes), [])
    .forEach((node, _, allNodes) => {
      node.addEventListener('click', event => {
        allNodes
          .filter(node => node !== event.currentTarget)
          .forEach(otherNode => { otherNode.checked = false });
      });
    });
  
  const markerActions = {
    marker: event => {
      event.currentTarget.dataset.painted = 'true';
      const color = new Color(controls.markerColor.getValue()).formatToRGB();
      event.currentTarget.style.background = color;
      event.currentTarget.style.opacity = 1;
    },
    eraser: event => {
      if(event.currentTarget.dataset.painted === 'true') {
        event.currentTarget.dataset.painted = '';
        const color = new Color(controls.bgColor.getValue()).formatToRGB();
        event.currentTarget.style.background = color;
        event.currentTarget.style.opacity = 1;
      }
    },
    randomizer: event => {
      event.currentTarget.dataset.painted = '';
      const color = new Color().formatToRGB();
      event.currentTarget.style.background = color;
      event.currentTarget.style.opacity = 1;
    },
    colorPicker: event => {
      const rgbString = event.currentTarget.style.background;
      if (rgbString) {
        controls.markerColor.setValue(new Color(rgbString).formatToHex());
      }
    },
    opacityAdder: event => {
      const pixel = event.currentTarget;
      if (pixel.style.opacity < 1) pixel.style.opacity += 0.1;
    },
    opacityRemover: event => {
      const pixel = event.currentTarget;
      if (pixel.style.opacity > 0) pixel.style.opacity -= 0.1;
    }
  }

  for (const option in markerActions) {
    controls.markerOptions[option].action = markerActions[option];
  }
  
  const contentListener = event => {
    if (event.type === 'mouseover' && !mouseIsDown) return;
    const checkedOption = Object.values(controls.markerOptions)
      .find(control => control.getCheckedState());
    
    if (checkedOption) checkedOption.action(event);
  };
  
  const project = new Project(controls.zoom.getMax(), contentListener);

  let mouseIsDown = false;
  project.wrapper.addEventListener('mousedown', event => {
    event.preventDefault();
    mouseIsDown = true;
  });
  project.wrapper.addEventListener('mouseup', () => { 
    mouseIsDown = false 
  });
  project.wrapper.addEventListener('mouseout', event => {
    if (!project.wrapper.contains(event.relatedTarget)) {
      mouseIsDown = false;
    }
  });

  const canvas = document.querySelector('#canvas');
  const startButton = document.querySelector('#start-button');

  const showProject = () => {
    const content = project.render(controls.zoom.getValue());
    Utils.changeContentWithTransition(content, canvas);
  };

  startButton.addEventListener('click', showProject);

  controls.clear.addListener('click', () => {
    if (canvas.firstElementChild === project.wrapper) {

      project.resetContent();
      showProject();
    }
  });

  controls.toggleGrid.addListener('change', () => {
    project.wrapper.classList.toggle('grid-lines-on');
    project.toggleContentClass('grid-lines-on');
  });

  controls.zoom.addListener('input', () => {
    if (canvas.firstElementChild === project.wrapper) showProject();
  });

  controls.bgColor.addListener('input', event => {
    const color = new Color(event.target.value).formatToRGB();
    project.setContentBackground(color);
  });
});
