export default function () {
  var $datepickers = $('.js-datepicker-input');
  // Return if $datepickers don't exist
  if (!$datepickers.length) { return; }

  $datepickers.each(function () {
    var datepicker = this;
    flatpickr(datepicker, {
      disableMobile: true
    });
  });
}
