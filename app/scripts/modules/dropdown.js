export default () => {
  const $dropdowns = $('.js-dropdown');
  const fadeDuration = 100;
  const $document = $(document);
  const $window = $(window);

  // Return if $dropdowns doesn't exist
  if ($dropdowns.length === 0) { return; }

  $dropdowns.each((i, elem) => {
    const $dropdown = $(elem);
    const dropdownName = $dropdown.attr('data-dropdown');
    const $dropdownBody = $dropdown.find('.dropdown__body');
    const $dropdownToggle = $dropdown.find('[data-dropdown-toggle]')
    const $dropdownClose = $(`[data-dropdown-close="${dropdownName}"]`);
    let isOpened = false;

    $dropdownToggle.on('click', () => {
      $dropdownToggle.toggleClass('is-active');
      $dropdownBody.fadeToggle(fadeDuration);
      // if ($dropdownBody.is(':visible')) {
      //   setTimeout(() => {
      //     setPosition($dropdownBody);
      //   }, 0);
      // }
      isOpened = !isOpened;
    });

    $dropdownClose.on('click', function () {
      $dropdownBody.fadeOut(fadeDuration);
      $dropdownToggle.removeClass('is-active');
      isOpened = false;
    });

    $document.on('click', (e) => {
      if ($(e.target).parents('[data-dropdown]')[0] !== $dropdown[0] && isOpened) {
        isOpened = false;
        $dropdownBody.fadeOut(fadeDuration);
        $dropdownToggle.removeClass('is-active');
      }
    });

    // function setPosition(elem) {
    //   const leftOffset = elem.offset().left;
    //   const rightOffst = $window.width() - (leftOffset + elem.outerWidth());
    //   if (rightOffst < 15) {
    //     elem.css({ 'left': 'auto', 'right': 0 });
    //   } else if (leftOffset < 15) {
    //     elem.css({ 'right': 'auto', 'left': 0 });
    //   }
    // }
  });
}
