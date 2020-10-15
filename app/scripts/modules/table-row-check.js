export default () => {
  const $table = $('.js-table');
  // Return if $table doesn't exist
  if (!$table.length) { return; }
  const $tableCheckboxes = $table.find('.js-table-checkbox');

  $tableCheckboxes.each((i, elem) => {
    const $input = $(elem).find('input');
    $input.on('click', () => {
      const $tr = $input.parents('tr');
      if ($input.prop('checked')) {
        $tr.addClass('is-checked');
      } else {
        $tr.removeClass('is-checked');
      }
    });
  });
}
