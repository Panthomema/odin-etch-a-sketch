document.addEventListener('DOMContentLoaded', () => {

  const controls = [
    {
      selector: '.clear',
    },
    {
      selector: '.grid-toggler',
    },
    {
      selector: 'zoom',
    },
    {
      selector: '.marker-color',
    },
    {
      selector: '.bg-color',
    },
    {
      selector: '.marker',
    },
    {
      selector: '.eraser',
    },
    {
      selector: '.randomizer',
    },
    {
      selector: '.color-picker',
    },
    {
      selector: '.lightener',
    },
    {
      selector: '.darkener',
    },
  ];

  for (const control of controls) {
    control.inputNodes = document.querySelectorAll(control.selector);
  }
  
  for (const control of controls) {
    const inputs = [...control.inputNodes];

    if (inputs.every(node => node.nodeName === 'BUTTON')) continue;

    if (inputs.every(node => node.type === 'checkbox')) {
      syncCheckboxes(inputs);
    } else {
      console.log(inputs);
    }
    
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
    : 'var(--color-text)';
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

