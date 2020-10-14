export default () => {
  const $buttonsWrap = $('.js-suspend-buttons');
  // Return if $buttonsWrap don't exist
  if (!$buttonsWrap.length) { return; }
  const $buttons = $buttonsWrap.find('button');

  $buttons.each((i, elem) => {
    const $button = $(elem);
    $button.on('click', () => {
      const $siblingButton = $button.siblings();
      $siblingButton
        .removeClass('d-none')
        .show();
      $button.hide();
    });
  });
}
