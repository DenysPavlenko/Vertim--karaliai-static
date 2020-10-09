import calcRange from '../common/calc-range';

export default function () {
  const $avatarBox = $('.js-edit-avatar-tool');

  // Return if $avatarBox doesn't exist
  if (!$avatarBox.length) { return; }
  const $range = $avatarBox.find('.edit-avatar-tool__range-input');
  const $number = $avatarBox.find('.edit-avatar-tool__number');
  const $image = $avatarBox.find('.edit-avatar-tool__image');
  const $uploadBtn = $avatarBox.find('.edit-avatar-tool__upload input');

  // Initialize croppie
  let zoom, $slider, min, max, step;
  const cropper = $image.croppie({
    viewport: { width: 200, height: 200, type: 'circle' },
    showZoomer: false,
    enableOrientation: true,
    enableExif: true,
    update: function (params) {
      if (zoom !== params.zoom) {
        if (!$slider) {
          $slider = $('.cr-slider');
        }
        // Get values from the default slider and apply them to the custom one
        if (min !== $slider.attr('min') || max !== $slider.attr('max') || step !== $slider.attr('step')) {
          min = $slider.attr('min');
          max = $slider.attr('max');
          step = $slider.attr('step');
          $range.attr({ min, max, step });
        }
        // Set current value to the custom range
        $range.val(params.zoom);
        // Set current value to the number
        setRangeValue($range);
        zoom = params.zoom;
        // Fire input event on value change
        $range[0].dispatchEvent(new Event('input'));
      }
    }
  });
  cropper.croppie('bind', {
    url: $image.attr('src'),
    zoom: 0,
    orientation: 1,
  });

  // Set crop zoom on custom range change
  $range.on('input', () => {
    $range.val()
    cropper.croppie('setZoom', $range.val());
  });

  // Upload photo
  $uploadBtn.on('change', (e) => {
    readFile(e.currentTarget);
  });

  function setRangeValue(input) {
    $number.html(calcRange(input));
  }

  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        cropper.croppie('bind', {
          url: e.target.result,
          zoom: 0,
          orientation: 1,
        });
      }
      reader.readAsDataURL(input.files[0]);
    }
    else {
      alert("Sorry - you're browser doesn't support the FileReader API");
    }
  }
}
