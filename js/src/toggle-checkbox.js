/**
 * Whale Assets: Check/Uncheck all checkbox on the grid
 * checkbox should contain following attributes
 *    data-toggle-checkbox
 */

const toggleCheckbox = function () {
  const version = '2.0.0';
  // console.log(`toggleCheckboxes version ${version}`);

  const UISelectors = {
    attr: 'data-toggle-checkbox',
    checkboxes: 'input[type="checkbox"][name="cb_items[]"]',
  };

  const checkboxToggleAll = document.querySelector(`[${UISelectors.attr}]`);

  if (checkboxToggleAll) {
    checkboxToggleAll.addEventListener('click', handleEvent);
  }

  function handleEvent(e) {
    document.querySelectorAll(UISelectors.checkboxes).forEach((elem) => {
      elem.checked = checkboxToggleAll.checked;
    });
  }
};

export { toggleCheckbox };
