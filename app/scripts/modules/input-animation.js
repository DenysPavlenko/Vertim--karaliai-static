export default function () {
  const $inputs = $('.js-input-animation');

  // Return if $inputs don't exist
  if (!$inputs.length) { return; }

  $inputs.each(function (i, elem) {
    var $input = $(elem);
    var $inputField = $input.find('.js-input-animation input');
    if ($inputField.val() !== '') {
      $input.addClass('is-active');
    }
    $inputField.on('focus', () => {
      $input.addClass('is-active');
    });
    $inputField.on('focusout', () => {
      if ($inputField.val() === '') {
        $input.removeClass('is-active');
      } else {
        $input.addClass('is-active');
      }
    });
  })
}
