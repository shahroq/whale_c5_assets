/**
 * Whale Assets: API Caller Button
 * Buttons that call an api end point
 * define uri as btn attribute:
 *    data-api-caller-button
 *    data-api-caller-button-uri=""
 *    data-api-caller-button-confirmation="" // leave it empty for intending not to be confirmed
 *    data-api-caller-button-form-id="" // form id
 *    data-api-caller-button-form-ids="" // form element ids to pass as query string, separated by comma
 *    data-api-caller-button-msg-timeout=5000 // in ms/afterthis, the msg will fade out/set zero for no fadedout
 */

const apiCallerButton = function () {
  const version = '2.0.0';
  // console.log(`apiCallerButton version ${version}`);

  const UISelectors = {
    // attr: 'api-caller-button',
    attr: 'data-api-caller-button',
    // classIconDefault: ['fa-sign-out'],
    classIconDefault: [], // get it from current btn
    classIconLoading: ['fa', 'fa-spinner', 'fa-spin'],
  };

  document.body.addEventListener('click', handleEvent);

  function handleEvent(e) {
    // negate clause (in case of the btn or icon inside clicked)
    if (!e.target.hasAttribute(UISelectors.attr) && !e.target.parentNode.hasAttribute(UISelectors.attr)) return;

    e.preventDefault();

    // in case of an icon clicked, set `btn` to the parent element
    const btn = e.target.tagName === 'I' ? e.target.parentNode : e.target;

    const url = btn.dataset.apiCallerButtonUri;
    const confirmation = btn.dataset.apiCallerButtonConfirmation;
    const formId = btn.dataset.apiCallerButtonFormId;
    const formIds = btn.dataset.apiCallerButtonFormIds;
    const msgTimeout = btn.dataset.apiCallerButtonMsgTimeout ? btn.dataset.apiCallerButtonMsgTimeout : 5000;

    if (!url) return;

    if (confirmation && !confirm(confirmation)) return;

    let data = {};

    // from elements: get & prepare form values in order to send them to api
    if (formIds) {
      formIds.split(',').forEach((elemId) => {
        let elem = document.getElementById(elemId);
        if (elem) data[elem.name] = elem.value;
      });
    }

    // from form
    const form = document.getElementById(formId);
    if (form) {
      const formData = new FormData(form);
      for (const [key, value] of formData) data[key] = value;
    }
    data = { data };

    // call the api via fecth
    /*
    // disable btn
    toggleButton(btn, 'disabled');
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        // show an alert reporting the status
        data.success 
          ? displayAlert(data.msg_summary, 'info', msgTimeout) 
          : displayAlert(data.msg_error, 'danger', msgTimeout);

        // enable btn
        toggleButton(btn, 'enabled');
      });
    */

    // call the api via jquery ajax
    $.ajax({
      url,
      method: 'POST',
      data,
      dataType: 'json',
      beforeSend: function () {
        toggleButton(btn, 'disabled');
      },
      success: function (rslt) {
        // show an alert reporting the status
        rslt.success
          ? displayAlert(rslt.msg_summary, 'info', msgTimeout)
          : displayAlert(rslt.msg_error, 'danger', msgTimeout);

        // enable btn
        toggleButton(btn, 'enabled');
      },
      error: function () {
        displayAlert('Unexpected Error', 'danger', msgTimeout);

        // enable btn
        toggleButton(btn, 'enabled');
      },
    });
  }

  function toggleButton(btn, status) {
    const icon = btn.querySelector('i');
    switch (status) {
      case 'disabled':
        btn.classList.add('disabled');

        // keep the current classes, then remove them
        UISelectors.classIconDefault = [].slice.call(icon.classList); // DOMTokenList to array
        icon.classList.remove(...UISelectors.classIconDefault);
        icon.classList.add(...UISelectors.classIconLoading);
        break;
      case 'enabled':
        btn.classList.remove('disabled');

        icon.classList.remove(...UISelectors.classIconLoading);
        icon.classList.add(...UISelectors.classIconDefault);
        // clean the UISelectors.classIconDefault// don't need it?
        // UISelectors.classIconDefault = [];
        break;
    }
  }

  function displayAlert(msg, type = 'info', msgTimeout) {
    const containerClass = 'whale-container';

    const alertDiv = document.createElement('div');

    alertDiv.className = `alert alert-${type}`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${msg}
        &nbsp;<button type="button" class="close" data-dismiss="alert">×</button>
    `;

    document.querySelector(`.${containerClass}`).insertAdjacentElement('afterbegin', alertDiv);

    if (msgTimeout > 0) setTimeout(() => $(alertDiv).fadeOut(), msgTimeout);
  }
};

export { apiCallerButton };
