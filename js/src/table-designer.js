/**
 * Whale Assets: Table Designer
 */

const tableDesigner = function () {
  const version = '2.0.0';
  // console.log(`tableDesigner version ${version}`);

  const tableDesigner = $('#table-designer');
  if (tableDesigner.length === 0) return;

  const tableX = tableDesigner.find('input#tableX');
  const tableY = tableDesigner.find('input#tableY');

  // templates
  const templateRow = _.template($('#rowTemplate').html());
  const templateCell = _.template($('#cellTemplate').html());
  const templateCellHeader = _.template($('#cellHeaderTemplate').html());

  initialize();
  makeItemsSortable();
  customScroll();

  tableDesigner.on('click', '.btn', clickHandler);

  function initialize() {
    for (let i = 1; i <= tableX.val(); i++) addRow(true);
    for (let i = 1; i <= tableY.val(); i++) addCol(true);

    tableDesigner.find('.cell input').each(function (index) {
      $(this).val(
        initialItemsValue[index] && initialItemsValue[index]['value'] ? initialItemsValue[index]['value'] : ''
      );
    });
  }

  function clickHandler() {
    // decide based on clicked button id
    switch (this.id) {
      case 'btn-clear-row':
        clearRow($(this));
        break;
      case 'btn-clear-col':
        clearCol($(this));
        break;
      case 'btn-remove-row':
        removeRow($(this));
        break;
      case 'btn-remove-col':
        removeCol($(this));
        break;
      case 'btn-add-row':
        addRow();
        break;
      case 'btn-add-col':
        addCol();
        break;
    }
  }

  function clearRow(elem) {
    if (confirm('Do you want to clear this row?')) {
      elem.closest('.table-row').find('input').val('');
    }
  }

  function clearCol(elem) {
    if (confirm('Do you want to clear this column?')) {
      let y = elem.closest('.cell').index();
      tableDesigner.find('.table-row').find(`.cell:eq(${y})`).find('input').val('');
    }
  }

  function removeRow(elem) {
    if (confirm('Do you want to remove this row?')) {
      elem.closest('.table-row').fadeOut(function () {
        $(this).remove();
        highlightHeader();
      });
      updateTableX(-1);
    }
  }

  function removeCol(elem) {
    if (confirm('Do you want to remove this column?')) {
      let y = elem.closest('.cell').index();
      tableDesigner
        .find('.table-row')
        .find(`.cell:eq(${y})`)
        .fadeOut(function () {
          $(this).remove();
        });
      updateTableY(-1);
    }
  }

  function addRow(init = false) {
    // let x = tableDesigner.find('.table-row').length;
    let y = tableDesigner.find('.table-header .cell').length;

    //add row:
    tableDesigner.append(templateRow);
    for (let i = 1; i < y; i++) tableDesigner.find('.table-row:last-child').append(templateCell);
    
    // on start, don't increament (the initial value is alredy set)
    if (!init) updateTableX(1);
  }

  function addCol(init = false) {
    // add col:
    tableDesigner.find('.table-row').each(function (index) {
      if (index === 0) {
        $(this).append(templateCellHeader);
      } else {
        $(this).append(templateCell);
      }
    });

    // on start, don't increament (the initial value is alredy set)
    if (!init) updateTableY(1);
    
    customScroll();
    makeItemsSortable();
  }

  function updateTableX(i) {
    tableX.val(parseInt(tableX.val()) + i);
  }

  function updateTableY(i) {
    tableY.val(parseInt(tableY.val()) + i);
  }

  // highlight first row as a table header
  function highlightHeader() {
    tableDesigner.find('.table-row-bold').removeClass('table-row-bold');
    tableDesigner.find('.table-row:eq(1)').addClass('table-row-bold');
  }

  function makeItemsSortable() {
    // id of items wrapper
    tableDesigner.sortable({
      items: 'div.table-row:not(div.table-header)',
      handle: '#btn-move-row',
      cursor: 'move',
      tolerance: 'pointer',
      update: function (event, ui) {
        highlightHeader();
      },
      create: function (event, ui) {
        highlightHeader();
      },
    });
  }

  // custom scroll
  function customScroll() {
    if ($.fn.mCustomScrollbar) {
      $('#scrollable_area').mCustomScrollbar({
        axis: 'x',
        theme: 'inset-2-dark',
        alwaysShowScrollbar: 1,
        advanced: {
          autoExpandHorizontalScroll: true,
        },
      });
    }
  }
};

export { tableDesigner };
