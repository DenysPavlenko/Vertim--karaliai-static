export default () => {
  const $editableTexts = $('.js-editable-text');
  // Return if $editableTexts don't exist
  if (!$editableTexts.length) { return; }

  $editableTexts.each((i, elem) => {
    const $editableText = $(elem);
    const $input = $editableText.find('.editable-text__input');
    const $editableTitle = $editableText.find('.editable-text__title');
    const $icon = $editableText.find('.editable-text__append-icon');
    const $button = $editableText.find('.editable-text__append-button');
    $editableTitle.on('focus', () => {
      $icon.hide();
      $button.show();
    });
    $editableTitle.on('focusout', () => {
      $icon.show();
      $button.hide();
    });
    $editableTitle.on('input', () => {
      const value = $editableTitle.text();
      const regex = new RegExp(/\s{2}/, 'g');
      if (regex.test(value)) {
        $editableTitle.text(value.replace(regex, ''));
      }
    });
  });
}
