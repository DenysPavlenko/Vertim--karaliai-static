'use strict';

function select () {
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
        elem.prepend("<span class='select__option-wave'></span>");
      }
      var wave = elem.find(".select__option-wave");
      d = Math.max(elem.outerWidth(), elem.outerHeight());
      wave.css({ height: d, width: d });
      x = e.pageX - elem.offset().left - wave.width() / 2;
      y = e.pageY - elem.offset().top - wave.height() / 2;
      wave.css({ top: y + 'px', left: x + 'px' });
      wave.one('animationend', function () {
        wave.remove();
      });
    }
    // Force remove wave animation
    function removeWave(elem) {
      if (elem.find(".select__option-wave").length) {
        elem.find(".select__option-wave").remove();
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
});

// On window load
$(window).on('load', function () { });
