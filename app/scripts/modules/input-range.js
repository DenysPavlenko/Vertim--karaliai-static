export default () => {
  const $ranges = $('.js-input-range');

  // Return if $ranges doesn't exist
  if ($ranges.length === 0) { return; }

  $ranges.each((i, elem) => {
    const $range = $(elem);
    const $input = $range.find('.input-range__input');
    const $rangeLine = $range.find('.input-range__line');
    const currentRange = $input.val();
    const maxRange = $input.attr('max');

    setLineWidth($rangeLine, currentRange, maxRange);

    $input.on('input', () => {
      const range = $input.val();
      setLineWidth($rangeLine, range, maxRange);
    });
  });

  function setLineWidth(rangeLine, range, maxRange) {
    rangeLine.css('width', range / maxRange * 100 + '%');
  }
}
