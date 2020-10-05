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
        addWave($option, e);
        collapseSelect(function () {
          $option.addClass('is-selected');
        });
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
          var $option = $(this);
          removeWave($option);
          $option.css('display') === 'none' && $option.show();
        });
      });
    }
    // Collapse select
    function collapseSelect(callback) {
      $select.removeClass('is-expanded');
      $optionsWrap.fadeOut(300, function () {
        if ($search) {
          $search.val('');
        }
        $options.each(function () {
          var $option = $(this);
          removeWave($option);
          $option.css('display') === 'none' && $option.show();
        });
        if (callback) {
          callback();
        }
      });
    }
    // Wave animation
    function addWave(elem, e) {
      var wave, d, x, y;
      if (!elem.find(".select__option-wave").length) {
        elem.prepend("<span class='select__option-wave'></span>")
      }
      var wave = elem.find(".select__option-wave");
      d = Math.max(elem.outerWidth(), elem.outerHeight());
      wave.css({ height: d, width: d });
      x = e.pageX - elem.offset().left - wave.width() / 2;
      y = e.pageY - elem.offset().top - wave.height() / 2;
      wave.css({ top: y + 'px', left: x + 'px' });
      wave.one('animationend', function () {
        wave.remove();
      })
    }
    // Force remove wave animation
    function removeWave(elem) {
      if (elem.find(".select__option-wave").length) {
        elem.find(".select__option-wave").remove();
      }
    }
  });
}
