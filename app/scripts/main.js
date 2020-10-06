'use strict';
// Modules
import select from './modules/select';
import inputAnimation from './modules/input-animation';
import scrollUp from './modules/scroll-up';
import radioToggleContent from './modules/radio-toggle-content';
import dragAndDropBox from './modules/drag-and-drop-box';
import modal from './modules/modal';
import datepicker from './modules/datepicker';
import dropdown from './modules/dropdown';
import tabs from './modules/tabs';

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
