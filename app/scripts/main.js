'use strict';
// Modules
import select from './modules/select';
import inputAnimation from './modules/input-animation';

// On document ready
$(function () {
  svg4everybody();
  select();
  inputAnimation()
});

// On window load
$(window).on('load', function () { });
