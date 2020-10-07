export default function () {
  const $selectors = $('[data-radio-toggle]');
  const $toggleContent = $('[data-radio-toggle-content]');

  // Return if $selectors doesn't exist
  if (!$selectors.length) { return; }

  $toggleContent.hide();

  $selectors.each((i, elem) => {
    const $radio = $(elem);
    const name = $radio.attr('name');
    const value = $radio.attr('value');
    const $radios = $(`input[name="${name}"]`);
    const $content = $(`[data-radio-toggle-content="${name}"]`);
    $radios.on('click', function () {
      var $this = $(this);
      if ($this.is(":checked") && $this.attr('value') === value) {
        $content.fadeIn();
      } else {
        $content.fadeOut();
      }
    });
  });
}
