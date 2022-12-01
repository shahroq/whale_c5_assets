/**
 * Whale Assets: Fill up inputs with data
 * button should contain following attributes
 *    data-template-button
 *    data-template-button-template="..."
 *    data-template-button-target="#target-to-inject template" // for line break: use <br/>
 */

const templateButton = function () {
  const version = '2.0.0';
  // console.log(`templateButton version ${version}`);

  const UISelectors = {
    attrBtn: 'data-template-button',
  };

  document.body.addEventListener('click', handleEvent);

  function handleEvent(e) {
    // negate clause
    if (!e.target.hasAttribute(`${UISelectors.attrBtn}`)) return;

    const template = e.target.dataset.templateButtonTemplate;
    const target = document.querySelector(`[name="${e.target.dataset.templateButtonTarget}"]`);

    if (target) {
      target.value = template ? template.replaceAll('<br/>', '\r\n') : '';
    }
  }
};

export { templateButton };
