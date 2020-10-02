'use strict';
// Modules
import select from './modules/select';
import inputAnimation from './modules/input-animation';
import scrollUp from './modules/scroll-up';
import radioToggleContent from './modules/radio-toggle-content';
import dragAndDropBox from './modules/drag-and-drop-box';

// On document ready
$(function () {
  svg4everybody();
  select();
  inputAnimation();
  scrollUp();
  radioToggleContent();
  dragAndDropBox();
});

// On window load
$(window).on('load', function () { });
