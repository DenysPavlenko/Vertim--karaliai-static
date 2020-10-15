export default () => {
  const $dropdowns = $('.js-name-select-dropdown');
  const $table = $('.js-table');
  // Return if $dropdowns || table don't exist
  if (!$dropdowns.length || !$table.length) { return; }
  const $tableTr = $table.find('.js-table-tr');
  const $tableCheckboxes = $table.find('.js-table-checkbox');

  $dropdowns.each((i, elem) => {
    const $dropdown = $(elem);
    const $buttons = $dropdown.find('.name-select-dropdown__button');
    $buttons.on('click', (e) => {
      const $button = $(e.currentTarget);
      const action = $button.attr('data-action');
      $buttons.removeClass('is-active');
      $button.addClass('is-active');
      handleCheckboxes(action);
      handleTableRows(action);
    });
  });

  function handleCheckboxes(action) {
    const $input = $tableCheckboxes.find('input');
    $input.prop('checked', action === 'select' ? true : false);
  }

  function handleTableRows(action) {
    if (action === 'select') {
      $tableTr.addClass('is-checked');
    } else {
      $tableTr.removeClass('is-checked');
    }
  }
}
