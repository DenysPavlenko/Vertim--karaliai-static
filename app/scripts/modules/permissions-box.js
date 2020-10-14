export default () => {
  const $boxes = $('.js-permissions-box')
  // Return if $boxes doesn't exist
  if ($boxes.length === 0) { return; }

  $boxes.each((i, elem) => {
    const $box = $(elem);
    const $boxToggle = $box.find('.permissions-box__toggle');
    const $boxContent = $box.find('.permissions-box__content');

    $boxToggle.on('click', () => {
      $boxToggle.toggleClass('is-active');
      $boxContent.fadeToggle();
    });
  });
}
