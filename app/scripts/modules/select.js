export default function () {
  var $selects = $('.js-select');

  $selects.each(function () {
    var $select = $(this);
    var $selectLabel = $select.find('.js-select-label');
    var $scrollbar = $select.find('[data-select-simplebar]');
    var $options = $select.find('.js-select-options');
    var $input = $select.find('.js-select-input');
    var optionsWidth;
    $select.on('click', function (e) {
      var $target = $(e.target);
      if ($target.parents().hasClass('js-select-footer') || $target.hasClass('js-select-footer')) {
        return;
      }
      $select.toggleClass('is-expanded');
      $options.fadeToggle(100);
      optionsWidth = optionsWidth ? optionsWidth : $options.width();
      $options.css('width', optionsWidth);
      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }
      if ($target.attr('data-option') || $target.parents('.js-select-option')) {
        var $option;
        if ($target.attr('data-option')) {
          $option = $target;
        } else {
          $option = $target.parents('.js-select-option');
        }
        var $optionData = $option.attr('data-option');
        var $optionContent = $option.html();
        $selectLabel.attr('data-selected', $optionData);
        $selectLabel.html($optionContent);
        $input.attr('value', $optionData);
      }
    });

    $(window).on('click', function (e) {
      if ($(e.target).parents('.js-select')[0] !== $select[0]) {
        $select.removeClass('is-expanded');
        $options.fadeOut(100);
      }
    });
  });
}
