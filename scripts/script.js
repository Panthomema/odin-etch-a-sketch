document.addEventListener('DOMContentLoaded', () => {

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
      tooltipMsg:'marker',
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

  for (const control of controls) {
    const inputs = [...control.inputNodes];

    if (inputs.every(node => node.nodeName === 'BUTTON')) continue;

    if (inputs.every(node => node.type === 'checkbox')) syncCheckboxes(inputs);

    if (inputs.every(node => node.type === 'color')) syncColorInputs(inputs);
    
    if (inputs.every(node => node.type === 'range')) syncRangeInputs(inputs);
  }

  for (const control of controls) {
    control.parentNodes = [...control.inputNodes].map(node => node.parentNode);
    console.log(control.parentNodes);
  }

  for (const control of controls) {
    control.parentNodes.forEach(node => addTooltip(node, control.tooltipMsg));
  }
  
  

  document.querySelectorAll('[type=color]').forEach(input => {
    input.addEventListener('input', event => {
      updateIconColor(event.currentTarget);
    });
  });
  
  const markerControls = document.querySelectorAll('[name="marker-options"]');

  markerControls.forEach(input => {
    input.addEventListener('click', event => {
      [...markerControls]
        .filter(input => input !== event.currentTarget)
        .forEach(other => {
          other.checked = false;
        }) 
    }); 
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
    console.log('input1 updated');
    input2.value = input1.value;
  });

  input2.addEventListener('input', () => {
    console.log('input2 updated');
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

