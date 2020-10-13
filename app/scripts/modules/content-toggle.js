export default () => {
  const $buttons = $('[data-content-toggle-button]')
  // Return if $buttons don't exist
  if (!$buttons.length) { return; }

  $buttons.each((i, elem) => {
    const $button = $(elem);
    $button.on('click', () => {
      const contentName = $button.attr('data-content-toggle-button');
      const content = $(`[data-content-toggle-content="${contentName}"]`);
      content.fadeToggle();
    });
  });
}
