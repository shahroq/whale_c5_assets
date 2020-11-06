/**
 * Whale Assets: Enable/Disable form inputs on a specific area
 * Attributes that should be apllied on frontend
 * data-toggle-form
 * data-toggle-form-target=".class-name"
 * data-toggle-form-checked="true/false" // for non-checkbox elements like select:option
 * data-toggle-form-checkbox-reverse // for checkeboxes expected to exibit reverse behavior
 */

const toggleForm = function () {
  const version = '2.0.0';
  // console.log(`toggleForm version ${version}`);

  const UISelectors = {
    attr: 'data-toggle-form',
    attrTarget: 'data-toggle-form-target',
    tagsFormElems: 'input, textarea, select, button',
    classStripe: 'stripe-1',
  };

  document.body.addEventListener('change', handleEvent, true); // for combos
  document.body.addEventListener('click', handleEvent, true); // for checkboex

  // initialization
  document
    .querySelectorAll(`[${UISelectors.attr}]`)
    .forEach((elem) => {
      switch (elem.type) {
        case 'checkbox':
          elem.dispatchEvent(new Event('click')); // initial values
          break;
        case 'select-one':
          elem.dispatchEvent(new Event('change')); // initial values
          break;
      }
    });

  function handleEvent(e) {
    // negate clauses
    if (!e.target.hasAttribute(UISelectors.attr)) return;
    // for checkboxes on change event (change event not working on tab' titles because of bs3 e.pereventDefault call)
    if ((e.target.type === 'checkbox') & (e.type === 'change')) return;
    // for combos on click event
    if ((e.target.type === 'select-one') & (e.type === 'click')) return;

    e.stopPropagation();

    let targetElems = getTargets(e);

    targetElems.forEach((targetElem) => {
      let active = isActive(e);

      // toggle stripe class
      active
        ? targetElem.classList.remove(UISelectors.classStripe)
        : targetElem.classList.add(UISelectors.classStripe);

      // find all form elements in the area and make them read-only
      targetElem
        .querySelectorAll(UISelectors.tagsFormElems)
        .forEach((formElem) => {
          if (formElem !== e.target) {
            formElem.tagName !== 'BUTTON'
              ? formElem.toggleAttribute('readonly', !active)
              : formElem.toggleAttribute('disabled', !active);
          }
        });
    });
  }

  // get elems targeted by click  must be disabled/enabled
  function getTargets(e) {
    let targetElems = [];

    // first check closest parent, if exists, only select the parent
    // else check inside respective slide (for slide-manager)
    // else check the whole DOM and select all
    if (e.target.closest(e.target.dataset.toggleFormTarget)) {
      targetElems.push(e.target.closest(e.target.dataset.toggleFormTarget));
    } else if (
      e.target.closest('.ccm-slide-entry') &&
      e.target
        .closest('.ccm-slide-entry')
        .querySelectorAll(e.target.dataset.toggleFormTarget).length
    ) {
      targetElems = e.target
        .closest('.ccm-slide-entry')
        .querySelectorAll(e.target.dataset.toggleFormTarget);
    } else if (document.querySelectorAll(e.target.dataset.toggleFormTarget).length) {
      targetElems = document.querySelectorAll(e.target.dataset.toggleFormTarget);
    }

    return targetElems;
  }

  // check whether the targets should be activat or not
  function isActive(e) {
    let active;

    switch (e.target.type) {
      case 'checkbox':
        active = e.target.checked;
        // for checkbox items with reverse behavior
        if (e.target.hasAttribute('data-toggle-form-checkbox-reverse')) active = !active;
        break;
      case 'select-one':
        active = JSON.parse(
          e.target.options[e.target.selectedIndex].dataset.toggleFormChecked
        );
        break;
    }

    return active;
  }
};

export { toggleForm };
