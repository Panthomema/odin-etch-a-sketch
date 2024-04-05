document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('[type=color]').forEach(input => {
    input.addEventListener('input', event => {
      updateIconColor(event.currentTarget);
    });
  });
  
  const markerControls = document.querySelectorAll('#marker-controls input');

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

