/**
 * Whale Assets: Select On Click
 * Select the content on click
 * Element should contain following attributes
 *    data-select-on-click
 *    data-select-on-click-msg=".."  // optional
 */

const selectOnClick = function () {
  const version = '2.0.0';
  // console.log(`selectOnClick version ${version}`);

  const UISelectors = {
    attr: 'data-select-on-click',
    attrMsg: 'data-select-on-click-msg',
  };

  document.body.addEventListener('click', eventHandler);

  function eventHandler(e) {
    // negate clause
    if (!e.target.hasAttribute(UISelectors.attr)) return;

    e.target.select();

    // copy to clipboard
    document.execCommand('copy');

    // alert the user
    const subtitle = document.createElement('em');
    subtitle.className = 'subtitle text-muted op-0';
    subtitle.id = e.timeStamp;

    let msg = e.target.dataset.selectOnClickMsg ? e.target.dataset.selectOnClickMsg : `Copied to clipboard`;
    subtitle.innerHTML = msg;

    e.target.insertAdjacentElement('afterend', subtitle);

    subtitle.classList.add('text-blink');

    setTimeout(() => {
      e.target.parentNode.removeChild(subtitle);
    }, 2000);
  }
};

export { selectOnClick };
