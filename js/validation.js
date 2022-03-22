const validateInputs = (...inputs) => {
  inputs.forEach((input) => {
    input.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.stopPropagation();
      }
    });
  });
};

export { validateInputs };
