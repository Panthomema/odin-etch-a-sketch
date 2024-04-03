document.addEventListener('DOMContentLoaded', () => {
  const markerColorInput = document.querySelector('#marker-color-input');
  const bgColorInput = document.querySelector('#bg-color-input');

  // Function to add the class
  function addActiveClass(event) {
    event.currentTarget.classList.add('input-color-active');
  }

  // Function to remove the class
  function removeActiveClass(event) {
    if (!event.currentTarget.contains(event.target)) {
      event.currentTarget.classList.remove('input-color-active');
    }
  }

  // Add event listeners for focus
  markerColorInput.addEventListener('focus', addActiveClass);
  bgColorInput.addEventListener('focus', addActiveClass);

  // Add a click event listener to the document
  document.addEventListener('click', function (event) {
    // Check if the click is outside both color pickers
    if (!markerColorInput.contains(event.target) && !bgColorInput.contains(event.target)) {
      // Remove the class from both inputs
      markerColorInput.classList.remove('input-color-active');
      bgColorInput.classList.remove('input-color-active');
    }
  });

});