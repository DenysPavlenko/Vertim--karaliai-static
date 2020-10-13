export default () => {
  const $catalogFilters = $('.js-catalog-filters');
  // Return if $catalogFilters don't exist
  if (!$catalogFilters.length) { return; }

  $catalogFilters.each((i, elem) => {
    const $this = $(elem);
    const $resetButton = $this.find('.catalog__filter-reset');
    $resetButton.on('click', () => {
      $this.find('.checkbox__input').prop('checked', false);
    });
  });
}
