import calcRange from '../common/calc-range';

export default () => {
  const $ranges = $('.js-input-range');

  // Return if $ranges doesn't exist
  if ($ranges.length === 0) { return; }

  $ranges.each((i, elem) => {
    const $range = $(elem);
    const $input = $range.find('.input-range__input');
    const $rangeLine = $range.find('.input-range__line');
    // Set default range
    setLineWidth($rangeLine, $input);

    // Set range on input
    $input.on('input', () => {
      setLineWidth($rangeLine, $input);
    });
  });

  function setLineWidth(rangeLine, input) {
    rangeLine.css('width', calcRange(input) + '%');
  }
}
