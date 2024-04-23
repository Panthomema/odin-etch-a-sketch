import { Project } from "./project.js";

let project;

document.addEventListener('DOMContentLoaded', () => {


  // Update icon color to match background

  document.querySelectorAll('[type=color]').forEach(input => {
    input.addEventListener('input', event => {
      updateIconColor(event.currentTarget);
    });
  });

  // Make marker controls behave as radio buttons

  const markerControls = document.querySelectorAll('[name="marker-options"]');

  markerControls.forEach(input => {
    input.addEventListener('click', event => {
      [...markerControls]
        .filter(input => input !== event.currentTarget)
        .forEach(other => {
          other.checked = false;
        });
    });
  });

  // Controls array

  const controls = [
    {
      selector: '.clear',
      tooltipMsg: 'clear canvas',
    },
    {
      selector: '.grid-toggler',
      tooltipMsg: 'toggle grid lines',
    },
    {
      selector: '.zoom',
      tooltipMsg: 'zoom',
    },
    {
      selector: '.marker-color',
      tooltipMsg: 'marker color',
    },
    {
      selector: '.bg-color',
      tooltipMsg: 'background color',
    },
    {
      selector: '.marker',
      tooltipMsg: 'marker',
    },
    {
      selector: '.eraser',
      tooltipMsg: 'eraser',
    },
    {
      selector: '.randomizer',
      tooltipMsg: 'color randomizer',
    },
    {
      selector: '.color-picker',
      tooltipMsg: 'color picker',
    },
    {
      selector: '.lightener',
      tooltipMsg: 'lightener',
    },
    {
      selector: '.darkener',
      tooltipMsg: 'darkener',
    },
  ];

  for (const control of controls) {
    control.inputNodes = document.querySelectorAll(control.selector);
  }

  // Sync each control pair so they are consistent upon window resizing

  for (const control of controls) {
    const inputs = [...control.inputNodes];

    if (inputs.every(node => node.nodeName === 'BUTTON')) continue;

    if (inputs.every(node => node.type === 'checkbox')) syncCheckboxes(inputs);

    if (inputs.every(node => node.type === 'color')) syncColorInputs(inputs);

    if (inputs.every(node => node.type === 'range')) syncRangeInputs(inputs);
  }

  for (const control of controls) {
    control.parentNodes = [...control.inputNodes].map(node => node.parentNode);
  }

  // Add tooltips

  for (const control of controls) {
    control.parentNodes.forEach(node => addTooltip(node, control.tooltipMsg));
  }

  // Add start project functionality

  const startButton = document.querySelector('#start-button');
  startButton.addEventListener('click', startProject);

  // Add restart project functionality

  const clearButtons = controls.find(control => control.selector === '.clear');

  clearButtons.inputNodes.forEach(node => {
    node.addEventListener('click', restartProject);
  });
  


});


function calculateLuminance(color) {
  const { r, g, b } = color;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

function updateIconColor(colorInput) {
  const icon = colorInput.nextElementSibling;
  const luminance = calculateLuminance(hexToRgb(colorInput.value));

  icon.style.color = (luminance > 0.5)
    ? 'var(--color-button-icon)'
    : 'var(--color-light)';
}

function syncCheckboxes(pair) {
  const [checkbox1, checkbox2] = pair;

  checkbox1.addEventListener('change', () => {
    checkbox2.checked = checkbox1.checked;
  });

  checkbox2.addEventListener('change', () => {
    checkbox1.checked = checkbox2.checked;
  });
}

function syncColorInputs(pair) {
  const [input1, input2] = pair;

  input1.addEventListener('change', () => {
    input2.value = input1.value;
    updateIconColor(input2);
  });

  input2.addEventListener('change', () => {
    input1.value = input2.value;
    updateIconColor(input1);
  });
}

function syncRangeInputs(pair) {
  const [input1, input2] = pair;

  input1.addEventListener('input', () => {
    input2.value = input1.value;
  });

  input2.addEventListener('input', () => {
    input1.value = input2.value;
  });
}

function addTooltip(elem, text) {
  elem.classList.add('tooltip-container');

  const tooltipText = document.createElement('div');
  tooltipText.classList.add('tooltip-text');
  tooltipText.textContent = text;

  elem.appendChild(tooltipText);
}


function startProject() {
  project = new Project(document.querySelector('[type=range]').max);
  formatContent();
}

function formatContent() {
  const content = document.querySelector('#canvas').firstElementChild;
  content.classList.add('hidden');
  content.addEventListener('transitionend', renderContent);
}

function renderContent(event) {
  removeAfterTransition(event, 'opacity');
  const content = project.render(document.querySelector('[type=range]').value);
  content.classList.add('hidden');
  document.querySelector('#canvas').appendChild(content);

  /* Push to the style change to the event loop end, so browser has time to
  apply the css styles (otherwise transition wouldn't work) */

  setTimeout(() => { content.classList.remove('hidden') }, 0);
}

function removeAfterTransition(event, propertyName) {
  if (event.propertyName === propertyName) {
    event.currentTarget.remove();
    event.currentTarget.removeEventListener('transitionend', renderContent);
  }
}

function restartProject() {
  const canvasContent = document.querySelector('#canvas').firstElementChild;
  if (canvasContent.id === 'content-wrapper') {
    startProject();
  }
}

