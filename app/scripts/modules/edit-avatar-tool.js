import calcRange from '../common/calc-range';

export default function () {
  const $avatarBox = $('.js-edit-avatar-tool');

  // Return if $avatarBox doesn't exist
  if (!$avatarBox.length) { return; }
  const $input = $avatarBox.find('.edit-avatar-tool__range-input');
  const $number = $avatarBox.find('.edit-avatar-tool__number');
  const $image = $avatarBox.find('.edit-avatar-tool__image');

  // Initialize croppie
  let zomm, $slider, min, max, step;
  const cropper = $image.croppie({
    viewport: { width: 200, height: 200, type: 'circle' },
    showZoomer: false,
    enableOrientation: true,
    update: function (params) {
      if (zomm !== params.zoom) {
        if (!$slider) {
          $slider = $('.cr-slider');
          min = $slider.attr('min');
          max = $slider.attr('max');
          step = $slider.attr('step');
        }
        $input.attr({ value: params.zoom, min, max, step })
        setInputRangeValue($input);
        zomm = params.zoom;
      }
    }
  });
  cropper.croppie('bind', {
    url: $image.attr('src'),
    zoom: 0,
    orientation: 1,
  })

  // Set current value to the number
  setInputRangeValue($input);
  // Change input value
  $input.on('input', () => {
    $input.val()
    // Set crop zoom
    cropper.croppie('setZoom', $input.val());
    // Set current value to the number
    setInputRangeValue($input);
  });

  function setInputRangeValue(input) {
    $number.html(calcRange(input))
  }
}
