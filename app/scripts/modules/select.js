export default function () {
  var $selects = $('.js-select');

  $selects.each(function () {
    var $select = $(this);
    var $selectLabel = $select.find('.js-select-label');
    var $scrollbar = $select.find('[data-select-simplebar]');
    var $optionsWrap = $select.find('.js-select-options');
    var $options = $select.find('.js-select-option');
    var $input = $select.find('.js-select-input');
    var optionsWrapWidth;
    $select.on('click', function () {
      $select.toggleClass('is-expanded');
      $optionsWrap.fadeToggle(100);
      optionsWrapWidth = optionsWrapWidth ? optionsWrapWidth : $optionsWrap.width();
      $optionsWrap.css('width', optionsWrapWidth);
      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }
    });
    $options.each(function () {
      var $option = $(this);
      $option.on('click', function (e) {
        e.stopPropagation();
        var $optionData = $option.attr('data-option');
        var $optionContent = $option.html();
        $selectLabel.attr('data-selected', $optionData);
        $selectLabel.html($optionContent);
        $input.attr('value', $optionData);
        $select.removeClass('is-expanded');
        $optionsWrap.fadeOut(100);
      });
    });
    $(document).on('click', function (e) {
      if ($(e.target).parents('.js-select')[0] !== $select[0]) {
        $select.removeClass('is-expanded');
        $optionsWrap.fadeOut(100);
      }
    });
  });
}
