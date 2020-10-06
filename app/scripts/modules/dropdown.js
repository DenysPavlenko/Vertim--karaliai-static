import checkWindowSize from '../common/check-window-size';
import bp from '../common/breakpoints';

export default function () {
  var $dropdowns = $('.js-dropdown');
  var fadeDuration = 100;
  var $body = $('body');

  // Return if $dropdowns doesn't exist
  if ($dropdowns.length === 0) { return; }

  $dropdowns.each(function () {
    var $dropdown = $(this);
    var $dropdownBody = $dropdown.find('.js-dropdown-body');
    var $dropdownToggle = $dropdown.find('[data-dropdown-toggle]')
    var $scrollbar = $dropdown.find('[data-dropdown-simplebar]');
    var isOpened = false;

    $dropdownToggle.on('click', function () {
      $dropdownToggle.toggleClass('is-active');
      $dropdownBody.fadeToggle(fadeDuration);
      isOpened = !isOpened;
      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }
    });

    $(document).on('click', function (e) {
      if ($(e.target).parents('[data-dropdown]')[0] !== $dropdown[0] && isOpened) {
        isOpened = false;
        $dropdownBody.fadeOut(fadeDuration);
        $dropdownToggle.removeClass('is-active');
        if ($dropdownBody.css('position') === 'fixed') {
          $body.css('overflow-y', 'visible');
        }
      }
    });
  });
}
