import bp from '../common/breakpoints';
import checkWindowSize from '../common/check-window-size';

export default () => {
  const $navigation = $('.js-header-navigation');
  const $burger = $('.js-header-navigation-burger');
  const $document = $(document);
  const $body = $('body');
  let isOpened = false;

  // Return if $burger doesn't exist
  if (!$burger.length) { return; }

  $burger.on('click', () => {
    $burger.toggleClass('is-active');
    $navigation.toggleClass('is-active');
    if ($navigation.hasClass('is-active')) {
      $body.css('overflow-y', 'hidden');
    } else {
      $body.css('overflow-y', 'auto');
    }
    $navigation.one('transitionend', () => {
      isOpened = !isOpened
    });
  });

  $document.on('click', (e) => {
    const $target = $(e.target);
    if ($target[0] !== $navigation[0] && $target.parents('.js-header-navigation')[0] !== $navigation[0] && isOpened) {
      $navigation.removeClass('is-active');
      $burger.removeClass('is-active');
      $body.css('overflow-y', 'auto');
      isOpened = false
    }
  });

  // Show scrollbar if the screen size > bp.xl
  checkWindowSize(`(min-width:${bp.xl}px)`, function (e) {
    if (e.matches) {
      if ($body.css('overflow-y') === 'hidden') {
        $body.css('overflow-y', 'auto');
      }
    }
  });
  // Hide scrollbar if the screen size < bp.xl and navigation is opened
  checkWindowSize(`(max-width:${bp.xl}px)`, function (e) {
    if (e.matches) {
      if ($body.css('overflow-y') === 'auto' && isOpened) {
        $body.css('overflow-y', 'hidden');
      }
    }
  });
}
