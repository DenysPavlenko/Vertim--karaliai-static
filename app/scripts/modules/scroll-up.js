export default function () {
  var $button = $('.js-scroll-up');
  var $html = $('html, body');

  $button.on('click', function () {
    $html.animate({ scrollTop: 0 });
  });
}
