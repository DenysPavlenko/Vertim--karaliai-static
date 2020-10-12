export default () => {
  const $editableTexts = $('.js-editable-text');
  // Return if $editableTexts don't exist
  if (!$editableTexts.length) { return; }

  $editableTexts.each((i, elem) => {
    const $editableText = $(elem);
    const $icon = $editableText.find('.editable-text__append-icon');
    const $button = $editableText.find('.editable-text__append-button');
    $editableText.on('focus', () => {
      $icon.hide();
      $button.show();
    });
    $editableText.on('focusout', () => {
      $icon.show();
      $button.hide();
    });
  });
}
