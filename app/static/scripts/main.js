'use strict';

function select () {
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
        collapseSelect();
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
      }
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
      var optionHtml = option.html();
      var optionData = option.attr('data-option');
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
      $selectDropdown.fadeOut(300, function () {
        if ($search) {
          $search.val('');
        }
        $options.each(function () {
          var $option = $(this);
          $option.removeClass('is-focused');
          $option.css('display') === 'none' && $option.show();
        });
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
  });
}

function inputAnimation () {
  var $inputs = $('.js-input-animation');

  // Return if $inputs don't exist
  if (!$inputs.length) { return; }

  $inputs.each(function () {
    var $input = $(this);
    var $inputField = $input.find('.js-input-animation-field');
    $inputField.each(function () {
      if ($(this).val() !== '') {
        $input.addClass('is-active');
      }
    });
    $inputField.on('focus', function () {
      $input.addClass('is-active');
    });
    $inputField.on('focusout', function () {
      if ($inputField.val() === '') {
        $input.removeClass('is-active');
      } else {
        $input.addClass('is-active');
      }
    });
  });
}

function scrollUp () {
  var $button = $('.js-scroll-up');
  var $html = $('html, body');

  $button.on('click', function () {
    $html.animate({ scrollTop: 0 });
  });
}

function radioToggleContent () {
  var $selectors = $('[data-radio-toggle]');
  var $toggleContent = $('[data-radio-toggle-content]');

  // Return if $selectors doesn't exist
  if (!$selectors.length) { return; }

  $toggleContent.hide();

  $selectors.each(function () {
    var $radio = $(this);
    var name = $radio.attr('name');
    var value = $radio.attr('value');
    var $radios = $('input[name=' + name + ']');
    var $content = $('[data-radio-toggle-content=' + name + ']');
    $radios.on('click', function () {
      var $this = $(this);
      if ($this.is(":checked") && $this.attr('value') === value) {
        $content.fadeIn();
      } else {
        $content.fadeOut();
      }
    });
  });
}

function dragAndDropBox () {
  var $boxes = $('.js-drag-and-drop-box');
  // Return if $boxes don't exist
  if (!$boxes.length) { return; }

  $boxes.each(function () {
    var box = this;
    new Dropzone(box, {
      previewTemplate: document.querySelector('.drag-and-drop-box__tpl').innerHTML,
      url: "/",
      uploadprogress: function (file, progress) {
        var $document = $(file.previewElement);
        $document.find('[data-dz-uploadprogress]').css({
          width: progress + 'px',
          opacity: 1 - progress / 100
        });
      },
      init: function () {
        this.on('addedfile', function () {
          var $box = $(this.element);
          var element = $box.find('.document-list-item');
          var wrapper = $box.find('.simplebar-content');
          wrapper.append(element);
        });
      }
    });
  });
}

function modal () {
  var $modalAuto = $('[data-modal-auto]');
  var $modalOpen = $('[data-modal-open]');
  var $modalClose = $('[data-modal-close]');

  // Open on widnow load
  if ($modalAuto.length > 0) {
    $modalAuto.each(function () {
      var $modal = $(this);
      createScrollBar($modal);
      $modal.modal({
        closeExisting: false,
        showClose: false
      });
    });
  }

  $modalClose.on('click', function () {
    $.modal.close();
  });

  // Return if $modalOpen doesn't exist
  if ($modalOpen.length === 0) { return; }

  $modalOpen.on('click', function () {
    var $this = $(this);
    var modalName = $this.attr('data-modal-open');
    var $modal = $('[data-modal="' + modalName + '"]');
    createScrollBar($modal);
    $modal.modal({
      closeExisting: false,
      showClose: false
    });
  });

  function createScrollBar(modal) {
    var $scrollBar = modal.find('[data-modal-simplebar]');
    if ($scrollBar.length > 0) {
      setTimeout(function () {
        new SimpleBar($scrollBar[0]);
      }, 0);
    }
  }
}

function datepicker () {
  var $datepickers = $('.js-datepicker-input');
  // Return if $datepickers don't exist
  if (!$datepickers.length) { return; }

  $datepickers.each(function () {
    var datepicker = this;
    flatpickr(datepicker, {
      disableMobile: true
    });
  });
}

function dropdown () {
  var $dropdowns = $('.js-dropdown');
  var fadeDuration = 100;
  var $body = $('body');

  // Return if $dropdowns doesn't exist
  if ($dropdowns.length === 0) { return; }

  $dropdowns.each(function () {
    var $dropdown = $(this);
    var $dropdownBody = $dropdown.find('.js-dropdown-body');
    var $dropdownToggle = $dropdown.find('[data-dropdown-toggle]');
    var $scrollbar = $dropdown.find('[data-dropdown-simplebar]');
    var isOpened = false;

    $dropdownToggle.on('click', function () {
      $dropdownToggle.toggleClass('is-active');
      $dropdownBody.fadeToggle(fadeDuration);
      isOpened = !isOpened;
      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }
    });

    $(document).on('click', function (e) {
      if ($(e.target).parents('[data-dropdown]')[0] !== $dropdown[0] && isOpened) {
        isOpened = false;
        $dropdownBody.fadeOut(fadeDuration);
        $dropdownToggle.removeClass('is-active');
        if ($dropdownBody.css('position') === 'fixed') {
          $body.css('overflow-y', 'visible');
        }
      }
    });
  });
}

function tabs () {
  var $tabsContainers = $('.js-tabs');

  // Return if $tabsContainers doesn't exist
  if ($tabsContainers.length === 0) { return; }

  $tabsContainers.each(function () {
    var $tabsContainer = $(this);
    var $tabs = $tabsContainer.find('.js-tabs-tab');

    $tabs.on('click', function () {
      var $tab = $(this);
      var tabName = $tab.attr('data-tab');
      var $content = $('[data-content="' + tabName + '"]');
      var $activeTab = $tabsContainer.find('.js-tabs-tab.is-active');
      var activeTabName = $activeTab.attr('data-tab');
      var $activeContent = $('[data-content="' + activeTabName + '"]');

      $tabs.removeClass('is-active');
      $tab.addClass('is-active');
      $activeContent.fadeOut(150, function () {
        $content.fadeIn(150);
      });
    });
  });
}

// On document ready
$(function () {
  svg4everybody();
  select();
  inputAnimation();
  scrollUp();
  radioToggleContent();
  dragAndDropBox();
  modal();
  datepicker();
  dropdown();
  tabs();
});

// On window load
$(window).on('load', function () { });
