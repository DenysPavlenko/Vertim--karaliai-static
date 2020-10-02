export default function () {
  var $selects = $('.js-select');

  $selects.each(function () {
    var $select = $(this);
    var $selectLabel = $select.find('.js-select-label');
    var selectedOption = $selectLabel.attr('data-selected');
    var $scrollbar = $select.find('[data-select-simplebar]');
    var $optionsWrap = $select.find('.js-select-wrap');
    var $options = $select.find('.js-select-option');
    var $input = $select.find('.js-select-input');
    var $search = $select.find('.js-select-search');
    var optionsWrapWidth;
    // Toggle select on label click
    $selectLabel.on('click', function () {
      toggleSelect();
      optionsWrapWidth = optionsWrapWidth ? optionsWrapWidth : $optionsWrap.width();
      $optionsWrap.css('width', optionsWrapWidth);
      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }
    });
    // Select option click logic
    $options.each(function () {
      var $option = $(this);
      var optionData = $option.attr('data-option');
      if (selectedOption.toLowerCase() === optionData.toLowerCase()) {
        $option.addClass('is-selected');
      }
      $option.on('click', function (e) {
        e.stopPropagation();
        var optionContent = $option.html();
        $selectLabel.attr('data-selected', optionData);
        $selectLabel.html(optionContent);
        $input.attr('value', optionData);
        $options.removeClass('is-selected');
        $option.addClass('is-selected');
        collapseSelect();
      });
    });
    // Select search
    $search.on('input', function (e) {
      var value = e.target.value.toLowerCase();
      $options.each(function () {
        var $option = $(this);
        var $optionText = $option.find('span').text().toLowerCase();
        if ($optionText.indexOf(value) == -1) {
          $option.hide();
        } else {
          $option.show();
        }
      });
    });
    // Collapse select on document click
    $(document).on('click', function (e) {
      if ($(e.target).parents('.js-select')[0] !== $select[0]) {
        collapseSelect();
      }
    });

    // Toggle select
    function toggleSelect() {
      $select.toggleClass('is-expanded');
      $optionsWrap.fadeToggle(100, function () {
        if ($search) {
          $search.val('');
        }
        $options.each(function () {
          var $option = $(this)
          $option.css('display') === 'none' && $option.show();
        });
      });
    }
    // Collapse select
    function collapseSelect() {
      $select.removeClass('is-expanded');
      $optionsWrap.fadeOut(100, function () {
        if ($search) {
          $search.val('');
        }
        $options.each(function () {
          var $option = $(this)
          $option.css('display') === 'none' && $option.show();
        });
      });
    }
  });
}
