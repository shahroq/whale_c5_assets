/**
 * Whale Assets: Slide Up/Down panel
 * panel should contain following attributes
 *    data-toggle-panel
 *    data-toggle-panel-target="#target-to-toggle"
 *    data-toggle-panel-status="visible/invisible" (can be left out, default: visible)
 * icon wrapper (a tag) should contain following attributes
 *    data-toggle-panel-icon-wrapper
 */

const togglePanel = function () {
  const version = '2.0.0';
  // console.log(`togglePanels version ${version}`);

  const UISelectors = {
    attr: 'data-toggle-panel', // panel
    attrTarget: 'data-toggle-panel-target', // elem to be toggled
    attrStatus: 'data-toggle-panel-status', // status of the panel: visible/invisible
    // iconWrapperClass: 'toggleable-panel-icon', // a tag contains icon
    attrIconWrapper: 'data-toggle-panel-icon-wrapper', // tag contains icon
  };

  document.body.addEventListener('click', handleEvent);

  // on start
  document.querySelectorAll(`[${UISelectors.attr}]`).forEach((panel) => {
    syncIcon(panel);
    syncVisibility(panel);
  });

  function handleEvent(e) {
    const iconWrapper = e.target.parentElement; // wrapping a

    // negate clause
    // if (!iconWrapper.classList.contains(UISelectors.iconWrapperClass)) return;
    if (!iconWrapper.hasAttribute(UISelectors.attrIconWrapper)) return;

    e.preventDefault();

    const panel = iconWrapper.closest(`[${UISelectors.attr}]`);

    toggleStatusAttribute(panel);
  }

  function toggleStatusAttribute(panel) {
    panel.setAttribute(
      `${UISelectors.attrStatus}`,
      panel.getAttribute(`${UISelectors.attrStatus}`) === 'invisible' ? 'visible' : 'invisible'
    );


    syncIcon(panel);
    syncVisibility(panel);
  }

  function syncIcon(panel) {
    const status = panel.getAttribute(`${UISelectors.attrStatus}`);
    const icon = panel.querySelector(`[${UISelectors.attrIconWrapper}] i`);

    switch (status) {
      case 'visible':
        icon.classList.toggle('rotate-180', false);
        // icon.classList.toggle('fa-rotate-180', false); // doesn't have animation
        // icon.classList.remove('fa-chevron-down');
        // icon.classList.add('fa-chevron-up');
        break;
      case 'invisible':
        icon.classList.toggle('rotate-180', true);
        // icon.classList.toggle('fa-rotate-180', true);
        // icon.classList.remove('fa-chevron-up');
        // icon.classList.add('fa-chevron-down');
        break;
    }
  }

  function syncVisibility(panel) {
    const status = panel.getAttribute(`${UISelectors.attrStatus}`);
    const target = panel.getAttribute(`${UISelectors.attrTarget}`); // id/class of elem to toggled inside closest panel
    const targetElem = panel.querySelector(target);

    switch (status) {
      case 'visible':
        // 1. jquery slideUp
        $(targetElem).stop(true, true).slideDown();

        // 2. js (without animation)
        // targetElem.style.display = null;

        // 3. js slide (not perfect)
        /*
        targetElem.style.height = `${targetElem.clientHeight}px`;
        console.log(targetElem.style.height);
        targetElem.classList.toggle('closed');
        */
        break;
      case 'invisible':
        // 1. jquery slideUp
        $(targetElem).stop(true, true).slideUp();

        // 2. js (without animation)
        // targetElem.style.display = 'none';

        // 3. js slide (not perfect)
        /*
        targetElem.style.height = `${targetElem.clientHeight}px`;
        console.log(targetElem.style.height);
        targetElem.classList.toggle('closed');
        */
        break;
    }
  }
};

export { togglePanel };
