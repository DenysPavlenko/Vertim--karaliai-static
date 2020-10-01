'use strict';

function select () {
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

function inputAnimation () {
  var $inputs = $('.js-input-animation');

  // Return if $inputs don't exist
  if ($inputs.length <= 0) { return; }

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

// On document ready
$(function () {
  svg4everybody();
  select();
  inputAnimation();
});

// On window load
$(window).on('load', function () { });
