export default function () {
  const $button = $('.js-scroll-up');
  const $html = $('html, body');

  $button.on('click', () => {
    $html.animate({ scrollTop: 0 });
  });
}
