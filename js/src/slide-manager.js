/**
 * Whale Assets: Fill up slide data with image title/description
 */

const slideManager = function () {
  const version = '2.0.0';
  // console.log(`slideManager version ${version}`);

  // remove slide
  $('body').on('click', 'a.remove-slide', function (e) {
    e.preventDefault();
    if (confirm('Do you want to remove this slide?')) {
      $(this)
        .closest('div.ccm-slide-entry')
        .fadeOut(300, function () {
          $(this).remove();
          reindexItems();
        });
    }
  });

  // make slides sortable
  $('.ccm-slide-entries').sortable({
    handle: 'a.move-slide',
    cursor: 'move',
    tolerance: 'pointer',
    update: function (event, ui) {
      reindexItems();
    },
  });

  // re-index items after sort (for active checkbox sake)
  function reindexItems() {
    $('.ccm-slide-entry').each(function (index) {
      $(this).attr('id', 'item-' + index);
      $(this).find('input[name="itemID[]"]').val(index);
      $(this).find('input[name="itemActive[]"]').val(index);
    });
  }

  // T|D buttons
  $('#fill-titles')
    .add('#fill-descriptions')
    .click(function (e) {
      let slides = $('.ccm-slide-entry');

      if (slides.length == 0) {
        alert('First add some slides!');
        return;
      }

      if (this.id === 'fill-titles') {
        slides.each(function (index, el) {
          $(el).find('input[name="itemHeader[]"]').val($(el).find('input.image-itemImageID').attr('data-title'));
        });
        return;
      }

      if (this.id === 'fill-descriptions') {
        slides.each(function (index, el) {
          $(el)
            .find('textarea[name="itemDescription[]"]')
            .val($(el).find('input.image-itemImageID').attr('data-description'));
        });
        return;
      }
    });
};

export { slideManager };
