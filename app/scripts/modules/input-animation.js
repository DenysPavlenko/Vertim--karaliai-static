export default function () {
  var $inputs = $('.js-input-animation');

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
