export default function () {
  var $selectors = $('[data-radio-toggle]');
  var $toggleContent = $('[data-radio-toggle-content]');

  // Return if $selectors doesn't exist
  if (!$selectors.length) { return; }

  $toggleContent.hide();

  $selectors.each(function () {
    var $radio = $(this);
    var name = $radio.attr('name');
    var value = $radio.attr('value');
    var $radios = $('input[name=' + name + ']');
    var $content = $('[data-radio-toggle-content=' + name + ']');
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
