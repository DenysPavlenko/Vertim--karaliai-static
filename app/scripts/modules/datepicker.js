export default () => {
  const $datepickers = $('.js-datepicker-input');
  // Return if $datepickers don't exist
  if (!$datepickers.length) { return; }

  $datepickers.each((i, elem) => {
    const datepicker = elem;
    flatpickr(datepicker, {
      disableMobile: true
    });
  });
}
