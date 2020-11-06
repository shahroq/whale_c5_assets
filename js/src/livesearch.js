/**
 * Whale Assets: Live search nodes
 * It considers nodes with `data-livesearch-node` attr inside `data-livesearch-nodes` attri
 * & searches:
 *    1: content of elems with `data-livesearch-node-data` attr
 *    2: content of label tags
 *    3: form values
 *    4: value of data-livesearch-data="search me!"
 */

const livesearch = function () {
  const version = '2.0.0';
  // console.log(`livesearch version ${version}`);

  const UISelectors = {
    attrNodes: 'data-livesearch-nodes',
    attrNode: 'data-livesearch-node',
    classNodeLimiter: '',
    // classNodeLimiter: '.well.general-general',
    // classNodeLimiter: '.well.general-accessibility',
    attrFormPod: 'data-livesearch-form-pod',
    attrInputQuery: 'data-livesearch-input',
    atrLength: 'data-livesearch-length',
    icon: 'span.fa',
  };

  // elements:
  const nodes = document.querySelectorAll(
      `[${UISelectors.attrNodes}] ${UISelectors.classNodeLimiter} [${UISelectors.attrNode}]`
    ),
    formPod = document.querySelector(`[${UISelectors.attrFormPod}]`);

  // return if required elems are not included in the DOM
  if (
    // !nodes.length ||
    !formPod
  )
    return;

  const inputQuery = formPod.querySelector(`[${UISelectors.attrInputQuery}]`),
    elemLength = formPod.querySelector(`[${UISelectors.atrLength}]`),
    elemIcon = formPod.querySelector(UISelectors.icon);

  // return if required elems are not included in the DOM
  if (!inputQuery || !elemLength || !elemIcon) return;

  let query = '';
  let rsltLengthTotal = nodes.length;

  // set total
  displayRsltLength(rsltLengthTotal);

  // collect data of each node & store it in the node
  nodes.forEach((node) => {
    node.livesearchData = collectNodeData(node);
  });

  // update placeholder & set focus
  inputQuery.setAttribute(
    'placeholder',
    inputQuery.getAttribute('placeholder').replace('all', 'all ' + rsltLengthTotal)
  );
  inputQuery.focus();

  // bind searchfield
  inputQuery.addEventListener('keyup', queryNodes);

  // bind icon click
  elemIcon.addEventListener('click', clearQuery);

  // collect a node data and return them as an array: terms
  function collectNodeData(node) {
    let terms = [];

    // 1. content of tags that have `livesearch-node-data` class
    // 2. content of label tags
    // 3. form values (input, textarea, select, ...)
    node
      .querySelectorAll(
        '[data-livesearch-node-data], label, input[type="text"], textarea, select option, .ccm-file-selector-file-selected-title'
      )
      .forEach((elem) => {
        if (elem.value) terms.push(elem.value);
        if (elem.textContent && elem.textContent != elem.value) terms.push(elem.textContent);
      });

    // 4. data included on any attribute start with data-livesearch-data='search me!'
    if (node.dataset.livesearchData) terms.push(node.dataset.livesearchData);

    return terms;
  }

  // search nodes
  function queryNodes(e) {
    query = e.target.value.trim().toLowerCase();
    const queryRegex = RegExp(query, 'i');

    let len = rsltLengthTotal; // number of occurrence for this search term

    // show all nodes if the query is empty
    if (!query) {
      nodes.forEach((node) => {
        node.style.display = null;
      });

      displayRsltLength(len);

      return;
    }

    // iterate through nodes data (livesearchData) & query each node data
    nodes.forEach((node) => {
      let found = node.livesearchData.find((term) => queryRegex.test(term));
      if (found) {
        node.style.display = null;
      } else {
        node.style.display = 'none';
        len--;
      }
    });

    displayRsltLength(len);
  }

  function displayRsltLength(len) {
    elemLength.textContent = len;

    // cosmetics
    formPod.classList.remove('has-success', 'has-error');
    elemIcon.classList.remove('fa-remove');

    if (!query && len === rsltLengthTotal) {
      // do nothing
    } else if (len === 0) {
      formPod.classList.add('has-error');
      elemIcon.classList.add('fa-remove');
    } else {
      // found something: between 1 & total-1
      formPod.classList.add('has-success');
      elemIcon.classList.add('fa-remove');
    }
  }

  function clearQuery(e) {
    if (e.target.classList.contains('fa-remove')) {
      inputQuery.value = '';

      // dispatch keyup event on tf manually
      inputQuery.dispatchEvent(new KeyboardEvent('keyup'));
    }
  }

  /*
  return {
    logNodes: function() {
      console.log(nodes);
    }
  }
  */
};

export { livesearch };
