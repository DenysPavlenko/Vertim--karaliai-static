export default function () {
  const $avatarBox = $('.js-edit-avatar-box');

  // Return if $avatarBox doesn't exist
  if (!$avatarBox.length) { return; }
  const $input = $avatarBox.find('.edit-avatar-box__range-input');
  const $number = $avatarBox.find('.edit-avatar-box__number');
  // Set current value to the number
  setInputRangeValue($input)

  $input.on('input', () => {
    // Set current value to the number
    setInputRangeValue($input)
  });

  function setInputRangeValue(input) {
    const range = $input.val();
    $number.html(range);
  }
}
