export default function () {
  var $selects = $('.js-select');

  $selects.each(function () {
    var isOpened = false;
    var $select = $(this);
    var $selectLabel = $select.find('.js-select-label');
    var $selectDropdown = $select.find('.js-select-dropdown');
    var $selectScrollbar = $select.find('[data-select-simplebar]');
    var $optionsContainer = $select.find('.js-select-options');
    var $options = $select.find('.js-select-option');
    var $input = $select.find('.js-select-input');
    var $search = $select.find('.js-select-search');
    var selectedOption = $selectLabel.attr('data-selected') && $selectLabel.attr('data-selected').toLowerCase();
    var selectDropdownWidth;
    // Set a default value to the input if there is a default option
    if (selectedOption) {
      $input.val(selectedOption);
    }
    // Toggle select on label click
    $selectLabel.on('click', function () {
      toggleSelect();
      // Set fixed width to select dropdown
      selectDropdownWidth = selectDropdownWidth ? selectDropdownWidth : $selectDropdown.width();
      $selectDropdown.css('width', selectDropdownWidth);
      // Initialize SimpleBar scroll
      if ($selectScrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($selectScrollbar[0]);
        }, 0);
      }
    });
    // Select option click logic
    $options.each(function () {
      var $option = $(this);
      // Set is-selected class if the option is selected by default
      var optionData = $option.attr('data-option').toLowerCase();
      if (selectedOption === optionData) {
        $option.addClass('is-selected');
      }
      // Set option by the option click
      $option.on('click', function (e) {
        e.stopPropagation();
        setOption($option);
        addWaveAnimation($option, e);
        collapseSelect(function () {
          $option.addClass('is-selected');
        });
      });
    });
    // Options arrow navigation
    $select.on('keydown', function (e) {
      if (!isOpened) { return; }
      if (e.keyCode === 40) {
        e.preventDefault();
        optionsNavigation('next');
      }
      if (e.keyCode === 38) {
        e.preventDefault();
        optionsNavigation('prev');
      }
      if (e.keyCode === 13) {
        e.preventDefault();
        var $focusedOption = $optionsContainer.find('.js-select-option.is-focused');
        setOption($focusedOption);
        toggleSelect();
        $focusedOption.addClass('is-selected');
      }
    })
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
      isOpened = !isOpened;
      $select.toggleClass('is-expanded');
      $selectDropdown.fadeToggle(100, function () {
        // Clear search bar
        if ($search) {
          $search.val('');
        }
        $options.each(function () {
          var $option = $(this);
          stopWaveAnimation($option);
          $option.css('display') === 'none' && $option.show();
        });
      });
    }

    // Set option
    function setOption(option) {
      var optionHtml = option.html();
      var optionData = option.attr('data-option');
      $selectLabel.attr('data-selected', optionData);
      $selectLabel.html(optionHtml);
      $input.attr('value', optionData);
      $options.removeClass('is-selected');
    }

    // Collapse select
    function collapseSelect(callback) {
      isOpened = false;
      $select.removeClass('is-expanded');
      $selectDropdown.fadeOut(300, function () {
        if ($search) {
          $search.val('');
        }
        $options.each(function () {
          var $option = $(this);
          stopWaveAnimation($option);
          $option.removeClass('is-focused');
          $option.css('display') === 'none' && $option.show();
        });
        if (callback) {
          callback();
        }
      });
    }

    // Navigat through options by arrows. Direction can be next() or prev()
    function optionsNavigation(direction) {
      var $selectedOption = $optionsContainer.find('.js-select-option.is-selected');
      var $focusedOption = $optionsContainer.find('.js-select-option.is-focused');
      if ($selectedOption.length && !$focusedOption.length) {
        if ($selectedOption[direction]().length > 0) {
          $selectedOption[direction]().addClass('is-focused');
        }
      } else if ($focusedOption.length) {
        if ($focusedOption[direction]().length > 0) {
          $focusedOption.removeClass('is-focused');
          $focusedOption[direction]().addClass('is-focused');
        }
      } else if (!$selectedOption.length && !$focusedOption.length) {
        $options.eq(0).addClass('is-focused');
      }
    }

    // Wave animation
    function addWaveAnimation(elem, e) {
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
    function stopWaveAnimation(elem) {
      if (elem.find(".select__option-wave").length) {
        elem.find(".select__option-wave").remove();
      }
    }
  });
}
