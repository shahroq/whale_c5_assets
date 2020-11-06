/**
 * Whale Assets: Loading images/pagelist into the ui
 */

const galleryLoader = function () {
  const version = '2.0.0';
  // console.log(`galleryLoader version ${version}`);

  const galleryTypeSelect = $('select#galleryType');

  const canvasWrapper = $('#canvas-wrapper'); // for applying beat class
  const canvas = $('#canvas'); // ul: should be filled with `li`
  const canvasTags = $('#canvas-tags'); // ul: should be filled with `li`

  const filesetSelect = $('select#fsID');
  const stackSelect = $('select#stackID');

  const galleryInfo = $('#gallery-info');
  const gallerySourceLink = $('#gallery-source-link');

  const positionsInput = $('input#positions');
  const tagsInput = $('input#fTags');

  const ajaxErrorMsg = 'An error occurred, try again.';

  makeTagsSelectable();

  galleryTypeSelect.change(toggleGalleryType);
  toggleGalleryType();

  filesetSelect.change(fetchItems);
  stackSelect.change(fetchItems);

  // initial trigger
  switch (getGalleryType()) {
    case 'images':
      filesetSelect.trigger('change');
      break;
    case 'pages':
      stackSelect.trigger('change');
      break;
  }

  function fetchItems(e) {
    if (e.target.value == 0) {
      drawItems();
      return;
    }

    // uri of api calls
    let uri;
    switch (getGalleryType()) {
      case 'images':
        uri = GET_FILES_URI;
        break;
      case 'pages':
        uri = GET_PAGES_URI;
        break;
    }

    if (!uri) {
      drawItems('');
      return;
    }

    // call api
    $.ajax({
      url: `${uri}/${e.target.value}`,
      dataType: 'json',
      success: function (rslt) {
        display(rslt);
      },
      beforeSend: function () {
        drawItems('', '', true);
      },
      error: function () {
        drawItems('', '', false, ajaxErrorMsg);
      },
    });
  }

  function display(rslt) {
    if (!rslt.success) {
      drawItems('', '', false, rslt.msg_error);
      return;
    }

    // items
    let contentItems = '';
    rslt.data.forEach((item) => {
      contentItems += `
        <li id='${item.id}' title='${item.title}'>
          <img src='${item.thumbnail.src}'/>
        </li>
      `;
    });

    drawItems(contentItems, rslt.msg_summary, false, rslt.msg_error);
    makeItemsSortable();
    canvas.find('li').tooltip();

    // tags
    if (tagsInput.length) {
      let currentTags = tagsInput.val().split(',', 0);
      rslt.tags = Array.from(new Set(currentTags.concat(rslt.tags)));

      let contentTags = '';
      rslt.tags.forEach((item) => {
        contentTags += `
        <li class="label label-default ${currentTags.includes(item) ? 'label-success' : ''}">${item}</li>
      `;
      });
      drawTags(contentTags);
    }
  }

  function toggleGalleryType() {
    drawItems();

    switch (getGalleryType()) {
      case 'images':
        // set the href of link icon based upon gallery type
        gallerySourceLink.attr('href', gallerySourceLink.data('uri-filesets'));
        stackSelect.val(0);

        filesetSelect.show();
        stackSelect.hide();
        break;
      case 'pages':
        gallerySourceLink.attr('href', gallerySourceLink.data('uri-stacks'));
        filesetSelect.val(0);

        stackSelect.show();
        filesetSelect.hide();
        break;
    }
  }

  function getGalleryType() {
    // if only one gallery type, always return 'images'
    return galleryTypeSelect.length ? galleryTypeSelect.val() : 'images';
  }

  function drawItems(canvasContent = '', summaryContent = '', preload = false, msg = '') {
    // canvas
    canvas.html(canvasContent);

    // summary label
    if (!summaryContent) summaryContent = '&nbsp;';
    galleryInfo.html(summaryContent);

    if (msg)
      canvas.html(`
      <p class="text-center text-warning"><strong>${msg}<strong></p>
    `);

    canvasWrapper.toggleClass('beat', preload);
    galleryInfo.toggleClass('beat', preload);
  }

  function drawTags(canvasContent = '') {
    // canvas
    canvasTags.html(canvasContent);
  }

  function makeItemsSortable() {
    if (canvas.hasClass('ui-sortable')) canvas.sortable('destroy');
    if (getGalleryType() === 'images') {
      canvas.sortable({
        containment: canvasWrapper,
        cursor: 'move',
        tolerance: 'pointer',
        update: updatePositionsInput,
      });
      canvas.disableSelection();
      updatePositionsInput();
    }
  }

  function makeTagsSelectable() {
    canvasTags.on('click', 'li', function () {
      $(this).toggleClass('label-success');
      updateTagsInput();
    });
  }

  function updatePositionsInput() {
    positionsInput.val(
      canvas
        .find('li')
        .map(function () {
          return this.id;
        })
        .get()
        .join(',')
    );
  }

  function updateTagsInput() {
    tagsInput.val(
      canvasTags
        .find('li.label-success')
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(',')
    );
  }
};

export { galleryLoader };
