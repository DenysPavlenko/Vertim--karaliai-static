export default () => {
  const $dropdowns = $('.js-dropdown');
  const fadeDuration = 100;
  const $document = $(document);
  const $body = $('body');
  const $window = $(window);

  // Return if $dropdowns doesn't exist
  if ($dropdowns.length === 0) { return; }

  $dropdowns.each((i, elem) => {
    const $dropdown = $(elem);
    const dropdownName = $dropdown.attr('data-dropdown');
    const $dropdownBox = $dropdown.find('.dropdown__box');
    const $dropdownToggle = $dropdown.find('[data-dropdown-toggle]')
    const $dropdownClose = $(`[data-dropdown-close="${dropdownName}"]`);
    let isOpened = false;

    $dropdownToggle.on('click', () => {
      $dropdownToggle.toggleClass('is-active');
      $dropdownBox.fadeToggle(fadeDuration);
      // if ($dropdownBox.is(':visible')) {
      //   setTimeout(() => {
      //     setPosition($dropdownBox);
      //   }, 0);
      // }
      if ($dropdownBox.css('position') === 'fixed') {
        $body.css('overflow-y', 'hidden');
      }
      isOpened = !isOpened;
    });

    $dropdownClose.on('click', function () {
      $dropdownBox.fadeOut(fadeDuration);
      $dropdownToggle.removeClass('is-active');
      isOpened = false;
      if ($dropdownBox.css('position') === 'fixed') {
        $body.css('overflow-y', 'visible');
      }
    });

    $document.on('click', (e) => {
      if ($(e.target).parents('[data-dropdown]')[0] !== $dropdown[0] && isOpened) {
        isOpened = false;
        $dropdownBox.fadeOut(fadeDuration);
        $dropdownToggle.removeClass('is-active');
        if ($dropdownBox.css('position') === 'fixed') {
          $body.css('overflow-y', 'visible');
        }
      }
    });

    let timeout;
    $window.on('resize', () => {
      clearTimeout(timeout);
      setTimeout(() => {
        if ($dropdownBox.css('position') !== 'fixed' && isOpened && $body.css('overflow-y') === 'hidden') {
          $body.css('overflow-y', 'visible');
        }
      }, 100);
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
