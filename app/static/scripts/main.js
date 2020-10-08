'use strict';

function select () {
  var $selects = $('.js-select');
  $selects.each(function (i, elem) {
    var isOpened = false;
    var $select = $(elem);
    var $selectLabel = $select.find('.js-select-label');
    var $selectDropdown = $select.find('.js-select-dropdown');
    var $selectScrollbar = $select.find('[data-select-simplebar]');
    var $optionsContainer = $select.find('.js-select-options');
    var $options = $select.find('.js-select-option');
    var $input = $select.find('.js-select-input');
    var $search = $select.find('.js-select-search');
    var selectedOption = $selectLabel.attr('data-selected') && $selectLabel.attr('data-selected').toLowerCase();
    var selectDropdownWidth; // Set a default value to the input if there is a default option

    if (selectedOption) {
      $input.val(selectedOption);
    } // Toggle select on label click


    $selectLabel.on('click', function () {
      toggleSelect(); // Set fixed width to select dropdown

      selectDropdownWidth = selectDropdownWidth ? selectDropdownWidth : $selectDropdown.width();
      $selectDropdown.css('width', selectDropdownWidth); // Initialize SimpleBar scroll

      if ($selectScrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($selectScrollbar[0]);
        }, 0);
      }
    }); // Select option click logic

    $options.each(function (i, elem) {
      var $option = $(elem); // Set is-selected class if the option is selected by default

      var optionData = $option.attr('data-option').toLowerCase();

      if (selectedOption === optionData) {
        $option.addClass('is-selected');
      } // Set option by the option click


      $option.on('click', function (e) {
        e.stopPropagation();
        setOption($option);
        collapseSelect();
      });
    }); // Options arrow navigation

    $select.on('keydown', function (e) {
      if (!isOpened) {
        return;
      }

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
    }); // Select search

    $search.on('input', function (e) {
      var value = e.target.value.toLowerCase();
      $options.each(function (i, elem) {
        var $option = $(elem);
        var $optionText = $option.find('span').text().toLowerCase();

        if ($optionText.indexOf(value) == -1) {
          $option.hide();
        } else {
          $option.show();
        }
      });
    }); // Collapse select on document click

    $(document).on('click', function (e) {
      if ($(e.target).parents('.js-select')[0] !== $select[0]) {
        collapseSelect();
      }
    }); // Toggle select

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
    } // Set option


    function setOption(option) {
      var optionHtml = option.html();
      var optionData = option.attr('data-option');
      $selectLabel.attr('data-selected', optionData);
      $selectLabel.html(optionHtml);
      $input.attr('value', optionData);
      $options.removeClass('is-selected');
      option.addClass('is-selected');
    } // Collapse select


    function collapseSelect() {
      isOpened = false;
      $select.removeClass('is-expanded');
      $selectDropdown.fadeOut(300, function () {
        if ($search) {
          $search.val('');
        }

        $options.each(function (i, elem) {
          var $option = $(elem);
          $option.removeClass('is-focused');
          $option.css('display') === 'none' && $option.show();
        });
      });
    } // Navigat through options by arrows. Direction can be next() or prev()


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
  var $inputs = $('.js-input-animation'); // Return if $inputs don't exist

  if (!$inputs.length) {
    return;
  }

  $inputs.each(function (i, elem) {
    var $input = $(elem);
    var $inputField = $input.find('.js-input-animation-field');
    $inputField.each(function () {
      if ($input.val() !== '') {
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
    $html.animate({
      scrollTop: 0
    });
  });
}

function radioToggleContent () {
  var $selectors = $('[data-radio-toggle]');
  var $toggleContent = $('[data-radio-toggle-content]'); // Return if $selectors doesn't exist

  if (!$selectors.length) {
    return;
  }

  $toggleContent.hide();
  $selectors.each(function (i, elem) {
    var $radio = $(elem);
    var name = $radio.attr('name');
    var value = $radio.attr('value');
    var $radios = $("input[name=\"".concat(name, "\"]"));
    var $content = $("[data-radio-toggle-content=\"".concat(name, "\"]"));
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

function modal () {
  var $modalAuto = $('[data-modal-auto]');
  var $modalOpen = $('[data-modal-open]');
  var $modalClose = $('[data-modal-close]'); // Open on widnow load

  if ($modalAuto.length > 0) {
    $modalAuto.each(function (i, elem) {
      var $modal = $(elem);
      createScrollBar($modal);
      $modal.modal({
        closeExisting: true,
        showClose: false
      });
    });
  }

  $modalClose.on('click', function () {
    $.modal.close();
  }); // Return if $modalOpen doesn't exist

  if ($modalOpen.length === 0) {
    return;
  }

  $modalOpen.on('click', function () {
    var $this = $(this);
    var modalName = $this.attr('data-modal-open');
    var $modal = $("[data-modal=\"".concat(modalName, "\"]"));
    createScrollBar($modal);
    $modal.modal({
      closeExisting: true,
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

var datepicker = (function () {
  var $datepickers = $('.js-datepicker-input'); // Return if $datepickers don't exist

  if (!$datepickers.length) {
    return;
  }

  $datepickers.each(function (i, elem) {
    var datepicker = elem;
    flatpickr(datepicker, {
      disableMobile: true
    });
  });
});

var dropdown = (function () {
  var $dropdowns = $('.js-dropdown');
  var fadeDuration = 100;
  var $body = $('body'); // Return if $dropdowns doesn't exist

  if ($dropdowns.length === 0) {
    return;
  }

  $dropdowns.each(function (i, elem) {
    var $dropdown = $(elem);
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
});

function tabs () {
  var $tabsContainers = $('.js-tabs'); // Return if $tabsContainers doesn't exist

  if ($tabsContainers.length === 0) {
    return;
  }

  $tabsContainers.each(function (i, elem) {
    var $tabsContainer = $(elem);
    var $tabs = $tabsContainer.find('.js-tabs-tab');
    $tabs.on('click', function () {
      var $tab = $(this);

      if ($tab.hasClass('is-active')) {
        return;
      }

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

function uploadDocumentsBox () {
  var $boxes = $('.js-upload-documents-box'); // Return if $boxes don't exist

  if (!$boxes.length) {
    return;
  }

  $boxes.each(function (i, elem) {
    var $box = $(elem);
    var $boxParent = $box.parents('.upload-documents');
    var $downloadButton = $boxParent.find('.upload-documents__header-button button');
    var $emptyText = $boxParent.find('.upload-documents__header-empty');
    new Dropzone($box[0], {
      previewTemplate: $box.find('.upload-documents-box__tpl').html(),
      url: "/",
      uploadprogress: function uploadprogress(file, progress) {
        var $document = $(file.previewElement);
        $document.find('[data-dz-uploadprogress]').css({
          width: progress + 'px',
          opacity: 1 - progress / 100
        });
      },
      init: function init() {
        var _this = this;

        this.on('addedfile', function () {
          var element = $box.find('.document-list-item');
          var wrapper = $box.find('.simplebar-content');
          wrapper.append(element);

          if (_this.files.length > 0) {
            $downloadButton.removeClass('button--disabled');
            $emptyText.hide();
          }
        });
        this.on('removedfile', function () {
          if (_this.files.length <= 0) {
            $downloadButton.addClass('button--disabled');
            $emptyText.show();
          }
        });
      },
      dragenter: function dragenter(props) {
        var $srcElement = $(props.srcElement);

        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.addClass('is-focused');
        }
      },
      dragleave: function dragleave(props) {
        var $srcElement = $(props.srcElement);

        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.removeClass('is-focused');
        }
      },
      drop: function drop(props) {
        var $srcElement = $(props.srcElement);

        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.removeClass('is-focused');
        }
      }
    });
  });
}

var bp = {
  xxl: '1461',
  xl: '1200',
  lg: '992',
  md: '768',
  sm: '577',
  xs: '361'
};

function checkWindowSize (media, callback) {
  var jsMediaQuery = window.matchMedia(media);
  jsMediaQuery.addListener(callback);
  callback(jsMediaQuery);
}

var headerNavigation = (function () {
  var $navigation = $('.js-header-navigation');
  var $burger = $('.js-header-navigation-burger');
  var $document = $(document);
  var $body = $('body');
  var isOpened = false; // Return if $burger doesn't exist

  if (!$burger.length) {
    return;
  }

  $burger.on('click', function () {
    $burger.toggleClass('is-active');
    $navigation.toggleClass('is-active');

    if ($navigation.hasClass('is-active')) {
      $body.css('overflow-y', 'hidden');
    } else {
      $body.css('overflow-y', 'auto');
    }

    $navigation.one('transitionend', function () {
      isOpened = !isOpened;
    });
  });
  $document.on('click', function (e) {
    var $target = $(e.target);

    if ($target[0] !== $navigation[0] && $target.parents('.js-header-navigation')[0] !== $navigation[0] && isOpened) {
      $navigation.removeClass('is-active');
      $burger.removeClass('is-active');
      $body.css('overflow-y', 'auto');
      isOpened = false;
    }
  }); // Show scrollbar if the screen size > bp.xl

  checkWindowSize("(min-width:".concat(bp.xl, "px)"), function (e) {
    if (e.matches) {
      if ($body.css('overflow-y') === 'hidden') {
        $body.css('overflow-y', 'auto');
      }
    }
  }); // Hide scrollbar if the screen size < bp.xl and navigation is opened

  checkWindowSize("(max-width:".concat(bp.xl, "px)"), function (e) {
    if (e.matches) {
      if ($body.css('overflow-y') === 'auto' && isOpened) {
        $body.css('overflow-y', 'hidden');
      }
    }
  });
});

$(function () {
  svg4everybody();
  select();
  inputAnimation();
  scrollUp();
  radioToggleContent();
  modal();
  datepicker();
  dropdown();
  tabs();
  uploadDocumentsBox();
  headerNavigation();
}); // On window load

$(window).on('load', function () {});
