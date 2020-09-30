export default function () {
  var $inputs = $('.js-input-animation');

  // Return if $inputs don't exist
  if ($inputs.length <= 0) { return; }

  $inputs.each(function () {
    var $input = $(this);
    var $inputField = $input.find('.js-input-animation-field');
    $input.on('click', function () {
      $input.addClass('is-active');
      $inputField.trigger('focus');
    });
    $inputField.on('focusout', function () {
      if ($inputField.val() === '') {
        $input.removeClass('is-active');
      } else {
        $input.addClass('is-active');
      }
    });
  })
}
