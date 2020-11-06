/**
 * Whale Assets: Select animation effect
 */

const animationSelector = function () {
  const version = '2.0.0';
  // console.log(`animationSelector version ${version}`);

  const animationArea = $('#form_animation');
  if (animationArea.length === 0) return;

  // elems to animate
  const elems = animationArea.find('.animation-screen *');
  // form elems
  const selectAnimationEffect = animationArea.find('#animationEffect');
  const textAnimationDuration = animationArea.find('#animationDuration');
  const textAnimationDelay = animationArea.find('#animationDelay');
  const textAnimationSequenceDelay = animationArea.find('#animationSequenceDelay');

  const selectAnimationRepeat = animationArea.find('.animation-repeat');

  selectAnimationEffect
    .add(textAnimationDuration)
    .add(textAnimationDelay)
    .add(textAnimationSequenceDelay)
    .change(displayAnimation);
  selectAnimationRepeat.click(displayAnimation);

  function displayAnimation() {
    let animClassSuffix = `webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend`;
    let animClass = `animated ${selectAnimationEffect.val()}`;
    let animCss = `
      -webkit-animation-duration: ${textAnimationDuration.val()}ms;
      animation-duration: ${textAnimationDuration.val()}ms;
      -webkit-animation-delay: ${textAnimationDelay.val()}ms;
      animation-delay: ${textAnimationDelay.val()}ms;
    `;

    elems.attr('style', animCss);
    elems.css('visibility', 'hidden');
    elems.each(function (index) {
      let elem = $(this);
      setTimeout(function () {
        elem.css('visibility', 'visible');
        elem.addClass(animClass).one(animClassSuffix, function () {
          $(this).removeClass(animClass);
        });
      }, (index + 1) * textAnimationSequenceDelay.val());
    });
  }
};

export { animationSelector };
