export default function () {
  var $selects = $('.js-select');

  $selects.each((i, elem) => {
    let isOpened = false;
    const $select = $(elem);
    const $selectLabel = $select.find('.js-select-label');
    const $selectDropdown = $select.find('.js-select-dropdown');
    const $selectScrollbar = $select.find('[data-select-simplebar]');
    const $optionsContainer = $select.find('.js-select-options');
    const $options = $select.find('.js-select-option');
    const $input = $select.find('.js-select-input');
    const $search = $select.find('.js-select-search');
    const selectedOption = $selectLabel.attr('data-selected') && $selectLabel.attr('data-selected').toLowerCase();
    let selectDropdownWidth;
    // Set a default value to the input if there is a default option
    if (selectedOption) {
      $input.val(selectedOption);
    }
    // Toggle select on label click
    $selectLabel.on('click', () => {
      toggleSelect();
      // Set fixed width to select dropdown
      selectDropdownWidth = selectDropdownWidth ? selectDropdownWidth : $selectDropdown.width();
      $selectDropdown.css('width', selectDropdownWidth);
      // Initialize SimpleBar scroll
      if ($selectScrollbar.length > 0) {
        setTimeout(() => {
          new SimpleBar($selectScrollbar[0]);
        }, 0);
      }
    });
    // Select option click logic
    $options.each((i, elem) => {
      var $option = $(elem);
      // Set is-selected class if the option is selected by default
      var optionData = $option.attr('data-option').toLowerCase();
      if (selectedOption === optionData) {
        $option.addClass('is-selected');
      }
      // Set option by the option click
      $option.on('click', (e) => {
        e.stopPropagation();
        setOption($option);
        collapseSelect();
      });
    });
    // Options arrow navigation
    $select.on('keydown', (e) => {
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
      }
    })
    // Select search
    $search.on('input', (e) => {
      const value = e.target.value.toLowerCase();
      $options.each((i, elem) => {
        const $option = $(elem);
        const $optionText = $option.find('span').text().toLowerCase();
        if ($optionText.indexOf(value) == -1) {
          $option.hide();
        } else {
          $option.show();
        }
      });
    });
    // Collapse select on document click
    $(document).on('click', (e) => {
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
          $option.css('display') === 'none' && $option.show();
        });
      });
    }

    // Set option
    function setOption(option) {
      const optionHtml = option.html();
      const optionData = option.attr('data-option');
      $selectLabel.attr('data-selected', optionData);
      $selectLabel.html(optionHtml);
      $input.attr('value', optionData);
      $options.removeClass('is-selected');
      option.addClass('is-selected');
    }

    // Collapse select
    function collapseSelect() {
      isOpened = false;
      $select.removeClass('is-expanded');
      $selectDropdown.fadeOut(300, () => {
        if ($search) {
          $search.val('');
        }
        $options.each((i, elem) => {
          var $option = $(elem);
          $option.removeClass('is-focused');
          $option.css('display') === 'none' && $option.show();
        });
      });
    }

    // Navigat through options by arrows. Direction can be next() or prev()
    function optionsNavigation(direction) {
      const $selectedOption = $optionsContainer.find('.js-select-option.is-selected');
      const $focusedOption = $optionsContainer.find('.js-select-option.is-focused');
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
  });
}
